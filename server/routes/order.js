const orderControllers = require("../controllers/orderControllers");

module.exports = (app) => {
  app.get("/api/order/:id", orderControllers.get_orders);
  app.get("/api/orders", orderControllers.getAllOrders);
  app.post("/api/order/:id", orderControllers.checkout);
  // app.post("/api/test/order", orderControllers.testCheckout);
  app.post("/api/stripe/test", orderControllers.testCheckout);
};
