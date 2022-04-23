const cartControllers = require("../controllers/cartControllers");

module.exports = (app) => {
  app.get("/api/cart/:id", cartControllers.get_cart_products);
  app.post("/api/cart/:id", cartControllers.add_cart_product);
  app.delete("/api/cart/:userId/:itemId", cartControllers.delete_product);
  app.delete("/api/cart/:userId", cartControllers.delete_cart);
  app.put("/api/cart/:userId/:itemId", cartControllers.update_product);
};
