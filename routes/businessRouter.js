const express = require("express");
const business = require("../models/business");
const businessRouter = express.Router();
const Business = require("../models/business");

// GET  "/business/" show all business
businessRouter.get("/", async (req, res) => {
  try {
    const businesses = await Business.find();
    res.send(businesses).status(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = businessRouter;
