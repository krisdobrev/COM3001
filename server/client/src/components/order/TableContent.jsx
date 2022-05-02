import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue as mode,
  TableContainer,
  HStack,
  Button,
} from "@chakra-ui/react";
import * as React from "react";
import { columns } from "./_data";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getOrders } from "../../actions/orderActions";

import CustomModal from "./CustomModal";

export const TableContent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userOrders = useSelector((state) => state.order.orders);
  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    dispatch(getOrders(userId));
  }, []);

  return (
    <Table my="8" borderWidth="1px" fontSize="sm">
      <Thead bg={mode("gray.50", "gray.800")}>
        <Tr>
          {columns.map((column, index) => (
            <Th whiteSpace="nowrap" scope="col" key={index}>
              {column.Header}
            </Th>
          ))}
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {userOrders.map((row, index) => (
          <Tr key={index}>
            {columns.map((column, index) => {
              const cell = row[column.accessor];
              const element = column.Cell?.(cell) ?? cell;
              return (
                <Td whiteSpace="nowrap" key={index}>
                  {element}
                </Td>
              );
            })}
            <Td textAlign="right">
              <HStack aligh="right">
                <CustomModal
                  title="Products"
                  modalHeader="Order Detail"
                  modalBody={row.products.map((product) => (
                    <TableContainer>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>Product name</Th>
                            <Th>Quantity</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Td>{product.title}</Td>
                          <Td>{product.quantity}</Td>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  ))}
                />
                <CustomModal
                  title="Address"
                  modalHeader="Order Detail"
                  modalBody={Object.entries(row.details).map((detail) => (
                    <TableContainer>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>{detail[0]}</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Td>{detail[1]}</Td>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  ))}
                />
                <Button onClick={() => history.push(`/email/${row._id}`)}>
                  Send feedback
                </Button>
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
