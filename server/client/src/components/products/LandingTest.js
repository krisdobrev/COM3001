import { Box } from "@chakra-ui/react";
import * as React from "react";
import { ProductCard } from "./ProductCard";
//import { products } from "./_data"; // get products using the action
import { ProductGrid } from "./ProductGrid";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getProducts } from "../../actions/productActions";
import { getCart } from "../../actions/cartActions";

const LandingTest = () => {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.product);
  const { products } = allProducts;

  const auth = useSelector((state) => state.auth);
  const { authenticated } = auth;

  useEffect(() => {
    dispatch(getProducts());
    if (authenticated) {
      dispatch(getCart(authenticated._id));
    }
  }, [dispatch]);

  return (
    <Box
      maxW="7xl"
      mx="auto"
      px={{
        base: "4",
        md: "8",
        lg: "12",
      }}
      py={{
        base: "6",
        md: "8",
        lg: "12",
      }}
    >
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </ProductGrid>
    </Box>
  );
};

export default LandingTest;
