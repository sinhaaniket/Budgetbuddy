const mongoose = require('mongoose')
const emailManager = require('../../../managers/emailManager');

const forgotPassword = async (req,res) =>{

    userModel = mongoose.model("users");
    const {email} = req.body;

    if(!email) throw "Email is required!";

    const getUser = await userModel.findOne({
        email,
    })

    if(!getUser) throw "This email doesnot exist"

    const resetCode = Math.floor(10000 + Math.random()*90000)

    await userModel.updateOne({
        email,
    },{
        reset_code: resetCode
    }, {
        runValidators: true
    })


      await emailManager(email,`Your password reset code is ${resetCode}`,`<h1>${resetCode}</h1>`,"Reset your password")
    res.status(200).json({
        status: "Email sent successfully"
    })
}

module.exports = forgotPassword;