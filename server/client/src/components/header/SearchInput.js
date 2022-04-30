import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import * as React from "react";
import { RiSearchLine } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { searchProduct } from "../../actions/productActions";
import { useHistory } from "react-router-dom";

export const SearchInput = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        dispatch(searchProduct(value)).then(
          history.push(`/products/search/${value}`)
        );
      }}
    >
      <InputGroup>
        <InputLeftElement>
          <Icon as={RiSearchLine} color="gray.500" fontSize="lg" />
        </InputLeftElement>
        <Input
          focusBorderColor="blue.500"
          width="full"
          fontSize="sm"
          variant="filled"
          type="text"
          placeholder="What are you looking for?"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </InputGroup>
    </form>
  );
};

/***************************************************************************************
 *    Title: PRO Chakra UI
 *    Date: 02/04/2022
 *    Availability: https://pro.chakra-ui.com/components/e-commerce/store-navigation
 *
 ***************************************************************************************/
