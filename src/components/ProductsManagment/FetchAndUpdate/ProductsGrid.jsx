import { Box, Button, Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import UpdateProductForm from "./UpdateProduct";
import { AdminState } from "../../context/context";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [curentUpdateProduct, setCurentUpdateProduct] = useState({});
  const { user, tokem, fetchAgain } = AdminState();
  useEffect(() => {
    fetchProducts();
  }, [fetchAgain]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://jwell-bliss-test-dev.cyclic.app/api/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleUpdateProduct = async (productID, product) => {
    // Implement the logic to handle updating a product
    console.log("Updating product:", product);
    setIsUpdate((prev) => !prev);
    setCurentUpdateProduct(product);
  };

  const handleDeleteProduct = async (productID, product) => {
    // Implement the logic to handle deleting a product

    console.log("Deleting product:", productID);
  };

  const containerStyle = {
    color: "gray",
    fontSize: "16px",
    maxHeight: "30px", // Set the maximum height for the container
    overflow: "hidden", // Hide the overflowed content
    textOverflow: "ellipsis", // Add ellipsis (...) when the text overflows
  };

  return (
    <>
      {products.length > 0 ? (
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
          {products.map((product) => (
            <GridItem key={product.id}>
              <Box borderWidth="1px" borderRadius="md" p={4}>
                <Text fontWeight="bold">{product.name}</Text>
                <p style={containerStyle}>{product.description}</p>
                <Text fontSize={"sm"}>MRP: ₹{product.mrp}</Text>
                <Text fontWeight="bold">Website Price: ₹{product.price}</Text>
                <Box mt={4} display={"flex"} justifyContent={"space-between"}>
                  <UpdateProductForm
                    key={product._id}
                    product={product}
                    productID={product._id}
                  />
                  <Button
                    colorScheme="red"
                    size="sm"
                    ml={2}
                    onClick={() => handleDeleteProduct(product._id, product)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </GridItem>
          ))}
        </Grid>
      ) : (
        <>
          <Box display={"flex"} m={12} justifyContent={"center"}>
            <Spinner size={"lg"} />
            <Text>Loading...</Text>
          </Box>
        </>
      )}
    </>
  );
};

export default ProductGrid;
