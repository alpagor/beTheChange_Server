const express = require("express");
const profileRouter = express.Router();
const Business = require("../../models/business-model");

// only users with verified tokens can acess this route
profileRouter.get("/profile", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});

// this code handles a GET request for 'profile'. It returns a
// message and information about user and token. Only users with a verified token will be presented
// with this response.

// Sends Business info to the server and creates business in the DB.
profileRouter.post("/profile/newBusiness", async (req, res) => {
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

    const newBusiness = await Business.create({
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

    console.log(newBusiness);

    res.json(newBusiness).status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET specific business document by ID
profileRouter.get("/profile/:businessId", async (req, res) => {
  const { businessId } = req.params;

  try {
    const business = await Business.findById(businessId);
    res.json(business).status(200);
  } catch (error) {
    console.log(error);
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

    console.log("req.body :>> ", req.body);

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
profileRouter.delete("/profile/:businessId", async (req, res) =>{
  try{
    const { businessId } = req.params;

    const deletedBusiness = await Business.findByIdAndRemove(businessId)

    res.json(deletedBusiness).status(200);
  }catch(err){
    res.status(500).json(err);
  }
})



module.exports = profileRouter;
