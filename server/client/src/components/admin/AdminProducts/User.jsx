import { Box, Img, Stack } from "@chakra-ui/react";
import * as React from "react";

export const User = (props) => {
  const { image, title } = props.data;
  return (
    <Stack direction="row" spacing="4" align="center">
      <Box flexShrink={0} h="10" w="10">
        <Img
          objectFit="cover"
          htmlWidth="160px"
          htmlHeight="160px"
          w="10"
          h="10"
          rounded="full"
          src={image}
          alt=""
        />
      </Box>
      <Box>
        <Box fontSize="sm" fontWeight="medium">
          {title}
        </Box>
      </Box>
    </Stack>
  );
};
