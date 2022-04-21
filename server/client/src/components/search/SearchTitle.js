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

import { connect } from "react-redux";

class SearchTitle extends React.Component {
  renderContent() {
    switch (this.props.products.length) {
      case undefined || 0:
        return <Box>No such item exisits</Box>;
      default:
        return (
          <ProductGrid>
            {this.props.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </ProductGrid>
        );
    }
  }

  render() {
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
        {this.renderContent()}
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return { products: state.product.searchProducts.result };
}

export default connect(mapStateToProps)(SearchTitle);
