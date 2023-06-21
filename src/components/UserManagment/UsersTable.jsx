import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Box,
} from "@chakra-ui/react";
import axios from "axios";

const UserTable = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("processssss", import.meta.env.VITE_APP_BASE_URL);
    const fetchNewUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5008/api/admin/users"
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNewUsers();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Table variant="striped" colorScheme="gray">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Mobile</Th>
          <Th>Created At</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <Tr key={user._id}>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>{user.mobile}</Td>
            <Td>
              {new Date(user.createdAt).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default UserTable;
