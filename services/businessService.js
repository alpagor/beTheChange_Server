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

  createBusiness: async (docs, id, options) => {
    try {
        const businessDoc = await Business.create(docs);
        console.log("BUSINESS_DOC:>>>>> ", businessDoc)
        console.log("id:>>>>> ", id)
        const userBusinesses = await User.findOneAndUpdate(id, { $set: { $push:{ businesses:businessDoc } } }, options)
        console.log("userBusinesses:>>>>> ", userBusinesses)
        return {user:userBusinesses}; 
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

  deleteBusiness: async (_id,id,options) => {
    

    try {
      const deletedBusiness = await Business.findByIdAndDelete(_id);
      console.log("BUSINESS_TO_DELETE:>>>>> ", deletedBusiness)
      const updateBusinessArray = await User.findByIdAndUpdate(id, { $set:{ $pull:{ businesses:deletedBusiness }} }, options)
      console.log("BUSINESS_upDatEd:>>>>> ", updateBusinessArray)
      
      
      return {user:updateBusinessArray};
    } catch (error) {
      console.log(`Could not delete user ${error}`);
    }
  },
};
