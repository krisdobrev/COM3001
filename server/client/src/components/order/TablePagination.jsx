import {
  Button,
  ButtonGroup,
  Flex,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions/orderActions";

export const TablePagination = () => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const userOrders = useSelector((state) => state.order.orders);
  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    dispatch(getOrders(userId));
  }, []);
  return (
    <Flex align="center" justify="space-between">
      <Text color={mode("gray.600", "gray.400")} fontSize="sm">
        {userOrders.length} orders
      </Text>
      <ButtonGroup variant="outline" size="sm">
        <Button as="a" rel="prev">
          Previous
        </Button>
        <Button as="a" rel="next">
          Next
        </Button>
      </ButtonGroup>
    </Flex>
  );
};
