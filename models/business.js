const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema here
const BusinessSchema = new Schema({
  name: {
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
  /*
  categories: {
    type: [String],
    enum: ["shoes", "accessories", "cosmetics", "activewear"],
    required: true,
    // as arrays implicity have a default value of [] we need to
    // overwrite this default setting default to undefined
    default: undefined, 
  },*/
  categories: [
    {
      type: Schema.Types.ObjectId, // store the id of the related model
      ref: "Categories", // ref tells the schema which model can be asigned to the field
      // required: true,
      default: undefined,
    },
  ],
});

module.exports = mongoose.model("Business", BusinessSchema);
