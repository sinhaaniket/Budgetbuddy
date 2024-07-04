require("express-async-errors");

const express = require("express");
const cors = require("cors")
const errorHandlers = require("./handlers/errorHandlers");
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/user.routes");
const transactionRoutes = require("./modules/transactions/transactions.routes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("Mongo connection successful!");
  })
  .catch(() => {
    console.log("Mongo connection failed");
  });

// Models intialization
require("./models/usersmodel");
require("./models/transactionsmodels");

//Routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

//end of all routes
app.use(errorHandlers);

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
