const express = require("express");
const apiRouter = express.Router();

const { apiGetCategory } = require("../../controllers/api.controller");

apiRouter.get("/:category", apiGetCategory);

module.exports = apiRouter;
