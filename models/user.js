const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema here
const CategoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  
});

module.exports = mongoose.model("Categories", CategoriesSchema);
