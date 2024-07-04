const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");

const login = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { email, password } = req.body;

  const getUser = await usersModel.findOne({
    email: email,
  });

  if (!getUser) throw "Email not registered";

  const comparePassword = await bcrypt.compare(password, getUser.password);

  if (!comparePassword) throw "Email and password do not match";

  const accessToken = jwtManager(getUser);

  res.status(200).json({
    status: "success",
    message: "user login successfuly",
    accessToken: accessToken,
  });
};

module.exports = login;
