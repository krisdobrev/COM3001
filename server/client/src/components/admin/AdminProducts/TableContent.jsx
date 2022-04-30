import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Divider,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { columns } from "./_data";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getOneProduct } from "../../../actions/productActions";
import { Link, useHistory } from "react-router-dom";

import CustomAlertDialog from "./CustomAlertDialog";

export const TableContent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allProducts = useSelector((state) => state.product);
  const { products } = allProducts;
  const reformatProducts = products.map((product) => ({
    user: {
      title: product.title,
      image: product.image,
    },
    description: product.description,
    category: product.category,
    price: product.price,
    id: product._id,
  }));

  useEffect(() => {
    dispatch(getProducts());
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
        {reformatProducts.map((row, index) => (
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
              <Button
                colorScheme="blue"
                onClick={async () => {
                  await dispatch(getOneProduct(row.id));
                  history.push(`/admin/product/${row.id}`);
                }}
              >
                Edit
              </Button>

              <Divider orientation="horizontal" />
              <CustomAlertDialog id={row.id} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
