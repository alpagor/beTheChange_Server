const express = require("express");
const businessRouter = express.Router();
const Business = require("../models/business");

// GET  "/business/" show all businesses
businessRouter.get("/", async (req, res) => {
  try {
    const businesses = await Business.find();
    res.send(businesses).status(200);
  } catch (error) {
    console.log(error);
  }
});

// GET  "/business/" show 1 business document 
businessRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
      const singleBusiness = await Business.findById(id);
      res.send(singleBusiness).status(200);
    } catch (error) {
      console.log(error);
    }
  });

module.exports = businessRouter;
