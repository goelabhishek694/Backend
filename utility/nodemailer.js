// "use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
// str->'signup'/'forgetpassword'
module.exports.sendMail = async function sendMail(str, data) {
  // create reusable transporter object using the default SMTP transport
    console.log("nodmailer called")
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "goelabhishek694@gmail.com", // generated ethereal user
      pass: "dieebosgaupvfiyf"
    },
  });
  let eSubj, eHtml;
  if (str == "signup") {
    eSubj = `Thank You for signing ${data.name}`;
    eHtml = `
        <h1>Welcome to foodApp.com</h1>
        Hope you have a great experience 
        Here are your details
        Name - ${data.name}
        Email - ${data.email}
        `;
  } else if (str == "forgetpassword") {
    eSubj = `Reset Password`;
    eHtml = `
        <h1>foodApp.com</h1>
        Here is your link to reset password : ${data.resetPasswordLink}
        `;
  }
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"FoodApp 🥗" <goelabhishek694@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: eSubj, // Subject line
    // text: "Hello world?", // plain text body
    html: eHtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
};

// main().catch(console.error);
