const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema here
const BusinessSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  certifications: {
    type: [String],
    required: true,
    default: undefined,
  },
  shipping: {
    type: [String],
    required: true,
    default: undefined,
  },
  categories: {
    type: [String],
    required: true,
    default: undefined,
    enum: [
      "Cosmetics",
      "Bags",
      "Accessories",
      "Clothes",
      "Basics",
      "Shoes",
      "Food",
    ],
  },
  tags: {
    type: [String],
    required: true,
    default: undefined,
    enum: [
      "eco",
      "vegan",
      "vegetarian",
      "ethic",
      "bio",
      "circular economy",
      "recycled",
    ],
  },
});

module.exports = mongoose.model("Business", BusinessSchema);
