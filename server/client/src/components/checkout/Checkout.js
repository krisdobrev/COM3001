// Chakra imports
import {
  Box,
  Flex,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { OrderSummary } from "./OrderSummary";
import { PaymentInformation } from "./PaymentInformation";
import { ShippingInformation } from "./ShippingInformation";
import ShippingMethod from "./ShippingMethod";
// React imports
import { useState, useEffect } from "react";
const Checkout = () => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  return (
    <Box
      bgGradient={useColorModeValue(
        "linear(to-l, gray.50 50%, white 50%)",
        "linear(to-l, gray.700 50%, gray.800 50%)"
      )}
    >
      <Flex
        maxW="8xl"
        mx="auto"
        direction={{
          base: "column",
          md: "row",
        }}
      >
        <Box
          flex="1"
          bg={useColorModeValue("white", "gray.800")}
          px={{
            base: "4",
            md: "8",
            lg: "12",
            xl: "20",
          }}
          py={{
            base: "6",
            md: "8",
            lg: "12",
            xl: "20",
          }}
        >
          <Stack
            spacing={{
              base: "16",
              lg: "20",
            }}
          >
            <ShippingInformation
              fullName={fullName}
              address={address}
              zipCode={zipCode}
              city={city}
              email={email}
              setFullName={setFullName}
              setAddress={setAddress}
              setZipCode={setZipCode}
              setCity={setCity}
              setEmail={setEmail}
            />
            <ShippingMethod
              shippingCost={shippingCost}
              setShippingCost={setShippingCost}
            />
            <PaymentInformation />
          </Stack>
        </Box>
        <Box
          flex="1"
          maxW={{
            lg: "md",
            xl: "40rem",
          }}
          bg={useBreakpointValue({
            base: useColorModeValue("white", "gray.800"),
            md: "inherit",
          })}
          px={{
            base: "4",
            md: "8",
            lg: "12",
            xl: "20",
          }}
          py={{
            base: "6",
            md: "8",
            lg: "12",
            xl: "20",
          }}
        >
          <OrderSummary shippingCost={shippingCost} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Checkout;
