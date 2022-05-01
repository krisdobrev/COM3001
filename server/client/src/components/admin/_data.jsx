import { Badge } from "@chakra-ui/react";
import * as React from "react";

const badgeEnum = {
  PAID: "green",
  PROCESSING: "orange",
  FAILED: "red",
  Express: "red",
};
export const columns = [
  {
    Header: "Order",
    accessor: "date_ordered",
    Cell: function MemberCell(data) {
      return <div>{data.substring(0, 10)}</div>;
    },
  },
  {
    Header: "Payment",
    accessor: "payment",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: function StatusCell(data) {
      return (
        <Badge fontSize="xs" colorScheme={badgeEnum[data]}>
          {data}
        </Badge>
      );
    },
  },
  {
    Header: "Shipping",
    accessor: "shipping",
    Cell: function StatusCell(data) {
      return (
        <Badge fontSize="xs" colorScheme={badgeEnum[data]}>
          {data}
        </Badge>
      );
    },
  },
  {
    Header: "Total",
    accessor: "total",
    Cell: function MemberCell(data) {
      return <div>£{data}</div>;
    },
  },
];
