import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { FiHeart } from "react-icons/fi";
import { Gallery } from "./Gallery";
import { PriceTag } from "./PriceTag";
import { QuantityPicker } from "./QuantityPicker";
import { images } from "./_data";

import { useDispatch, useSelector } from "react-redux";
import { getOneProduct } from "../../actions/productActions";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../../actions/cartActions";

export const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const currentProduct = useSelector((state) => state.product);
  const { product } = currentProduct.currentProduct;

  const auth = useSelector((state) => state.auth);
  const { authenticated } = auth;

  useEffect(() => {
    dispatch(getOneProduct(id));
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
      <Stack
        direction={{
          base: "column-reverse",
          lg: "row",
        }}
        spacing={{
          base: "6",
          lg: "12",
          xl: "16",
        }}
      >
        <Stack
          spacing={{
            base: "6",
            lg: "8",
          }}
          maxW={{
            lg: "sm",
          }}
          justify="center"
        >
          <Stack
            spacing={{
              base: "3",
              md: "4",
            }}
          >
            <Stack spacing="3">
              <HStack alignSelf="baseline"></HStack>
              <Heading size="lg" fontWeight="medium">
                {currentProduct.currentProduct.title}
              </Heading>
            </Stack>
            <PriceTag
              price={currentProduct.currentProduct.price}
              currency="GBP"
              rootProps={{
                fontSize: "xl",
              }}
            />
            <Text color={useColorModeValue("gray.600", "gray.400")}>
              {currentProduct.currentProduct.description}
            </Text>
          </Stack>
          <Stack
            direction={{
              base: "column",
              md: "row",
            }}
            spacing={{
              base: "6",
              md: "8",
            }}
          >
            <Stack flex="1">
              <HStack
                spacing="1"
                color={useColorModeValue("gray.600", "gray.400")}
              ></HStack>
            </Stack>
            <Stack flex="1">
              <HStack
                spacing="1"
                color={useColorModeValue("gray.600", "gray.400")}
              ></HStack>
            </Stack>
          </Stack>
          <HStack
            spacing={{
              base: "4",
              md: "8",
            }}
            align="flex-end"
            justify="space-evenly"
          >
            <Box flex="1">
              <QuantityPicker
                defaultValue={1}
                max={10}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </Box>
            <Box flex="1">
              <Button
                variant="outline"
                size="lg"
                fontSize="md"
                isFullWidth
                leftIcon={<Icon as={FiHeart} boxSize="4" />}
                onClick={() => {
                  console.log(currentProduct.currentProduct.image);
                }}
              >
                Favorite
              </Button>
            </Box>
          </HStack>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => {
              dispatch(
                addToCart(
                  authenticated._id,
                  currentProduct.currentProduct._id,
                  quantity
                )
              );
              console.log({ quantity });
            }}
          >
            Add to cart
          </Button>
        </Stack>
        <Gallery
          rootProps={{
            overflow: "hidden",
            flex: "1",
          }}
          images={[currentProduct.currentProduct.image]}
        />
      </Stack>
    </Box>
  );
};
