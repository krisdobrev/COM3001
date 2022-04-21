import {
  Box,
  Center,
  Flex,
  HStack,
  useColorModeValue as mode,
  VisuallyHidden,
} from "@chakra-ui/react";
import * as React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdMenu } from "react-icons/md";
import { RiHeartLine, RiShoppingCartLine } from "react-icons/ri";
import { Logo } from "./Logo";
import { CartCount } from "./CartCount";
import { MobileBottomNav } from "./MobileBottomNav";
import { NavAction } from "./NavAction";
import { NavCategoryMenu } from "./NavCategoryMenu";
import { SearchInput } from "./SearchInput";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../actions/index";

class Header extends React.Component {
  renderContent() {
    switch (this.props.auth.isAuthenticated) {
      case false:
        return (
          <HStack spacing="2" flexShrink={0}>
            <NavAction.Desktop label="Wishlist" icon={RiHeartLine} />
            <Link to="/signin">
              <NavAction.Desktop label="Sign in" icon={AiOutlineUser} />
            </Link>
            <Link to="/cart">
              <Box position="relative">
                <NavAction.Desktop label="Cart" icon={RiShoppingCartLine} />
                <CartCount>
                  {this.props.cart.cart == false
                    ? 0
                    : this.props.cart.cart.products.reduce(
                        (acc, product) => acc + product.quantity,
                        0
                      )}
                </CartCount>
              </Box>
            </Link>
          </HStack>
        );
      default:
        return (
          <HStack spacing="5" flexShrink={0}>
            <NavAction.Desktop label="Wishlist" icon={RiHeartLine} />
            <Link to="/cart">
              <Box position="relative">
                <NavAction.Desktop label="Cart" icon={RiShoppingCartLine} />
                <CartCount>
                  {this.props.cart.cart == false
                    ? 0
                    : this.props.cart.cart.products.reduce(
                        (acc, product) => acc + product.quantity,
                        0
                      )}
                </CartCount>
              </Box>
            </Link>
            <Link onClick={() => this.props.dispatch(signout())}>
              <NavAction.Desktop label="Logout" icon={AiOutlineUser} />
            </Link>
          </HStack>
        );
    }
  }
  render() {
    return (
      <Box>
        <Flex
          direction="column"
          pb="4.5rem"
          overflow="hidden"
          display={{
            base: "flex",
            lg: "none",
          }}
        >
          <Box px="4" py="4" borderBottomWidth="1px" overflow="auto">
            <Flex
              align="center"
              justify="space-between"
              mb="3"
              display={{
                base: "flex",
                lg: "none",
              }}
            >
              <HStack spacing="3">
                <Center w="8" h="8" as="button" type="button">
                  {/* <VisuallyHidden>Toggle Menu</VisuallyHidden> */}
                  <Box as={MdMenu} fontSize="3xl" />
                </Center>
                <Logo h="3" />
              </HStack>
            </Flex>
            <SearchInput />
          </Box>

          <Flex flex="1" fontSize="sm" overflow="auto">
            <NavCategoryMenu.Mobile />
            {/* <NavCategorySubmenu.Mobile /> */}
          </Flex>
          <MobileBottomNav />
        </Flex>

        <Box
          display={{
            base: "none",
            lg: "block",
          }}
        >
          <Box px="8" bg={"white"}>
            <Flex height="4.5rem" align="center" maxW="8xl" mx="auto">
              <HStack flex="24rem" spacing="32px">
                <Link to="/">
                  <Logo h="3" />{" "}
                </Link>
              </HStack>
              <Box width="full" mx="8">
                <SearchInput />
              </Box>
              {this.renderContent()}
            </Flex>
          </Box>
          <NavCategoryMenu.Desktop />
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, cart: state.cart };
}

export default connect(mapStateToProps)(Header);
