const surnames = require("./surnames.json");
const firstnames = require("./first-names.json");
const nodemailer = require("nodemailer");

const joinFunction = () => {
  firstnames.map((name, index) => {
    const mail = `${name}${surnames[index]}@gmail.com`;
    handler(mail);
  });
};

const handler = (mail) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smpt.gmail.com",
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailInfo = {
    to: mail,
    from: process.env.USER,
    subject: "Portfolio Message",
    text: mail,
  };

  transport.sendMail(mailInfo, (err, info) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(info.response);
    }
  });
};

joinFunction();
