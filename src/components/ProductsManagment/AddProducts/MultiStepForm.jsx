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
} from "@chakra-ui/react";
import axios from "axios";

import { useToast } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";

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
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
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
    images: [
      "https://example.com/images/gold-necklace.jpg",
      "https://example.com/images/gold-necklace-2",
    ],
  });

  const postProduct = async (productData, token) => {
    try {
      const response = await axios.post(
        "https://jwell-bliss-test-dev.cyclic.app/api/products",
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
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGVhbGVyIFVzZXIiLCJtb2JpbGUiOiI5ODc2NTQzMjEiLCJlbWFpbCI6ImRlYWxlcjFAZ21haWwuY29tIiwiX2lkIjoiNjQ4YzE3YjY1ZDU3Njg3MDk2NWM0Y2ZhIiwiaWF0IjoxNjg2OTAyNzY5fQ.AxCUmUVAD_l66Dd2RfBqcl9L_kEBH-rPTyTBt4BzZLk";
    postProduct(productState, token);
  };

  return (
    <>
      {/* //This is the original code for multistep form */}
      {/* <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          value={progress}
          mb="5%"
          size="xs"
          colorScheme="blue"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? (
          <Form1
            productState={productState}
            setProductState={setProductState}
          />
        ) : step === 2 ? (
          <Form2
            productState={productState}
            setProductState={setProductState}
          />
        ) : step === 3 ? (
          <Form3
            productState={productState}
            setProductState={setProductState}
          />
        ) : (
          <>
            <HStack>
              <Heading>Product Added Suceessfully</Heading>
              <Button
                colorScheme="blue"
                size={"lg"}
                onClick={(e) => {
                  setStep((prev) => 1);
                  setProgress(33.33);
                }}
              >
                Add Another
              </Button>
            </HStack>
          </>
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1 || step >= 3}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step >= 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={handleAddProduct}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box> */}
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
          <Box display={"flex"} justifyContent={"center"} m={8} p={4}>
            <Button
              boxShadow={"lg"}
              w="7rem"
              colorScheme="yellow"
              variant="solid"
              isLoading={loading}
              spinner={<BeatLoader size={8} color="white" />}
              onClick={handleAddProduct}
            >
              Submit
            </Button>
          </Box>
        </Box>
      }
    </>
  );
}
