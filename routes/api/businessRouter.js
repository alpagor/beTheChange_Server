const express = require("express");
const businessRouter = express.Router();
const Business = require("../../models/business-model");



// Show business list for the selected category
businessRouter.get("/categories/:category", async (req, res, next) => {
  try {
    const { category } = req.params;

    const businesses = await Business.find({ categories: category });

    console.log(businesses);

    res.json(businesses).status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = businessRouter;
