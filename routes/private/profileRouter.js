const express = require("express");
const profileRouter = express.Router();

const {
  apiGetAllBusiness,
  apiUpdateUser,
  apiDeleteUser,
  apiCreateBusiness,
  apiGetBusinessById,
  apiUpdateBusiness,
  apiDeleteBusiness,
} = require("../../controllers/business.controller");


// User HOME page showing all business he has created
profileRouter.get("/profile", apiGetAllBusiness);

// EDIT user
profileRouter.put("/update", apiUpdateUser);

// DELETE user
profileRouter.delete("/delete", apiDeleteUser);

// Sends Business info to the server and creates business in the DB.
profileRouter.post("/addBusiness", apiCreateBusiness);

// GET specific business document by ID
profileRouter.get("/business/:_id", apiGetBusinessById);

// EDIT business
// need to be refactored, you need to change the full arrays if
// you need to update an element of that array, you can't push or pull...
profileRouter.put("/business/:_id/update", apiUpdateBusiness);

// DELETE business
profileRouter.delete("/business/:_id/delete", apiDeleteBusiness);

module.exports = profileRouter;
