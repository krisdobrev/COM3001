import {
  CloseButton,
  Flex,
  Link,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { PriceTag } from "./PriceTag";
import { CartProductMeta } from "./CartProductMeta";

import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, updateCart } from "../../actions/cartActions";

const QuantitySelect = (props) => {
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue("blue.500", "blue.200")}
      {...props}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </Select>
  );
};

export const CartItem = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { authenticated } = auth;

  const { currency } = props;

  const { product } = props;
  const { title, quantity, price, image } = product;

  const onClickDelete = () => {
    if (auth.google === false) {
      dispatch(deleteFromCart(auth.id, product.productId));
    } else {
      dispatch(deleteFromCart(auth.google._id, product.productId));
    }
  };

  const onChangeQuantity = (q) => {
    if (auth.google === false) {
      dispatch(updateCart(auth.id, product.productId, q));
    } else {
      dispatch(updateCart(auth.google._id, product.productId, q));
    }
  };
  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta name={title} image={image} />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: "none",
          md: "flex",
        }}
      >
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity(+e.currentTarget.value);
          }}
        />
        <PriceTag price={price * quantity} currency={currency} />
        <CloseButton
          aria-label={`Delete ${title} from cart`}
          onClick={onClickDelete}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: "flex",
          md: "none",
        }}
      >
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value);
          }}
        />
        <PriceTag price={price} currency={currency} />
      </Flex>
    </Flex>
  );
};
