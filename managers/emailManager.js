const nodemailer = require("nodemailer")

const emailManager=async(to, text,html,subject)=>{
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "00822822c0b3d2",
          pass: "e4c05222c3cb4e"
        }
      });
    
      transport.sendMail({
        to:to,
        from: "info@budgetbuddy.com",
        text: text,
        html: html,
        subject: subject
      })
    
}

module.exports = emailManager