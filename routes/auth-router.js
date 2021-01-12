const express = require("express");
authRouter = express.Router();

// GET '/auth/signup' renders the signup page
authRouter.get('/signup', (req,res) => {
    res.render() // should render the form view
})

module.exports = authRouter;
