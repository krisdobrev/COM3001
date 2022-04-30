import {
  Button,
  Divider,
  Heading,
  HStack,
  Icon,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { HiOutlineChat, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { ProductItem } from "./ProductItem";
import CheckoutForm from "../stripe/CheckoutForm";
import "../stripe/Stripe.css";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkout } from "../../actions/orderActions";
import { deleteCart } from "../../actions/cartActions";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export const OrderSummary = (props) => {
  const { fullName, address, zipCode, city, email, paymentOption } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const cartProducts = useSelector((state) => state.cart);
  const { products, userId } = cartProducts.cart;

  const [clientSecret, setClientSecret] = useState("");
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const helperFunction = async () => {
    if (paymentOption === "cash") {
      dispatch(
        checkout(fullName, address, zipCode, city, email, paymentOption, userId)
      );
      history.push("/order/success"); // success page
      dispatch(deleteCart(userId));
    } else {
      dispatch(
        checkout(fullName, address, zipCode, city, email, paymentOption, userId)
      );
      const res = await axios.post("/api/stripe/test", {
        total: (cartProducts.cart.total + props.shippingCost) * 100,
      });

      setClientSecret(res.data.clientSecret);
    }
  };

  return (
    <Stack
      spacing={{
        base: "6",
        md: "10",
      }}
    >
      <Heading size="md">Order Summary</Heading>
      <Stack spacing="8">
        <Stack spacing="6">
          {products.slice(0, 2).map((product) => (
            <>
              <ProductItem product={product} />
              <Divider />
            </>
          ))}
        </Stack>

        <HStack spacing="6">
          <Input
            name="discount"
            placeholder="Discount Code"
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            bg={useColorModeValue("white", "gray.700")}
            size="lg"
          />
          <Button
            size="lg"
            px="8"
            bg={useColorModeValue("gray.500", "gray.600")}
            _hover={{
              bg: useColorModeValue("gray.600", "gray.500"),
            }}
            _active={{
              bg: useColorModeValue("gray.700", "gray.500"),
            }}
            color="white"
          >
            Apply
          </Button>
        </HStack>
        <Stack spacing="6">
          <Stack spacing="3">
            <Stack direction="row" justify="space-between">
              <Text color={useColorModeValue("gray.600", "gray.300")}>
                Subtotal
              </Text>
              <Text color={useColorModeValue("black", "white")}>
                £{cartProducts.cart.total}
              </Text>
            </Stack>
            <Stack direction="row" justify="space-between">
              <Text color={useColorModeValue("gray.600", "gray.300")}>
                Shipping cost
              </Text>
              <Text color={useColorModeValue("black", "white")}>
                £{props.shippingCost}
              </Text>
            </Stack>
            <Stack direction="row" justify="space-between">
              <Text color={useColorModeValue("gray.600", "gray.300")}>
                Discount
              </Text>
              <Text color={useColorModeValue("blue.500", "blue.200")}>
                Please enter a discount code.
              </Text>
            </Stack>
          </Stack>
          <Divider />
          <Stack direction="row" justify="space-between">
            <Text
              fontSize="lg"
              fontWeight="semibold"
              color={useColorModeValue("gray.700", "gray.200")}
            >
              Order Total
            </Text>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              color={useColorModeValue("black", "white")}
            >
              £
              {(cartProducts.cart.total + Number(props.shippingCost)).toFixed(
                2
              )}
            </Text>
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing="8">
        <Button
          colorScheme="blue"
          size="lg"
          py="7"
          onClick={() => helperFunction()}
        >
          Place Order
        </Button>
        <div className="Stripe">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>

        <Stack spacing="3">
          <Text fontSize="sm" color={useColorModeValue("gray.700", "gray.200")}>
            Have questions? or Need help to complete your order?
          </Text>
          <HStack
            spacing="8"
            color={useColorModeValue("blue.500", "blue.200")}
            fontWeight="semibold"
          >
            <HStack>
              <Icon as={HiOutlineChat} boxSize="5" />
              <Text>Live Chat</Text>
            </HStack>
            <HStack>
              <Icon as={HiOutlinePhone} boxSize="5" />
              <Text>Phone</Text>
            </HStack>
            <HStack>
              <Icon as={HiOutlineMail} boxSize="5" />
              <Text>Email</Text>
            </HStack>
          </HStack>
        </Stack>
      </Stack>
    </Stack>
  );
};
