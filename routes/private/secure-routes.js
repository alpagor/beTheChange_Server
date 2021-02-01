const express = require("express");
const businessModel = require("../../models/business-model");
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

module.exports = profileRouter;
