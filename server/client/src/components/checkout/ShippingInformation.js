import {
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

export const ShippingInformation = (props) => (
  <Stack
    spacing={{
      base: "6",
      md: "10",
    }}
  >
    <Heading size="md">Shipping Information</Heading>
    <Stack
      spacing={{
        base: "6",
        md: "8",
      }}
    >
      <FormControl id="name">
        <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
          Full name
        </FormLabel>
        <Input
          name="name"
          placeholder="Your first and last name"
          focusBorderColor={useColorModeValue("blue.500", "blue.200")}
          value={props.fullName}
          onChange={(e) => props.setFullName(e.target.value)}
        />
      </FormControl>
      <FormControl id="street">
        <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
          Street address
        </FormLabel>
        <Input
          name="name"
          placeholder="123 Example Street"
          focusBorderColor={useColorModeValue("blue.500", "blue.200")}
          value={props.address}
          onChange={(e) => props.setAddress(e.target.value)}
        />
      </FormControl>
      <HStack spacing="6">
        <FormControl id="zip" maxW="32">
          <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
            Zip Code
          </FormLabel>
          <Input
            name="zip"
            placeholder="Zip Code"
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            value={props.zipCode}
            onChange={(e) => props.setZipCode(e.target.value)}
          />
        </FormControl>
        <FormControl id="city">
          <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
            City
          </FormLabel>
          <Input
            name="city"
            placeholder="City"
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            value={props.city}
            onChange={(e) => props.setCity(e.target.value)}
          />
        </FormControl>
      </HStack>
      <FormControl id="email">
        <FormLabel color={useColorModeValue("gray.700", "gray.200")}>
          Email address
        </FormLabel>
        <Input
          name="email"
          placeholder="you@exmaple.com"
          focusBorderColor={useColorModeValue("blue.500", "blue.200")}
          value={props.email}
          onChange={(e) => props.setEmail(e.target.value)}
        />
      </FormControl>
      <Checkbox defaultIsChecked spacing="4" colorScheme="blue">
        Billing address is same as shipping
      </Checkbox>
    </Stack>
  </Stack>
);
