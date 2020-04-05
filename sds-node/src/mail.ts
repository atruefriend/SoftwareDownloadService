const nodemailer = require("nodemailer");

async function sendMail(params: any) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  let info = await transporter.sendMail({
    from: testAccount.user, // sender address
    to: "nikhil01@icloud.com", // list of receivers
    subject: "New Request created", // Subject line
    text: "Body Test", // plain text body
    html:
      "<b>Please approve the request <a href='http://localhost:3000?requestId=" +
      params._id +
      "'>" +
      params.SoftwareName +
      "</a></b>" // html body
  });

  console.log(info);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export default {
  sendMail
};
