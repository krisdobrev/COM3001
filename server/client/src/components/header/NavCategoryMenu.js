import {
  Box,
  Flex,
  HStack,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";

const DesktopNavItem = (props) => {
  const { isActive, label, href = "#", ...rest } = props;
  return (
    <Flex
      as="a"
      href={href}
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
    label: "Ready To Cook",
    href: "#",
  },
  {
    label: "Noodles",
    href: "#",
  },
  {
    label: "Snacks",
    href: "#",
  },
  {
    label: "Sauces & Spices",
    href: "#",
  },
  {
    label: "Rice & Grains",
    href: "#",
  },
  {
    label: "Drinks",
    href: "#",
  },
  {
    label: "Fresh & Chilled Food",
    href: "#",
  },
  {
    label: "Frozen Food",
    href: "#",
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
