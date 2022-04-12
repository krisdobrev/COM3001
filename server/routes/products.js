const productControllers = require("../controllers/productControllers");

module.exports = (app) => {
  app.get("/api/products", productControllers.get_products);
  app.get("api/product/:id", productControllers.get_oneProduct);
  app.get("api/products/:category", productControllers.get_categoryOfProducts);
  app.post("/api/product", productControllers.post_product);
  app.post("/api/product/:id", productControllers.update_product);
  app.delete("/api/product/:id", productControllers.delete_product);
};
