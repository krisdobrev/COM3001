import {
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Center,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import ReviewForm from "./ReviewForm";
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Email = () => {
  const [sent, setSent] = useState(false);

  return (
    <div>
      {!sent ? (
        <Box height="100vh">
          {/*`trapFocus` and `blockScrollOnMount` are only switched off so that the preview works properly. */}
          <Modal
            isOpen={true}
            onClose={console.log}
            size="xl"
            isCentered
            blockScrollOnMount={false}
            trapFocus={false}
          >
            <ModalOverlay />
            <ModalContent
              borderRadius="xl"
              mx={{
                base: "2.5",
                lg: "16",
              }}
              overflow="hidden"
            >
              <ModalCloseButton
                top="0"
                right="0"
                size="lg"
                borderRadius="none"
                borderBottomLeftRadius="md"
              />
              <ModalBody
                px={{
                  base: "5",
                  md: "12",
                  lg: "16",
                }}
                py={{
                  base: "10",
                  md: "12",
                  lg: "16",
                }}
                pb={{
                  base: "6",
                }}
              >
                <Stack spacing="6">
                  <Heading fontSize="2xl" fontWeight="semibold" color="black">
                    Write a review
                  </Heading>
                  <ReviewForm sent={sent} setSent={setSent} />
                </Stack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      ) : (
        <Box mt={10}>
          <Center>
            <VStack spacing={4}>
              <Text>
                Your feedback has been successfully sent! You will receive a
                reply within 2-3 days.
              </Text>
              <Link to="/user/orders" onClick={() => setSent(false)}>
                <Text as="u">Go back to orders</Text>
              </Link>
            </VStack>
          </Center>
        </Box>
      )}
    </div>
  );
};

export default Email;
