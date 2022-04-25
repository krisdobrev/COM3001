import React, { useState, useEffect } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { Box, VStack, Center, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PaymentStatus = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);

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
          break;

        case "processing":
          setMessage(
            "Payment processing. We'll update you when payment is received."
          );
          break;

        case "requires_payment_method":
          setMessage("Payment failed. Please try another payment method.");
          break;

        default:
          setMessage("Something went wrong.");
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
