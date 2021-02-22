const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { bodyValidation, isValid } = require("../../helpers/validationResult");
const authRouter = express.Router();

// handling POST request for signup
// When the user sends a POST request to this route, Passport authenticates the user based on the middleware auth.js
authRouter.post(
  "/signup",
  bodyValidation,
  isValid,
  passport.authenticate("signup", { session: false }),
  // We set { session: false } because we do not want to store the user details in a session
  async (req, res, next) => {
    // If this function gets called, authentication was successful.
    res.json({
      message: "Signup successful",
      user: req.user, // `req.user` contains the authenticated user.
    });
  }
);

// handling POST request for login:
authRouter.post("/login", bodyValidation, isValid, async (req, res, next) => {
  passport.authenticate("login", async (err, user) => {
    try {
      if (err || !user) {
        const error = new Error("Username or password incorrect");
        error.name = "ParseError";
        return next(error.toString());
      }
      /**
       * We set { session: false } because we do not want to store the user details in a session.
       * user will send the token on each request to the secure routes.
       */
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, username: user.username };
        /**
         We store id and email in the payload of the JWT. Then sign the token with a secret or key (TOP_SECRET). 
         Finally, send back the token to the user.
         */
        const token = jwt.sign({ user: body }, "TOP_SECRET", {
          expiresIn: 2629800,
        });

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

authRouter.get("/logout", function (req, res) {
  req.logout();
  res.send({ message: "Successfully logged out" });
});

module.exports = authRouter;
