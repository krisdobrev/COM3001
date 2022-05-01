import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import * as React from "react";
import { PriceTag } from "./PriceTag";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import { Link } from "react-router-dom";

export const ProductCard = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { authenticated, id } = auth;

  const { product, rootProps } = props;
  const { title, image, price } = product;
  return (
    <Stack
      spacing={useBreakpointValue({
        base: "4",
        md: "5",
      })}
      {...rootProps}
    >
      <Link to={`/product/${product._id}`}>
        <Box position="relative">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={image}
              alt={title}
              draggable="false"
              fallback={<Skeleton />}
              borderRadius={useBreakpointValue({
                base: "md",
                md: "xl",
              })}
            />
          </AspectRatio>
        </Box>
      </Link>
      <Stack>
        <Stack spacing="1">
          <Link to={`/product/${product._id}`}>
            <Text
              fontWeight="medium"
              color={useColorModeValue("gray.700", "gray.400")}
            >
              {title}
            </Text>
          </Link>
          <PriceTag price={price} currency="GBP" />
        </Stack>
        <HStack></HStack>
      </Stack>
      <Stack align="center">
        <Button
          colorScheme="red"
          isFullWidth
          onClick={() => {
            dispatch(addToCart(id, product._id, 1)); // need to get user ID
          }}
        >
          Add to cart
        </Button>
      </Stack>
    </Stack>
  );
};
