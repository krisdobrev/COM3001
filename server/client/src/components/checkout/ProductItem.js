import {
  AspectRatio,
  Flex,
  Image,
  Select,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, updateCart } from "../../actions/cartActions";

export const ProductItem = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { authenticated } = auth;
  const { product } = props;
  const onChangeQuantity = (q) => {
    dispatch(updateCart(authenticated._id, product.productId, q));
  };
  return (
    <Flex justify="space-between" key={product.id}>
      <Stack direction="row" spacing="5">
        <AspectRatio ratio={1} width="92px">
          <Image src={product.image} alt={product.title} borderRadius="md" />
        </AspectRatio>
        <Stack spacing="3">
          <Stack spacing="1">
            <Text fontWeight="semibold">{product.title}</Text>
            <Text color={useColorModeValue("gray.600", "gray.300")}></Text>
          </Stack>
          <Select
            aria-label="Select quantity"
            maxW="16"
            size="sm"
            borderRadius="md"
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            bg={useColorModeValue("white", "gray.700")}
            value={product.quantity}
            onChange={(e) => {
              onChangeQuantity(+e.currentTarget.value);
            }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </Select>
        </Stack>
      </Stack>
      <Text fontWeight="medium">£{product.price * product.quantity}</Text>
    </Flex>
  );
};
