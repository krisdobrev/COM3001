import {
  Box,
  Heading,
  HStack,
  propNames,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

const ShippingMethod = (props) => {
  const [value, setValue] = React.useState("1");

  return (
    <Stack
      spacing={{
        base: "6",
        md: "10",
      }}
    >
      <Heading size="md">Shipping Method</Heading>
      <RadioGroup
        value={value}
        onChange={setValue}
        colorScheme="blue"
        size="lg"
      >
        <Stack
          direction={{
            base: "column",
            lg: "row",
          }}
          spacing="6"
        >
          <Radio
            value="1"
            name="test1"
            spacing="3"
            flex="1"
            onClick={() => {
              props.setShippingCost(Number(4.99));
            }}
          >
            <Box
              onClick={() => {
                props.setShippingCost(Number(4.99));
              }}
            >
              <HStack color={useColorModeValue("black", "white")}>
                <Text fontWeight="medium">Standard</Text>
                <Text fontWeight="bold">£4.99</Text>
              </HStack>
              <Text color={useColorModeValue("gray.600", "gray.400")}>
                Dispatched in 1 - 2 days
              </Text>
            </Box>
          </Radio>
          <Radio
            value="2"
            name="test"
            spacing="3"
            flex="1"
            onClick={() => {
              props.setShippingCost(Number(14.99));
              props.setShippingMethod("Express");
            }}
          >
            <Box
              onClick={() => {
                props.setShippingCost(Number(14.99));
                props.setShippingMethod("Express");
              }}
            >
              <HStack color={useColorModeValue("black", "white")}>
                <Text fontWeight="medium">Express</Text>
                <Text fontWeight="bold">£14.99</Text>
              </HStack>

              <Text color={useColorModeValue("gray.600", "gray.400")}>
                Dispatched in 24 hours
              </Text>
            </Box>
          </Radio>
        </Stack>
      </RadioGroup>
    </Stack>
  );
};

export default ShippingMethod;
