import { Circle, useColorModeValue as mode } from "@chakra-ui/react";
import * as React from "react";

export const CartCount = (props) => (
  <Circle
    fontSize="xs"
    fontWeight="semibold"
    centerContent
    position="absolute"
    top="-2"
    right="-4"
    bg={mode("blue.500", "blue.300")}
    color={mode("white", "gray.800")}
    width="5"
    height="5"
    {...props}
  />
);

/***************************************************************************************
 *    Title: PRO Chakra UI
 *    Date: 02/04/2022
 *    Availability: https://pro.chakra-ui.com/components/e-commerce/store-navigation
 *
 ***************************************************************************************/
