const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user-model");

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  "signup",
  new localStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (user) {
        return done(null, false);
      }
      const newUser = await User.create({ username, password });
      // the verify callback invokes 'done' to supply Passport with the user that authenticated.
      console.log("User Registration succesful");
      return done(null, newUser);
    } catch (error) {
      done(error);
    }
  })
);

// ...

passport.use(
  "login",
  new localStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

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
  })
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
