const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");


const apiRouter = require("./routes/api/apiRouter");
const authRouter = require("./routes/auth/authRouter");
const profileRouter = require("./routes/private/profileRouter");

// We create our own server named app
// Express server handling requests and responses
const app = express();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require("./config/database");
// Must first load the models
require("./models/user-model");
require("./helpers/auth");

// MIDDLEWARES
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 'true' for parsing application/x-www-form-urlencoded
app.use(cookieParser());
// SET STATIC FOLDER FOR PUBLIC FILES
app.use(express.static(path.join(__dirname, "public")));

// MIDDLEWARES ROUTES

app.use("/auth", authRouter);

app.use("/", apiRouter);
// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use(
  "/owner",
  passport.authenticate("jwt", { session: false }),
  profileRouter
);

// HANDLE ERRORS
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
