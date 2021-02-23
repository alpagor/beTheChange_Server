const Business = require("../models/business-model");

module.exports = {
  getCategory: async (path) => {
    try {
      const category = await Business.find(path);
      return category;
    } catch (error) {
      console.log(`Could not fetch category ${error}`);
    }
  },
};
