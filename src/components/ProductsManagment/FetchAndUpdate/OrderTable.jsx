import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  chakra,
} from "@chakra-ui/react";
import axios from "axios";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5008/api/admin/orders"
        );
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Table variant="simple">
      <TableCaption>Orders</TableCaption>
      <Thead>
        <Tr>
          <Th>User</Th>
          <Th>Address</Th>
          <Th>Time Created</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order) => (
          <Tr key={order._id}>
            <Td>{order.user.name}</Td>
            <Td>{"address"}</Td>
            <Td>{new Date(order.timeCreated).toLocaleString()}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default OrdersTable;
