const { getCategory } = require("../services/apiService");

module.exports = {
  apiGetCategory: async (req, res, next) => {
    try {
      const { category } = req.params;

      const selectedCategory = { categories: category };

      const categories = await getCategory(selectedCategory);

      if (!categories) {
        return res.status(404).json("no categories fetched yet");
      }
      res.json(categories);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
