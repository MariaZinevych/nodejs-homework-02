const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a5e6a34a7f5d68",
    pass: "e0c54060520213",
  },
});

function sendEmail(message) {
  message.from = "zinevmaria@gmail.com";

  return transport.sendMail(message);
}

module.exports = sendEmail;
