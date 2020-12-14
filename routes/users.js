var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
/**
 The users.js file is using the same / path. This is because in app.js, 
 it was already defined that /users would use users.js. 
 Therefore inside users.js, we do not have to specify the full /users path. 
 In fact if we did, that would equate to /users/users and that is not what 
 we want. The key is that the path seen in the actual routes file is relative 
 to the path specified in app.js.
 **/
