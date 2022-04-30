import { Box, Center, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import * as React from "react";

const Success = () => {
  return (
    <Box mt={10}>
      <Center>
        <VStack spacing={4}>
          <Box>Thank you for your order!</Box>
          <Link to="/">
            <Text as="u">Continue shopping.</Text>
          </Link>
        </VStack>
      </Center>
    </Box>
  );
};

export default Success;
