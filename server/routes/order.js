const orderControllers = require("../controllers/orderControllers");

module.exports = (app) => {
  app.get("/api/order/:id", orderControllers.get_orders);
  app.post("/api/order/:id", orderControllers.checkout);
  app.post("/api/test/order", orderControllers.testCheckout);
};
