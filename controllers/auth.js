const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user-model");

// add a Passport middleware to handle user registration:

passport.use(
  "signup",
  new localStrategy(
    // {
    // LocalStrategy expects to find credentials in parameters named username and password. 
    // If we prefers to name these fields differently, options are available to change the defaults.
    //   usernameField: "email",
    //   passwordField: "password",
    // },
    async ()
  )
);
