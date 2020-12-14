var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;

/*
Here is where the action starts happening. At the top of the file, 
the express router is required and initialized into the router variable. 
After that we can see that a get() function is called. That function accepts 
two arguments.
The first argument is the path of the route. 
In this case of course, it is simply / or the home page.
The second argument is a function which itself takes three arguments. 
This function takes the request, the response, and the next arguments.
Inside this function, a call to render() is made. 
We can see that ‘index’ is the first argument. 
What this is saying is to look in the views folder for a file that has the
name of index before the extension. 
In the views folder there is an index file. 
This is the file being referenced. The second argument to the render() 
function is a JavaScript object. It is in this object where variable data 
can be passed to the view as it is being rendered. 
*/
