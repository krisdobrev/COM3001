const emailControllers = require("../controllers/emailControllers");
const cors = require("cors");

module.exports = (app) => {
  app.post("/api/send_mail", cors(), emailControllers.sendMail);
};
