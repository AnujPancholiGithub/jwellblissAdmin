import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Image,
  Spinner,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import UpdateProductForm from "./UpdateProduct";
import { AdminState } from "../../context/context";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentUpdateProduct, setCurrentUpdateProduct] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const { user, token, fetchAgain, API_BASE_URL } = AdminState();
  const [error, setError] = useState(null);
  let filteredProducts;
  useEffect(() => {
    fetchProducts();
  }, [fetchAgain]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(
        (prev) =>
          error.response.data.message ||
          error.response.data.error ||
          error.message ||
          "Error while fetching products"
      );
    }
  };

  const handleUpdateProduct = async (productID, product) => {
    //logic to handle updating a product
    console.log("Updating product:", product);
    setIsUpdate((prev) => !prev);
    setCurrentUpdateProduct(product);
  };

  const handleDeleteProduct = async (productID, product) => {
    // Implement the logic to handle deleting a product
    console.log("Deleting product:", productID);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const descriptionStyle = {
    color: "gray",
    fontSize: "14px",
    maxHeight: "40px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filteredProducts = filteredProducts.reverse();

  useEffect(() => {}, []);

  return (
    <>
      {error ? (
        <Box>{error}</Box>
      ) : (
        <>
          <Box mb={4} display="flex" justifyContent="flex-end">
            <Input
              type="text"
              placeholder="Search by name or category"
              value={searchTerm}
              onChange={handleSearch}
              maxWidth="300px"
            />
          </Box>
          {filteredProducts?.length > 0 ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Image</Th>
                  <Th>Name</Th>
                  <Th>Category</Th>
                  <Th>Description</Th>
                  <Th isNumeric>MRP</Th>
                  <Th isNumeric>Website Price</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredProducts?.map((product) => (
                  <Tr key={product.id}>
                    <Td>
                      <Image width={"12"} src={product.images[0]} />
                    </Td>
                    <Td fontWeight="bold">{product.name}</Td>
                    <Td>{product.category}</Td>
                    <Td>
                      <p style={descriptionStyle}>{product.description}</p>
                    </Td>
                    <Td fontSize={"sm"}>₹{product.mrp}</Td>
                    <Td fontWeight="bold">₹{product.price}</Td>
                    <Td>
                      <Box display="flex" justifyContent="center">
                        <UpdateProductForm
                          key={product._id}
                          product={product}
                          productID={product._id}
                        />
                        {/* <Button
                      colorScheme="red"
                      size="sm"
                      ml={2}
                      onClick={() => handleDeleteProduct(product._id, product)}
                    >
                      Delete
                    </Button> */}
                      </Box>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Box display="flex" m={12} justifyContent="center">
              <Spinner size="lg" />
              <Text>Loading...</Text>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default ProductGrid;
