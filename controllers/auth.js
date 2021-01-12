const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user-model");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

// add a Passport Strategy to handle user registration:

passport.use(
  "signup",
  new localStrategy(
    // {
    // LocalStrategy expects to find credentials in parameters named username and password.
    // If we prefers to name these fields differently, options are available to change the defaults.
    //   usernameField: "email",
    //   passwordField: "password",
    // },

    // Invoking the verify Callback function with credentials contained in the request
    // in our case 'username' and 'password'.

    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        // In case of any error return
        if (err) {
          return done(err);
        }
        // checking if the username are provided
        if (!user) {
          // If the credentials are not valid (for example, if the password is incorrect),
          // done should be invoked with false instead of a user to indicate an authentication failure.
          // An additional info message can be supplied to indicate the reason for the failure.
          return done(null, false, {
            message: "Please provide a valid username.",
          });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, {
            message: "Please provide a valid password.",
          });
        } else {
          // If the credentials are valid, create the user
          const newUser = new User.create({ username, password });
          // the verify callback invokes 'done' to supply Passport with the user that authenticated.
          return done(null, newUser, {
            message: "User Registration succesful",
          });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      // If the user does not match any users in the database, it returns a error.
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      const validate = await user.isValidPassword(password);
      // If the password does not match the password associated with the user in the database, it returns a error.
      if (!validate) {
        return done(null, false, { message: "Incorrect password." });
      }
      // If the user and password match, it returns a "Logged in Successfully" message,
      // and the user information is sent to the next middleware.
      return done(null, user, { message: "Logged in Successfully" });
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  new JWTstrategy(
    // options to control how the token is extracted from the request or verified
    {
      // verifying that this token has been signed with the secret or key set during logging in (TOP_SECRET)
      secretOrKey: "TOP_SECRET",
      // extract the JWT from the query parameter
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    // asunc function with the parameters verify(jwt_payload, done)
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
