const { config } = require("chai");
require('dotenv').config()
const mongoose = require("mongoose");
const Business = require("../models/business");



const businesses = [
  {
    name: 'MATT & NAT',
    url: 'https://mattandnat.com',
    img: 'https://cdn.shopify.com/s/files/1/0325/6569/0501/files/Matt_Nat_black_tagline_black.png?height=628&pad_color=ffffff&v=1596575740&width=1200',
    description: 'M&N is a vegan brand therefore there are no animal products used in production.',
    certification: [none],
    shipping: '[Canada, United States, UK, Europe, International, Australia]',
    categories: [Handbags,Accessories,Footwear, Outerwear],
  },
];


mongoose
  .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    // la x está por?
    .then((x) => {
      console.log(`Connected to Mongo! Database name: "${x.connection.name}"`);
      // porqué borramos la db?
      return x.connection.dropDatabase();
    })
    .then(() => {
      const newCollection = Business.create(businesses);
  
      console.log(newCollection);
      newCollection
        .then((businessesCollection) => {
          console.log("businessesCollection", businessesCollection);
        })
        .catch((err) => {
          console.log("error", err);
        });
    })
    .catch((err) => {
      console.error("Error connecting to mongo", err);
    });


