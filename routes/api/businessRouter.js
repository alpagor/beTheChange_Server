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

businessRouter.get("/", async (req, res) => {
  try {
    // if a business category have been selected created queryObject is { categories: businessCategory }
    let businessCategory;
    if (req.query.categories) {
      businessCategory = req.query.categories;
    } else {
      const businesses = await Business.find();
      res.status(200).json(businesses);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Returns specific recipe by Id
businessRouter.get("/:id", async (req, res) => {
    try {
        const { businessId } = req.params;
        Business.findById()
    } catch(error){}

  });
  

module.exports = businessRouter;
