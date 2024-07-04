const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../managers/emailManager");

const resetPassword = async(req,res)=>{
    const userModel = mongoose.model("users");

    const {email, new_password, reset_code} = req.body;

    if(!email) throw "Email is required";
    if(!new_password) throw "Please provide new password";
    if(!reset_code) throw "Reset code is required";
    if(new_password.lenght<5) throw "Password must be at least 5 chaacters long!"

    const getUserwithResetcode = await userModel.findOne({
        email,
        reset_code,
    });

    if(!getUserwithResetcode) throw "Reset code does not match";
    
    const hashedPassword = await bcrypt.hash(new_password, 12)
    await userModel.updateOne({
        email,
    },{
        password: hashedPassword,
        reset_code: ""
    },{
        runValidators: true
    })

    await emailManager(email,"Your password is reseted successfully!","Reset Successfull","Password reseted" )
    res.status(200).json({
        status: "success",
        message: "password reset success"
    })
}
module.exports = resetPassword