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
  tags: {
    type: [String],
    required: true,
    default: undefined,
    enum: [
      'eco',
      'vegan',
      'vegetarian',
      'ethic',
      'bio',
      'circular economy'
    ]
  },  
});

module.exports = mongoose.model("Categories", CategoriesSchema);
