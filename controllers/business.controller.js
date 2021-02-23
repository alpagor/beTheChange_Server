const {
  getAllBusiness,
  updateUser,
  deleteUser,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
} = require("../services/businessService");

module.exports = {
  apiGetAllBusiness: async (req, res, next) => {
    try {
      const userId = req.user._id;
      const owner = { owner: userId };
      const businesses = await getAllBusiness(owner);
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
        return res.status(404).json("Unable to update user");
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
        owner,
      } = req.body;

      const userId = req.user._id;

      // const options = { new: true };

      // const {business, user} = await createBusiness(req.body, {new:true});
      // const newBusiness = await createBusiness(req.body, req.user, {
      //   new: true,
      // });
      const newBusiness = await createBusiness(req.body, userId);

      res.json(newBusiness);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  apiGetBusinessById: async (req, res, next) => {
    try {
      const { _id } = req.params;

      const business = await getBusinessById({ _id });

      if (!business) {
        res.status(404).json("no business created yet");
      }
      res.json(business);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  apiUpdateBusiness: async (req, res, next) => {
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
      const { _id } = req.params;
      const options = { new: true };

      const updatedBusiness = await updateBusiness(req.params, req.body, {
        new: true,
      });

      if (!updatedBusiness) {
        return res.status(404).json("Unable to update user");
      }

      res.json(updatedBusiness).status(200);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  apiDeleteBusiness: async (req, res, next) => {
    try {
      const { _id } = req.params;

      const deletedBusiness = await deleteBusiness(req.params);

      res.json(deletedBusiness).status(200);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
