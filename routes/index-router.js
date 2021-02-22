const express = require("express");
const indexRouter = express.Router();

/* GET home page. */
indexRouter.get("/", function (req, res, next) {
  res.render("index");
});

module.exports = indexRouter;

/*
Here is where the action starts happening. At the top of the file, 
the express router is required and initialized into the router constiable. 
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

// ______________________________________________________________________________

// COPY OF CODE USED ON PROFILE ROUTER

// EDIT USER
// profileRouter.put("/profile", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     console.log("BODY :>> ", req.body);

//     // const { userId } = req.params;
//     const { _id } = req.user;

//     console.log("userId :>> ", _id);

//     // $set will allow me to modify only the supplied fields in the req.body object.
//     const updateUser = await User.findByIdAndUpdate(
//       _id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );

//     console.log(updateUser);

//     res.json(updateUser).status(200);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// DELETE user
// profileRouter.delete("/profile/:userId", async (req, res) => {
//   try {
//     // const { userId } = req.params;
//     const { _id } = req.user;

//     const deletedUser = await User.findByIdAndRemove(_id);

//     res.json(deletedUser).status(200);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// GET specific business document by ID

// profileRouter.get("/profile/:businessId", async (req, res) => {
//   const { businessId } = req.params;

//   try {
//     const business = await Business.findById(businessId);

//     console.log(business);

//     res.json(business).status(200);
//   } catch (error) {
//     console.log(error);
//   }
// });





// Sends Business info to the server and creates business in the DB.
profileRouter.post("/profile/newBusiness", async (req, res, next) => {
  const {
    name,
    location,
    url,
    img,
    description,
    certifications,
    shipping,
    categories,
    tags,
  } = req.body;

  const { _id } = req.user;
  
  
  try {

    const business = await Business.create({
      name,
      location,
      url,
      img,
      description,
      certifications,
      shipping,
      categories,
      tags,
    });
    console.log("newBusiness :>> ", business);
    console.log("userId :>> ", _id);
    // await User.updateOne({$push: {
    //   businesses: business 
    // }});
    // await User.findByIdAndUpdate(_id, { $push: { businesses: business } })
    // const currentUser = await User.findById(_id);
    // console.log("currentUser :>> ", currentUser);
    
    await User.findByIdAndUpdate(_id, { $push: { businesses: business } })
  
    res.json(business).status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});


// EDIT business
profileRouter.put("/profile/:businessId", async (req, res) => {
  try {
    const {
      name,
      location,
      url,
      img,
      description,
      certifications,
      shipping,
      categories,
      tags,
    } = req.body;

    const { businessId } = req.params;

    console.log("businessId :>> ", businessId);

    // $set will allow me to modify only the supplied fields in the req.body object.
    const updateBusiness = await Business.findByIdAndUpdate(
      businessId,
      {
        $set: req.body,
      },
      { new: true }
    );

    console.log(updateBusiness);

    res.json(updateBusiness).status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE business
profileRouter.delete("/profile/:businessId", async (req, res) => {
  try {
    const { businessId } = req.params;

    const deletedBusiness = await Business.findByIdAndRemove(businessId);

    res.json(deletedBusiness).status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});