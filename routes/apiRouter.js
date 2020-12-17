const express = require("express");
const apiRouter = express.Router;


//Send categories list by category
// GET    "/api/categories"
// GET    "/api/categories?type=cosmetics"
apiRouter.get("/categories", (req, res) => {

});

module.exports = apiRouter;
