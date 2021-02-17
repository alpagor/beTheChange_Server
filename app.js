const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");


const businessRouter = require("./routes/api/businessRouter");
const authRouter = require("./routes/auth/auth-router");
const profileRouter = require("./routes/private/secure-routes");

// We create our own server named app
// Express server handling requests and responses
const app = express();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require("./config/database");
// Must first load the models
require("./models/user-model");
require("./middlewares/auth");

// MIDDLEWARES
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 'true' for parsing application/x-www-form-urlencoded
app.use(cookieParser());
// SET STATIC FOLDER FOR PUBLIC FILES
app.use(express.static(path.join(__dirname, "public")));

// MIDDLEWARES ROUTES
// app.use("/", indexRouter); // load the router on '/'
app.use("/auth", authRouter);
// app.use("/users", usersRouter);
app.use("/business", businessRouter);
// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  profileRouter
);

// HANDLE ERRORS
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
