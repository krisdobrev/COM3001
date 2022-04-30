import { Box, Stack } from "@chakra-ui/react";
import * as React from "react";
import { ImageWithOverlay } from "./ImageWithOverlay";

export const Carousel = () => (
  <Box
    maxW="7xl"
    mx="auto"
    px={{
      base: "4",
      md: "8",
      lg: "12",
    }}
    py={{
      base: "6",
      md: "8",
      lg: "12",
    }}
  >
    <Stack
      height={{
        md: "640px",
      }}
      direction={{
        base: "column",
        md: "row",
      }}
      spacing={{
        base: "6",
        md: "10",
      }}
      align="stretch"
    >
      <ImageWithOverlay
        flex="1"
        objectPosition="top center"
        description="Best variety of korean snacks!"
        src="https://images.unsplash.com/photo-1641652682537-e1a9334f206d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
        alt="Snacks"
        url="/products/Snacks"
      />
      <Stack
        spacing={{
          base: "6",
          md: "10",
        }}
        maxW={{
          md: "400px",
        }}
      >
        <ImageWithOverlay
          spacing="4"
          title="Topped off"
          src="https://images.unsplash.com/photo-1607872155422-34b70c9e6690?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80"
          url="/product/625a09797e50a707342f1c20"
        />
        <ImageWithOverlay
          spacing="4"
          title="Try our new drink"
          src="https://images.unsplash.com/photo-1619995757657-fb467a837ea2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="625a094c7e50a707342f1c1e"
          url="/product/625a094c7e50a707342f1c1e"
        />
      </Stack>
    </Stack>
  </Box>
);
