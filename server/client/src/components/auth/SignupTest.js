import {
  Box,
  Button,
  Checkbox,
  CloseButton,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VisuallyHidden,
  ButtonGroup,
} from "@chakra-ui/react";
import * as React from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchUser, signup } from "../../actions";
import { PasswordField } from "./PasswordField";
import { GoogleIcon } from "./ProviderIcons";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
const icon = <GoogleIcon boxSize="5" />;

const SigninTest = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { authenticated, errorMessage } = auth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const helperFunction = async () => {
    await dispatch(signup({ email, password }));

    if (authenticated == false || authenticated == null) {
    } else {
      history.push("/");
    }
  };

  return (
    <Container
      maxW="lg"
      py={{
        base: "12",
        md: "24",
      }}
      px={{
        base: "0",
        sm: "8",
      }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack
            spacing={{
              base: "2",
              md: "3",
            }}
            textAlign="center"
          >
            <Heading
              size={useBreakpointValue({
                base: "xs",
                md: "sm",
              })}
            >
              Create a new account
            </Heading>
            <HStack spacing="1" justify="center"></HStack>
          </Stack>
        </Stack>
        <Box
          py={{
            base: "0",
            sm: "8",
          }}
          px={{
            base: "4",
            sm: "10",
          }}
          bg={useBreakpointValue({
            base: "transparent",
            sm: "bg-surface",
          })}
          boxShadow={{
            base: "none",
            sm: useColorModeValue("md", "md-dark"),
          }}
          borderRadius={{
            base: "none",
            sm: "xl",
          }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <PasswordField setPassword={setPassword} password={password} />
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultIsChecked>Remember me</Checkbox>
            </HStack>
            <Stack spacing="6">
              <Button
                variant="primary"
                onClick={() => {
                  helperFunction();
                }}
              >
                Sign up
              </Button>
              {errorMessage && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle mr={2}>{errorMessage}</AlertTitle>
                  <CloseButton position="absolute" right="8px" top="8px" />
                </Alert>
              )}
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>

              <a href="/auth/google">
                <ButtonGroup variant="outline" spacing="4" width="full">
                  <Button key="Google" isFullWidth>
                    <VisuallyHidden>Sign in with Google</VisuallyHidden>
                    {icon}
                  </Button>
                </ButtonGroup>
              </a>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default SigninTest;
