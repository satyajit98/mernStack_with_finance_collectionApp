const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (email, password) {
  // Validator
  if (!email || !password) {
    throw Error("Email or Password must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email is already used");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  //validator
  if (!email || !password) {
    throw Error("Email or Password must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email not found, You have to SignUp first");
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw Error("Incorrect Password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
