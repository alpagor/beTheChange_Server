const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

authRouter = express.Router();

// handling POST request for signup
// When the user sends a POST request to this route, Passport authenticates the user based on the middleware auth.js
authRouter.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true,
  }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

// handling POST request for login:
authRouter.post("/login", async (req, res, next) => {
  passport.authenticate("/login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }
      req.login(user, { success: true }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, username: user.userame };
        // store the id and username in the payload of the JWT and sign the token with a secret or key (TOP_SECRET).
        // we do not store sensitive information such as the user’s password in the token
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  });
  req, res, next;
});

module.exports = authRouter;
