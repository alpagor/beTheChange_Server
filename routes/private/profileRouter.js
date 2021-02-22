const express = require("express");
const profileRouter = express.Router();

const {
  apiGetAllBusiness,
  apiUpdateUser,
  apiDeleteUser,
  apiCreateBusiness,
  apiGetBusinessById,
  apiUpdateBusiness,
  apiDeleteBusiness
} = require("../../controllers/business.controller");

// only users with verified tokens can acess this route
profileRouter.get("/profile", (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});

// this code handles a GET request for 'profile'. It returns a
// message and information about user and token. Only users with a verified token will be presented
// with this response.
profileRouter.get("/profile/business", apiGetAllBusiness);

// EDIT user
profileRouter.put("/profile", apiUpdateUser);

// DELETE user
profileRouter.delete("/profile/:userId/delete", apiDeleteUser);

// Sends Business info to the server and creates business in the DB.
// NO HACE PUSH PORQUÉ!!
profileRouter.post("/profile/newBusiness", apiCreateBusiness);

// GET specific business document by ID
profileRouter.get("/profile/business/:_id", apiGetBusinessById);

// EDIT business
profileRouter.put("/profile/business/:_id/update", apiUpdateBusiness);

// DELETE business
profileRouter.delete("/profile/business/:_id/delete", apiDeleteBusiness);

module.exports = profileRouter;
