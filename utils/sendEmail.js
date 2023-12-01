const nodemailer = require("nodemailer");
const { user, pass } = process.env;

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: user,
    pass: pass,
  },
});

function sendEmail(message) {
  message.from = "zinevmaria@gmail.com";

  return transport.sendMail(message);
}

module.exports = sendEmail;
