const express = require('express');
const auth = require("../../middleware/auth");
const addIncome = require('./controllers/addIncome');
const addExpense = require('./controllers/addExpense');
const getTransactions = require('./controllers/gettransactions');
const deleteTransaction = require('./controllers/deleteTransaction');
const editTransaction = require('./controllers/editTransaction');
const transactionRoutes = express.Router()

//Routes...
transactionRoutes.use(auth);
//Protected routes
transactionRoutes.post("/addincome", addIncome)
transactionRoutes.post("/addexpense", addExpense)
transactionRoutes.get("/", getTransactions )
transactionRoutes.delete("/:transaction_id",deleteTransaction)
transactionRoutes.patch("/",editTransaction)

module.exports = transactionRoutes;