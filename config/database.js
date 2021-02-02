require("dotenv").config();
const mongoose = require("mongoose");
// the .env file is required via ('dotenv').config()

// MONGOOSE CONNECTION
// Set up default mongoose connection

// In order to use the connection outside the file
// mongoose.connect() return a promise of a connection.We receive the result (line 17)

mongoose
  .connect(process.env.MONGODB_URI, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((x) => {
    console.log(
      `Connected to database! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => console.error(err));

// connect to the database and drop any old data
const connectAndDrop = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then((x) => {
      console.log(
        `Connected to database! Database name: "${x.connections[0].name}"`
      );
    })
    .catch((err) => console.error(err));

  await mongoose.connection.db.dropDatabase();
};

const disconnect = async () => {
  await mongoose.disconnect();
};

module.exports = { connectAndDrop, disconnect };
