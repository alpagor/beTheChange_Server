const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
// const bodyParser = require('body-parser')
const User = require("./models/user-model");

require("./config/database");
require("./controllers/auth");

const indexRouter = require("./routes/index-router");
const usersRouter = require("./routes/users");
const businessRouter = require("./routes/businessRouter");
const authRouter = require("./routes/auth-router");
const secureRoute = require("./routes/secure-routes");

// We create our own server named app
// Express server handling requests and responses
const app = express();

// MIDDLEWARES
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // same of body-parser
app.use(cookieParser());
// SET STATIC FOLDER FOR PUBLIC FILES
app.use(express.static(path.join(__dirname, "public")));

// MIDDLEWARES ROUTES
app.use("/", indexRouter); // load the router on '/'
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/business", businessRouter);
// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

// HANDLE ERRORS.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
