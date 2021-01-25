const express = require("express");
const profileRouter = express.Router();

// only users with verified tokens can acess this route
profileRouter.get("/profile", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});

// this code handles a GET request for 'profile'. It returns a
// messafe and information about user and token. Only users with a verified token will be presented
// with this response.

module.exports = profileRouter;
