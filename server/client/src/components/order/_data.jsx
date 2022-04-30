import { Badge } from "@chakra-ui/react";
import * as React from "react";

const badgeEnum = {
  PAID: "green",
  REVIEWING: "orange",
  FAILED: "red",
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
    Header: "Total",
    accessor: "total",
    Cell: function MemberCell(data) {
      return <div>£{data}</div>;
    },
  },
];
