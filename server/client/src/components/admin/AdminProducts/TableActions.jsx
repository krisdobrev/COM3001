import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
} from "@chakra-ui/react";
import * as React from "react";
import { BsSearch } from "react-icons/bs";
import { RiAddFill, RiArrowRightUpLine } from "react-icons/ri";

import { Link } from "react-router-dom";

export const TableActions = () => {
  return (
    <Stack
      spacing="4"
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
    >
      <HStack>
        <FormControl
          minW={{
            md: "320px",
          }}
          id="search"
        >
          <InputGroup size="sm">
            <FormLabel srOnly>Filter by title</FormLabel>
            <InputLeftElement pointerEvents="none" color="gray.400">
              <BsSearch />
            </InputLeftElement>
            <Input rounded="base" type="search" placeholder="Filter by title" />
          </InputGroup>
        </FormControl>
        <Select
          w={{
            base: "300px",
            md: "unset",
          }}
          rounded="base"
          size="sm"
          placeholder="Category"
        >
          <option>Ready To Eat</option>
          <option>Noodles</option>
          <option>Snacks</option>
          <option>Drinks</option>
          <option>Frozen Food</option>
        </Select>
      </HStack>
      <ButtonGroup size="sm" variant="outline">
        <Link to="/admin/product/new/create">
          <Button iconSpacing="1" leftIcon={<RiAddFill fontSize="1.25em" />}>
            New product
          </Button>
        </Link>
      </ButtonGroup>
    </Stack>
  );
};
