import React, { useState, useEffect } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { Box, VStack, Center, Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart } from "../../actions/cartActions";
import axios from "axios";
const PaymentStatus = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { order, id } = auth;

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage(" Payment received. Thank you for your order!");
          dispatch(deleteCart(id));
          break;

        case "processing":
          setMessage(
            "Payment processing. We'll update you when payment is received."
          );
          axios.post(`/api/current/order/${order}`, { status: "Processing" });
          break;

        case "requires_payment_method":
          setMessage("Payment failed. Please try another payment method.");
          axios.post(`/api/current/order/${order}`, { status: "Failed" });
          break;

        default:
          setMessage("Something went wrong.");
          axios.post(`/api/current/order/${order}`, { status: "Failed" });
          break;
      }
    });
  }, [stripe]);

  return (
    <Box mt={10}>
      <Center>
        <VStack spacing={4}>
          <Box>{message}</Box>
          <Link to="/">
            <Text as="u">Continue shopping.</Text>
          </Link>
        </VStack>
      </Center>
    </Box>
  );
};

export default PaymentStatus;

/***************************************************************************************
 *    Title: Stripe DOCS
 *    Date: 02/04/2022
 *    Availability: https://stripe.com/docs/payments/quickstart
 *
 ***************************************************************************************/
