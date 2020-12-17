const express = require("express");
const business = require("../models/business");
const businessRouter = express.Router();
const Business = require('../models/business')

// GET  "/business/" show all business
businessRouter.get("/", async (req, res) => {
    const businesses = await Business.find();
    res.send(businesses).status(200);
});

module.exports = businessRouter;
