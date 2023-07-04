import React, { useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  FormErrorMessage,
  InputRightElement,
  HStack,
  IconButton,
  Toast,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import { Image as CloudImage } from "cloudinary-react";

import { useToast } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import { AdminState } from "../../context/context";

const Form1 = ({ productState, setProductState }) => {
  console.log(productState);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Heading w="100%" textAlign="center" fontWeight="normal" mb="2%">
        Add a new Product
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel>Product Name</FormLabel>
          <Input
            name="name"
            value={productState.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
          <FormLabel mt={4}>Description</FormLabel>
          <Textarea
            name="description"
            value={productState.description}
            onChange={handleChange}
            placeholder="Enter product description"
          />
        </FormControl>

        <FormControl>
          <FormLabel mt={4}>MRP</FormLabel>
          <Input
            name="mrp"
            value={productState.mrp}
            onChange={handleChange}
            placeholder="Enter product MRP"
          />
          <FormLabel mt={4}>Price</FormLabel>
          <Input
            name="price"
            value={productState.price}
            onChange={handleChange}
            placeholder="(It will be displayed on the website)"
          />
        </FormControl>
      </Flex>
      <FormControl mt="2%" />
    </>
  );
};

const Form2 = ({ productState, setProductState }) => {
  const handleChange = (event, property) => {
    console.log(productState);
    const { value } = event.target;
    setProductState((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

  return (
    <>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel mt={4}>Category</FormLabel>
        <Input
          value={productState.category}
          onChange={(e) => handleChange(e, "category")}
          placeholder="Enter product category"
        />
        <FormLabel mt={4}>Brand</FormLabel>
        <Input
          value={productState.brand}
          onChange={(e) => handleChange(e, "brand")}
          placeholder="Enter product brand"
        />
        <FormLabel mt={4}>Material</FormLabel>
        <Input
          value={productState.material}
          onChange={(e) => handleChange(e, "material")}
          placeholder="Enter product material"
        />
        <FormLabel mt={4}>Size</FormLabel>
        <Input
          value={productState.size}
          onChange={(e) => handleChange(e, "size")}
          placeholder="Enter product size"
        />
        <FormLabel mt={4}>Color</FormLabel>
        <Input
          value={productState.color}
          onChange={(e) => handleChange(e, "color")}
          placeholder="Enter product color"
        />
        <FormErrorMessage>{productState.error}</FormErrorMessage>
      </FormControl>
    </>
  );
};

const ImageFormCloudinary = ({
  productState,
  setProductState,
  setDisabled,
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false); // For the upload button
  const toast = useToast();
  const handleFileChange = (event) => {
    if (previewUrls.length >= 5) {
      toast({
        title: "Maximum 5 images allowed.",
        description: "You can only upload 5 images.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      return; // Limit to maximum 5 files
    }
    const files = Array.from(event.target.files).slice(0, 5); // Limit to maximum 5 files
    setSelectedFiles((prev) => [...prev, ...files]);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
    console.log("selectedFiles", selectedFiles);
  };

  const handleUpload = async () => {
    setDisabled((prev) => true);
    setLoading((prev) => true);
    // Upload logic for multiple images using Cloudinary API here
    const uploadPromises = selectedFiles.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "rteqoedcTESTER");

      return fetch("https://api.cloudinary.com/v1_1/dgz92gopi/upload", {
        method: "POST",
        body: formData,
      }).then((response) => response.json());
    });

    // Handle the response and any additional logic after the upload is complete for each image
    Promise.all(uploadPromises)
      .then((results) => {
        const images = results.map((result) => result.secure_url);
        setProductState((prevState) => {
          const updatedState = { ...prevState }; // Create a shallow copy of prevState
          updatedState.images = [...(updatedState.images || []), ...images]; // Merge images array into the "images" property
          return updatedState;
        });

        setLoading((prev) => false);
        setDisabled((prev) => false);
        console.log(results);
      })
      .catch((error) => {
        setLoading((prev) => false);
        toast({
          title: "Failed to upload images.",
          description: `Some Error Happend : z${error}`,
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
        setDisabled((prev) => false);
        console.error(error);
      });
  };

  return (
    <Box>
      <HStack>
        {previewUrls.length > 0
          ? previewUrls.map((url, index) => (
              <Box>
                <CloudImage
                  key={index}
                  src={url}
                  alt={`Preview ${index + 1}`}
                  width="200px"
                  height="200px"
                />{" "}
              </Box>
            ))
          : null}
      </HStack>

      <Box
        border="2px dashed"
        borderColor="gray.300"
        borderRadius="md"
        p={4}
        textAlign="center"
      >
        <IconButton
          as="label"
          htmlFor="file"
          icon={<FiUpload />}
          fontSize="2xl"
          mb={2}
        />
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple // Allow multiple file selection
          accept="image/*"
          max="5" // Limit to maximum 5 files
        />
        <Box>Upload up to 5 images</Box>
      </Box>

      {selectedFiles.length > 0 && (
        <Box mt={4}>
          <Stack direction="row" spacing={4}>
            <Button
              leftIcon={<FiUpload />}
              colorScheme="pink"
              isLoading={loading}
              variant="solid"
              spinner={<BeatLoader size={8} color="white" />}
              onClick={handleUpload}
            >
              Upload
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

const Form3 = () => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Add Product
      </Heading>
    </>
  );
};

export default function MultiStepForm() {
  const { token, API_BASE_URL } = AdminState();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [productState, setProductState] = useState({
    name: "",
    description: "",
    mrp: "",
    price: "",
    category: "",
    brand: "",
    material: "",
    size: "",
    color: "",
    error: "",
    images: [],
  });

  const postProduct = async (productData, token, API_BASE_URL) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/products`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Post request successful:", response.data);

      toast({
        title: "Product Added Successfully.",
        description: "We've created your product for you.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      setStep((prevState) => prevState + 1);
      // Perform any additional actions or handle the response as needed
    } catch (error) {
      console.error("Error while making the post request:", error);
      // Handle the error condition

      toast({
        title: "Failed to add product.",
        description: `Some Error Happend : z${error}`,
        status: "error",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    setLoading(true);
    postProduct(productState, token, API_BASE_URL);
  };

  return (
    <>
      {
        <Box>
          <Form1
            productState={productState}
            setProductState={setProductState}
          />
          <Form2
            productState={productState}
            setProductState={setProductState}
          />
          <ImageFormCloudinary
            productState={productState}
            setProductState={setProductState}
            disabled={disabled}
            setDisabled={setDisabled}
          />
          <Box display={"flex"} justifyContent={"center"} m={8} p={4}>
            <Button
              boxShadow={"lg"}
              w="7rem"
              colorScheme="yellow"
              variant="solid"
              isLoading={loading}
              spinner={<BeatLoader size={8} color="white" />}
              onClick={handleAddProduct}
              isDisabled={disabled}
            >
              Submit
            </Button>
          </Box>
        </Box>
      }
    </>
  );
}
