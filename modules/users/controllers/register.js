const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwtManager = require("../../../managers/jwtManager");
const emailManager = require("../../../managers/emailManager");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, password, confirm_password, name, balance } = req.body;

  //validations

  if (!email) throw "Email must be provided";
  if (!password) throw "Password must be provided";
  if (password.length < 5) throw "Password must be atleast 5 characters long.";

  if (!name) throw "Name must be provided";
  if (password !== confirm_password)
    throw "Password and confirm password should be same";

  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });

  if (getDuplicateEmail) throw "This email already exist!";

  const hashedPassword = await bcrypt.hash(password, 12);

 const createdUser = await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });

 
  const accessToken = jwtManager(createdUser);

 
  await emailManager(createdUser.email,"Welcome to Budgetbuddy. We hope you can manage your expense easily from our platform","Welcome to Budgetbuddy","<h1>WELCOME</h1>","Welcome to Budgetbuddy")
  res.status(201).json({
    status: "User registered successfully",
    accessToken : accessToken,
  });
};

module.exports = register;
