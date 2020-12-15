require("dotenv").config();
const mongoose = require("mongoose");
// the .env file is required via ('dotenv').config()

// MONGOOSE CONNECTION
// Set up default mongoose connection

// In order to use the connection outside the file
// mongoose.connect() return a promise of a connection.We receive the result (line 17)
const connectDB = () => {
  const DBConnection = mongoose
    .connect(process.env.MONGODB_URI, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Connected to database`);
      return DBConnection.connection; // so when we'll call this function on seed, tit will return us the connection
    })
    .catch((err) => console.error(err));
};

module.exports = connectDB;
