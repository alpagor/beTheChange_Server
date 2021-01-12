const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const bodyParser = require('body-parser')
require("./config/database");

const indexRouter = require("./routes/index-router");
const usersRouter = require("./routes/users");
const businessRouter = require("./routes/businessRouter");
const authRouter = require("./routes/auth-router");

// We create our own server named app
// Express server handling requests and responses
const app = express();


// MIDDLEWARES
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// SET STATIC FOLDER FOR PUBLIC FILES
app.use(express.static(path.join(__dirname, "public")));

// MIDDLEWARES ROUTES
app.use("/", indexRouter); // load the router on '/'
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/business", businessRouter);

module.exports = app;
