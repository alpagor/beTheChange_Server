require("../config/database"); // we require connectDB on database file
const Categories = require("../models/categories");
const Business = require("../models/business");
const mongoose = require("mongoose");

const categories = [
  {
    name: "Handbags",
    img:
      "data:image/jpeg;base64,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",
    tags: ["vegan"],
  },
];

const businesses = [
  {
    name: "MATT & NAT",
    location: "France",
    url: "https://mattandnat.com",
    img:
      "https://cdn.shopify.com/s/files/1/0325/6569/0501/files/Matt_Nat_black_tagline_black.png?height=628&pad_color=ffffff&v=1596575740&width=1200",
    description:
      "M&N is a vegan brand therefore there are no animal products used in production.",
    certifications: ["none"],
    shipping: [
      "Canada",
      "United States",
      "UK",
      "Europe",
      "International",
      "Australia",
      "Africa",
      "Central & South America",
      "Middle East",
      "New Zeland",
    ],
    categories: [],
  },
];

const seedDatabase = async () => {
  try {
    const db = mongoose.connection;
    await db.dropDatabase();
    const createdCategories = await Categories.create(categories);
    console.log(`Created ${createdCategories.length} categories`);

    const createdBusinesses = await Business.create(businesses);
    console.log(`Created ${createdBusinesses.length} business`);
    db.close();
  } catch (error) {
    console.log("Error while seeding the database:>> ", error);
  }
};
seedDatabase();
