const mongoose = require("mongoose");
const validator = require("validator");

const editTransaction = async(req,res)=>{

    const transactionModel = mongoose.model("transactions");
    const {transaction_id, remarks} = req.body;

    if(!transaction_id) throw "Transaction id is required"
    if(transaction_type!=="income" || transaction_type!=="expense") throw "Transaction type must be income or expense!"
    if(!validator.isMongoId(transaction_id.toString())) throw "Please provide valid id!"



    //add amount logic to edit transactions

    const getTransaction = await transactionModel.updateOne({
        _id: transaction_id,
    },{
        remarks,
    
    },{
        runValidators: true,
    })

    if(!getTransaction) throw "Transaction not found"

    res.status(200).json({
        status: "Edit transaction"
    })
}

module.exports = editTransaction;