const productControllers = require("../controllers/productControllers");

module.exports = (app) => {
  app.get("/api/products", productControllers.get_products);
  app.get("/api/product/:id", productControllers.get_oneProduct);
  app.get("/api/products/:category", productControllers.get_categoryOfProducts);
  app.get(
    "/api/products/search/:title",
    productControllers.get_productsByTitle
  );
  app.post("/api/product", productControllers.post_product);
  app.put("/api/product/:id", productControllers.update_product);
  app.delete("/api/product/:id", productControllers.delete_product);
};
