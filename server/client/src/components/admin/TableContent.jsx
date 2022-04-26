import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue as mode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  TableContainer,
  TableCaption,
  HStack,
} from "@chakra-ui/react";
import * as React from "react";
import { columns, data } from "./_data";
import axios from "axios";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CustomModal from "./CustomModal";

export const TableContent = () => {
  const [orders, setOrders] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/orders");
      setOrders(res.data);
    }
    fetchData();
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
        {orders.map((row, index) => (
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
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
