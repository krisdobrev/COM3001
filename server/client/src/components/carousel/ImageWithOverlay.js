import {
  Box,
  Button,
  Heading,
  Image,
  LightMode,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchProductsCategory } from "../../actions/productActions";

export const ImageWithOverlay = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    title,
    description,
    url,
    src,
    alt,
    spacing = "8",
    objectPosition = "cover",
    ...rest
  } = props;
  return (
    <Box
      borderRadius="xl"
      overflow="hidden"
      position="relative"
      width="full"
      {...rest}
    >
      <Image
        boxSize="full"
        maxHeight={{
          base: "240px",
          md: "100%",
        }}
        src={src}
        alt={alt}
        objectFit="cover"
        objectPosition={objectPosition}
        fallback={<Skeleton />}
      />
      <Box
        position="absolute"
        inset="0"
        bgGradient="linear(to-t, blackAlpha.300 20%, blackAlpha.700)"
        px={{
          base: "6",
          md: "10",
        }}
        py={{
          base: "6",
          md: "10",
        }}
        boxSize="full"
      >
        <Stack spacing={spacing}>
          <Stack spacing="4">
            <Heading size="lg" color="white">
              {title}
            </Heading>
            {description && (
              <Text fontSize="lg" color="white" maxW="2xs">
                {description}
              </Text>
            )}
          </Stack>
          <LightMode>
            <Button
              bg="white"
              color="gray.800"
              alignSelf="start"
              as="a"
              onClick={async () => {
                await dispatch(searchProductsCategory(alt));
                history.push(url);
              }}
            >
              Shop now
            </Button>
          </LightMode>
        </Stack>
      </Box>
    </Box>
  );
};
