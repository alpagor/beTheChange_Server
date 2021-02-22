const Business = require("../models/business-model");
const User = require("../models/user-model");

module.exports = {
  getAllBusiness: async () => {
    try {
      const allBusiness = await Business.find();
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

  createBusiness: async (docs, id, update, options) => {
    try {
        const businessDoc = await Business.create(docs);
        const userBusinesses = await User.findOneAndUpdate(id, {$push: businessDoc}, options)
        return {business: businessDoc, user: userBusinesses}
    } catch(error) {
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
};
