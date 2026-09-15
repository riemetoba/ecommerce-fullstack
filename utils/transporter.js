const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


// verfication email send

let verificationEmail = async(email, token)=>{
    try {
  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email, 
    subject: "Verify your email", 
    html: `<b>Verify your email <a href="http://localhost:5173/verify/${token}">Click Here</a></b>`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}

// forgotPassword email send
let forgotPasswordEmail = async(email, token)=>{
    try {
  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email, 
    subject: "Reset Password", 
    html: `<b>Reset your password<a href="http://localhost:5173/resetPassword/${token}">Click Here</a></b>`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}




module.exports = {verificationEmail, forgotPasswordEmail}