const nodemailer = require("nodemailer"); // new 1

exports.sendMail = async (req, res) => {
  const { text, id } = req.body;
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0d5894400839c3",
      pass: "4c2d559b610754",
    },
  });

  await transport.sendMail({
    from: "send@test.com",
    to: "receive@test.com",
    subject: `Order-${id} feedback`,
    html: `<div>${text}</div>`,
  });
};
