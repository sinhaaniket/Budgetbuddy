const mongoose = require("mongoose")

const userDashboard = async (req, res) => {

    const userModel = mongoose.model("users");
    const transactionModel = mongoose.model("transactions")



    const getUser = await userModel.findOne({
        _id : req.user._id
    }).select("-password")

    const transactions = await transactionModel.find({
        user_id : req.user._id
    }).sort("-createdAt").limit(2);

  res.status(200).json({
    status: "Hello from userDashboard",
    data: getUser,
    transactions,
  })
};

module.exports = userDashboard;
