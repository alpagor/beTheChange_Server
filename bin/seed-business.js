require("../config/database"); // we require connectDB on database file
const Business = require("../models/business");
const mongoose = require("mongoose");

const businesses = [
  {
    name: "MATT & NAT",
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
    ],
    categories: [],
  },
];

const seedDatabase = async () => {
  try {
    const db = mongoose.connection;
    await db.dropDatabase();
    const createdBusinesses = await Business.create(businesses);
    console.log(`Created ${createdBusinesses.length} business`);
    db.close();
  } catch (error) {
    console.log("Error while seeding the database:>> ", error);
  }
};
seedDatabase();
