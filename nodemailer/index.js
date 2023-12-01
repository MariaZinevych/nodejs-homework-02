require("dotenv").config();

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a5e6a34a7f5d68",
    pass: "e0c54060520213",
  },
});

const message = {
  to: "zinevmaria@gmail.com",
  from: "zinevmaria@gmail.com",
  subject: "From Node.js wit love",
  html: "<h1>Node.js is awesome platform</h1>",
  text: "Node.js is awesome platform",
};

transport
  .sendMail(message)
  .then((response) => console.log(response))
  .catch((error) => console.log(error));
