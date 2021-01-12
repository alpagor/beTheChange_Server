const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// Define schema here
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/*
The code in the UserScheme.pre() function is called a pre-hook. Before the user information is saved in the database, 
this function will be called, we will get the plain text password, hash it, and store it.
*/

UserSchema.pre("save", async function (next) {
  // 'this' refers to the current document about to be saved.
  const user = this;
  //await bcrypt.hash(this.password, 10) passes the password and the value of salt round to 10.
  const hash = await bcrypt.hash(this.password, 10);
  // Next, we replace the plain text password with the hash and then store it.
  this.password = hash;
  // Finally, we indicate we're done and should move on to the next middleware with next().
  next();
});

// We'll also need to make sure that the user trying to log in has the correct credentials.
// assign a function to the "methods" object of our UserSchema
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  // bcrypt checks if the hashed password stored in the database matches the one sent.
  //It will return true if there is a match. Otherwise, it will return false if there is not a match.
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

module.exports = mongoose.model("User", UserSchema);
