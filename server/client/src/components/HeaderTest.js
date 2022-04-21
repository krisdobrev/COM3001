import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { FiMenu } from "react-icons/fi";
import { connect } from "react-redux";
import { signout } from "../actions/index";
import { Link } from "react-router-dom";

class HeaderTest extends React.Component {
  renderContent() {
    switch (this.props.auth.authenticated) {
      case null:
        return (
          <ButtonGroup>
            <Link to="/signin">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button variant="ghost">Sign up</Button>
            </Link>
          </ButtonGroup>
        );
      case false:
        return (
          <ButtonGroup>
            <Link to="/signin">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button variant="ghost">Sign up</Button>
            </Link>
          </ButtonGroup>
        );
      default:
        return (
          <Button onClick={() => this.props.dispatch(signout())}>Logout</Button>
        );
    }
  }

  render() {
    const isDesktop = true;
    return (
      <Box
        as="section"
        pb={{
          base: "12",
          md: "24",
        }}
      >
        <Box
          as="nav"
          bg="bg-surface"
          //boxShadow={useColorModeValue("sm", "sm-dark")}
        >
          <Container
            py={{
              base: "4",
              lg: "5",
            }}
          >
            <HStack spacing="10" justify="space-between">
              {isDesktop ? (
                <Flex justify="space-between" flex="1">
                  <Link to="/cart">
                    <Button>Cart</Button>
                  </Link>
                  <HStack spacing="3">{this.renderContent()}</HStack>
                </Flex>
              ) : (
                <IconButton
                  variant="ghost"
                  icon={<FiMenu fontSize="1.25rem" />}
                  aria-label="Open Menu"
                />
              )}
            </HStack>
          </Container>
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(HeaderTest);
