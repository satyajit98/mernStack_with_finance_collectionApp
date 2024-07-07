const User = require("../models/userModel");

// login User
const loginUser = async (req, res) => {
  res.json({ mssg: "login user" });
};

// signup User
const signupUser = async (req, res) => {
  res.json({ mssg: "signup user" });
};

module.exports = { loginUser, signupUser };
