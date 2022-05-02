import { HStack, Icon, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

export const Rating = (props) => {
  const { max = 5, size = "md", rootProps } = props;
  const color = useColorModeValue("gray.200", "gray.600");
  const activeColor = useColorModeValue("blue.500", "blue.200");
  const [defaultValue, setDefaultValue] = useState(0);

  return (
    <HStack spacing="0.5" {...rootProps}>
      {Array.from({
        length: max,
      })
        .map((_, index) => index + 1)
        .map((index) => (
          <Icon
            key={index}
            as={FaStar}
            fontSize={size}
            color={index <= defaultValue ? activeColor : color}
            onClick={() => setDefaultValue(index)}
          />
        ))}
    </HStack>
  );
};
