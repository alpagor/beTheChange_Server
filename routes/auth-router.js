const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

// handling POST request for signup
// When the user sends a POST request to this route, Passport authenticates the user based on the middleware auth.js
authRouter.post(
  "/signup",
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
authRouter.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, username: user.username };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = authRouter;
