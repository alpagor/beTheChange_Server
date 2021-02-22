const {
  getAllBusiness,
  updateUser,
  deleteUser,
  getBusinessById,
  createBusiness,
} = require("../services/businessService");

module.exports = {
  apiGetAllBusiness: async (req, res, next) => {
    try {
      const businesses = await getAllBusiness();
      if (!businesses) {
        res.status(404).json("no businesses created yet");
      }
      res.json(businesses);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  apiUpdateUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { _id } = req.user;
      const options = { new: true };

      const updatedUser = await updateUser(req.user, req.body, { new: true });

      if (!updatedUser) {
        res.status(404).json("Unable to update user");
      }
      res.json(updatedUser).status(200);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  apiDeleteUser: async (req, res, next) => {
    try {
      const { _id } = req.user;

      await deleteUser(req.user);

      res.json({ message: "user deleted" }).status(200);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  apiCreateBusiness: async (req, res, next) => {
    try {
      const {
        name,
        location,
        url,
        img,
        description,
        certifications,
        shipping,
        categories,
        tags,
      } = req.body;

      console.log("BUSINESS:>>>>> ", req.body)

      const { _id } = req.user;
      console.log("BUSINESS:>>>>> ", req.user)
      
      const options = { new: true };

      const {business, user} = await createBusiness(req.body, {new:true});

      res.json({business, user});


    } catch (error) {
      res.status(500).json(error);
    }
  },

  apiGetBusinessById: async (req, res, next) => {
    try {
      const { businessId } = req.params;
      console.log("BUSINESS_ID:>>>>> ", businessId);

      const business = await getBusinessById(req.params);

      if (!business) {
        res.status(404).json("no business created yet");
      }
      res.json(business);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
