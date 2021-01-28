const express = require("express");
const businessRouter = express.Router();
const Business = require("../../models/business-model");

// // GET  "/business/" show all businesses
// businessRouter.get("/", async (req, res) => {
//   try {
//     const businesses = await Business.find();
//     res.send(businesses).status(200);
//   } catch (error) {
//     console.log(error);
//   }
// });

// // GET  "/business/" show 1 business document
// businessRouter.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const singleBusiness = await Business.findById(id);
//     res.send(singleBusiness).status(200);
//   } catch (error) {
//     console.log(error);
//   }
// });

// Send business list by category
// GET "/api/business"
// eg:  GET "/api/business?categories=shoes"

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
