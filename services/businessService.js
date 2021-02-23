const Business = require("../models/business-model");
const User = require("../models/user-model");

module.exports = {
  getAllBusiness: async (path) => {
    try {
      const allBusiness = await Business.find(path);
      return allBusiness;
    } catch (error) {
      console.log(`Could not fetch business ${error}`);
    }
  },

  updateUser: async (id, update, options) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: update },
        options
      );

      return updatedUser;
    } catch (error) {
      console.log(`Could not update user ${error}`);
    }
  },

  deleteUser: async (id) => {
    try {
      const deletedUser = await User.findByIdAndRemove(id);
      return deletedUser;
    } catch (error) {
      console.log(`Could not delete user ${error}`);
    }
  },

  createBusiness: async (data, userId) => {
    try {
      const newBusiness = {
        name: data.name,
        location: data.location,
        url: data.url,
        img: data.img,
        description: data.description,
        certifications: data.certifications,
        shipping: data.shipping,
        categories: data.categories,
        tags: data.tags,
        owner: userId,
      };
      const response = await new Business(newBusiness).save();
      return response;
      // await User.updateOne({_id: userId},{ $push: { businesses:newBusiness } });
    } catch (error) {
      console.log(`Could not create business ${error}`);
    }
  },

  getBusinessById: async (id) => {
    try {
      const singleBusiness = await Business.findById(id);
      return singleBusiness;
    } catch (error) {
      console.log(`Could not fetch business ${error}`);
    }
  },

  updateBusiness: async (id, update, options) => {
    try {
      const updatedBusiness = await Business.findByIdAndUpdate(
        id,
        { $set: update },
        options
      );

      return updatedBusiness;
    } catch (error) {
      console.log(`Could not update user ${error}`);
    }
  },

  deleteBusiness: async (_id) => {
    try {
      const deletedBusiness = await Business.findByIdAndDelete(_id);

      return deletedBusiness;
    } catch (error) {
      console.log(`Could not delete business ${error}`);
    }
  },
};
