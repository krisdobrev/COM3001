import { Box, Heading } from "@chakra-ui/react";
import * as React from "react";
import { TableContent } from "./TableContent";
import { TablePagination } from "./TablePagination";

const AdminTable = () => {
  return (
    <Box as="section" py="12">
      <Box
        maxW={{
          base: "xl",
          md: "7xl",
        }}
        mx="auto"
        px={{
          base: "6",
          md: "8",
        }}
      >
        <Box overflowX="auto">
          <Heading size="lg" mb="6">
            Orders
          </Heading>

          <TableContent />
          <TablePagination />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminTable;
