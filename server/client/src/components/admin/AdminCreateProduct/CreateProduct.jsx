import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  HStack,
  Input,
  Stack,
  StackDivider,
  Textarea,
  useColorModeValue,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import * as React from "react";

import { FieldGroup } from "./FieldGroup";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addProduct,
  setProductsLoading,
} from "../../../actions/productActions";

export const CreateProduct = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Ready To Eat");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const product = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(setProductsLoading);
  }, []);

  return (
    <Box
      px={{
        base: "1",
        md: "10",
      }}
      py="16"
      maxWidth="3xl"
      mx="250"
    >
      <form
        id="settings-form"
        onSubmit={(e) => {
          e.preventDefault(); // form submit logic
        }}
      >
        <Stack spacing="4" divider={<StackDivider />}>
          <FieldGroup>
            <VStack width="full" spacing="6">
              <FormControl id="title">
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  maxLength={255}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <FormControl id="category">
                <FormLabel>Category</FormLabel>
                <Select
                  aria-label="Select category"
                  size="md"
                  borderRadius="lg"
                  focusBorderColor={useColorModeValue("blue.500", "blue.200")}
                  bg={useColorModeValue("white", "gray.700")}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Ready To Eat</option>
                  <option>Noodles</option>
                  <option>Snacks</option>
                  <option>Sauces & Spices</option>
                  <option>Rice & Grains</option>
                  <option>Fresh & Chilled Food</option>
                  <option>Frozen Food</option>
                </Select>
              </FormControl>

              <FormControl id="image">
                <FormLabel>Image</FormLabel>
                <Input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </FormControl>
              <FormControl id="price">
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormControl>
              <FormControl id="description">
                <FormLabel>Description</FormLabel>
                <Textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              {product.created && (
                <Alert status="success">
                  <AlertIcon />
                  Product created!
                </Alert>
              )}
              {product.error && (
                <Alert status="error">
                  <AlertIcon />
                  There was an error processing your request. Please make sure
                  all fields are filled out.
                </Alert>
              )}
            </VStack>
          </FieldGroup>
        </Stack>

        <FieldGroup mt="8">
          <HStack width="full">
            <Button
              type="submit"
              colorScheme="blue"
              onClick={() => {
                dispatch(
                  addProduct({ title, description, image, category, price })
                );
              }}
            >
              Create Product
            </Button>
            <Link to="/admin/products">
              <Button variant="outline">Cancel</Button>
            </Link>
          </HStack>
        </FieldGroup>
      </form>
    </Box>
  );
};
