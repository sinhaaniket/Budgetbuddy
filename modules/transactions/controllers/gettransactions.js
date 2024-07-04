const mongoose = require("mongoose");

const getTransactions = async (req,res) =>{
    const transactionModel = mongoose.model("transactions")

    console.log(req.query);
    const tranasactions = await transactionModel.find({
        user_id: req.user._id,
        ...req.query,
    })

    res.status(200).json({
        status: "Transactions",
        data: tranasactions
    })
}

module.exports = getTransactions;