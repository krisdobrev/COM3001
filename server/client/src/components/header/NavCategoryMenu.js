import {
  Box,
  Flex,
  HStack,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchProductsCategory } from "../../actions/productActions";

const DesktopNavItem = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isActive, label, href = "#", ...rest } = props;
  return (
    // <Link to={href}>
    <Flex
      onClick={async () => {
        await dispatch(searchProductsCategory(label));
        history.push(href);
      }}
      as="a"
      direction="column"
      justify="center"
      minH="10"
      fontSize="sm"
      fontWeight="medium"
      position="relative"
      aria-current={isActive ? "page" : undefined}
      color={mode("gray.600", "gray.400")}
      _activeLink={{
        borderBottomWidth: "2px",
        borderColor: "currentColor",
        color: mode("blue.500", "blue.300"),
      }}
      _hover={{
        color: mode("blue.500", "blue.300"),
      }}
      {...rest}
    >
      {label}
    </Flex>
    // </Link>
  );
};

const MobileNavItem = (props) => {
  const { label, href, isActive, ...rest } = props;
  return (
    <Box
      as="a"
      href={href}
      aria-current={isActive ? "page" : undefined}
      py="2"
      px="3"
      _activeLink={{
        bg: mode("white", "gray.600"),
        shadow: "base",
      }}
      {...rest}
    >
      {label}
    </Box>
  );
};

const NavItem = {
  Desktop: DesktopNavItem,
  Mobile: MobileNavItem,
};
const menus = [
  {
    label: "Ready To Eat",
    href: "/products/ReadyToEat",
  },
  {
    label: "Noodles",
    href: "/products/Noodles",
  },
  {
    label: "Snacks",
    href: "/products/Snacks",
  },
  {
    label: "Sauces & Spices",
    href: "/products/SaucesAndSpices",
  },
  {
    label: "Rice & Grains",
    href: "/products/RiceAndGrains",
  },
  {
    label: "Drinks",
    href: "/products/Drinks",
  },
  {
    label: "Fresh & Chilled Food",
    href: "/products/FreshAndChilledFood",
  },
  {
    label: "Frozen Food",
    href: "/products/FrozenFood",
  },
];

const DesktopNavCategoryMenu = () => {
  return (
    <Box
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderColor={mode("gray.200", "gray.700")}
      bg={mode("white", "gray.800")}
      px="8"
    >
      <Box maxW="8xl" mx="auto">
        <HStack spacing="8">
          {menus.map((link) => (
            <NavItem.Desktop key={link.label} {...link} />
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

const MobileNavCategoryMenu = () => {
  return (
    <Box
      width="32%"
      minW="100px"
      bg={mode("gray.50", "gray.700")}
      color={mode("gray.600", "gray.100")}
      borderEndWidth="1px"
      py="6"
    >
      <Stack spacing="1">
        {menus.map((link) => (
          <NavItem.Mobile key={link.label} {...link} />
        ))}
      </Stack>
    </Box>
  );
};

export const NavCategoryMenu = {
  Mobile: MobileNavCategoryMenu,
  Desktop: DesktopNavCategoryMenu,
};

/***************************************************************************************
 *    Title: PRO Chakra UI
 *    Date: 02/04/2022
 *    Availability: https://pro.chakra-ui.com/components/e-commerce/store-navigation
 *
 ***************************************************************************************/
