import React, { useEffect, useState } from "react";
import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
const DashboardCard = ({ title, value }) => {
  return (
    <Box p={4} borderRadius="md" boxShadow="lg" bg="white" textAlign="center">
      <Text fontWeight="bold" fontSize="xl" mb={2}>
        {title}
      </Text>
      <Text fontSize="4xl">{value}</Text>
    </Box>
  );
};

const HomeDashboard = () => {
  // Replace these sample data with your actual data
  const [totalProducts, setTotalProducts] = useState(0);
  const getTotalProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5008/api/products");
      const totalProducts = response.data.length;
      console.log(totalProducts);
      return totalProducts;
    } catch (error) {
      console.error("Error while fetching total products:", error);
      throw error;
    }
  };
  useEffect(() => {
    const ex = async () => {
      const tp = await getTotalProducts();
      setTotalProducts((prev) => tp);
      console.log("totalProducts:", tp);
    };
    ex();
  }, []);

  const totalUsers = 500;
  const totalOrders = 1000;
  const totalRevenue = "$10,000";

  return (
    <Flex justify="center" align="center">
      <SimpleGrid columns={[1, 2, 4]} spacing={4}>
        <DashboardCard title="Total Products" value={totalProducts} />
        <DashboardCard title="Total Users" value={totalUsers} />
        <DashboardCard title="Total Orders" value={totalOrders} />
        <DashboardCard title="Total Gross Revenue" value={totalRevenue} />
      </SimpleGrid>
    </Flex>
  );
};

export default HomeDashboard;
