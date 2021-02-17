const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user-model");

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const { body, validationResult } = require("express-validator");

// passport.use(
//   "signup",
//   new localStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//     },
//     // verify callback
//     async (email, password, done) => {
//       try {
//         const user = await User.findOne({ email });
//         if (user) {
//           return done(null, false);
//         }
//         //aqui va la validation y la sanittization?
//         const newUser = await User.create({ email, password });
//         // the verify callback invokes 'done' to supply Passport with the user that authenticated.
//         console.log("User Registration succesful");
//         return done(null, newUser);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

//................................

const authFields = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};


passport.use(
  "signup",
  new localStrategy(authFields,
    // verify callback.
    // REMEMBER: The purpose of a verify callback is to find the user that possesses a set of credentials
    async (req, email, password, done) => {
      
      try {

      const errors = validationResult(req); 
      // Finds the validation errors in this request and wraps them in an object with handy functions

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      } 


        const user = await User.findOne({ email });
        
        if (user) {
          return done(null, false, { message: "Email already registered, log in instead." });
        } else {
          const newUser = await User.create({ email, password });
          // the verify callback invokes 'done' to supply Passport with the user that authenticated.
          console.log("User Registration succesful");
          console.log('USER:>>>> ', newUser)
          return done(null, newUser);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

// ...............................

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
/**
 This code uses passport-jwt to extract the JWT from the query parameter. It then verifies that this token has been signed 
 with the secret or key set during logging in (TOP_SECRET). If the token is valid, the user details are passed to the next
middleware
 */
