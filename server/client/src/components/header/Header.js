import {
  Box,
  Center,
  Flex,
  HStack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdMenu } from "react-icons/md";
import {
  RiShoppingCartLine,
  RiListUnordered,
  RiAdminFill,
} from "react-icons/ri";
import { Logo } from "./Logo";
import { CartCount } from "./CartCount";
import { MobileBottomNav } from "./MobileBottomNav";
import { NavAction } from "./NavAction";
import { NavCategoryMenu } from "./NavCategoryMenu";
import { SearchInput } from "./SearchInput";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../actions/index";
import { getCart } from "../../actions/cartActions";

class Header extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.auth.id !== prevProps.auth.id) {
      this.props.dispatch(getCart(this.props.auth.id));
    }
  }
  renderContent() {
    switch (true) {
      case this.props.auth.authenticated === false &&
        this.props.auth.google === false:
        return (
          <HStack spacing="2" flexShrink={0}>
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
            {this.props.auth.isAdmin ? (
              <HStack spacing="5">
                <Link to="/admin/orders">
                  {" "}
                  <NavAction.Desktop label="Orders" icon={RiAdminFill} />{" "}
                </Link>
                <Link to="/admin/products">
                  {" "}
                  <NavAction.Desktop label="Products" icon={RiAdminFill} />{" "}
                </Link>
              </HStack>
            ) : (
              <Link to="/user/orders">
                <NavAction.Desktop label="Orders" icon={RiListUnordered} />
              </Link>
            )}

            {this.props.auth.isAdmin ? (
              <div></div>
            ) : (
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
            )}

            <Link to="/" onClick={() => this.props.dispatch(signout())}>
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
                  <Box as={MdMenu} fontSize="3xl" />
                </Center>
                <Logo h="3" />
              </HStack>
            </Flex>
            <SearchInput />
          </Box>

          <Flex flex="1" fontSize="sm" overflow="auto">
            <NavCategoryMenu.Mobile />
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

/***************************************************************************************
 *    Title: PRO Chakra UI
 *    Date: 02/04/2022
 *    Availability: https://pro.chakra-ui.com/components/e-commerce/store-navigation
 *
 ***************************************************************************************/
