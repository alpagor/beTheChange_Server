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

profileRouter.get("/profile", apiGetAllBusiness);

profileRouter.put("/update", apiUpdateUser);

profileRouter.delete("/delete", apiDeleteUser);

profileRouter.post("/addBusiness", apiCreateBusiness);

profileRouter.get("/business/:_id", apiGetBusinessById);

// need to be refactored, you need to change the full arrays if
// you need to update an element of that array, you can't push or pull...?
profileRouter.put("/business/:_id/update", apiUpdateBusiness);

profileRouter.delete("/business/:_id/delete", apiDeleteBusiness);

module.exports = profileRouter;
