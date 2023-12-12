/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Center,
  Text,
  Box,
} from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useQuery } from "react-query";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import { URL } from "../../store/type";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cartSlice";
import { selectNetwork } from "../../app/features/networkSlice";
const Product = () => {
  const { isOnline } = useSelector(selectNetwork);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getProductList = async () => {
    const { data } = await axios.get(
      `${URL}/api/products/${id}?populate=thumbnail,category`
    );
    return data;
  };

  const { isLoading, data } = useQuery(["products", id], getProductList);

  if (isLoading || !isOnline)
    return (
      <Center maxW="sm" mx={"auto"} my={20}>
        <ProductDetailsSkeleton />
      </Center>
    );
  data && (document.title = `Product | ${data?.data?.attributes?.title}`);
  const goBack = () => navigate(-1);

  return (
    <Box mx={"auto"}>
      <Flex
        alignItems={"center"}
        maxW="lg"
        mx={"auto"}
        my={7}
        fontSize={"lg"}
        cursor={"pointer"}
        onClick={goBack}
      >
        <BsArrowLeft />
        <Text ml={2}>Back</Text>
      </Flex>
      <Center>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          p={2}
          w={"lg"}
          m={2}
        >
          <Stack bg={"gray.200"} alignItems={"center"}>
            <Image
              src={
                data?.data?.attributes?.thumbnail?.data?.attributes?.formats
                  ?.thumbnail?.url
              }
              alt={data?.data?.attributes?.title}
              borderRadius="lg"
              objectFit="contain"
              maxW={{ base: "100%", sm: "200px" }}
              m={"auto"}
              p={4}
            />
          </Stack>

          {/* <Divider orientation="vertical" h={"200px"} my={"auto"} /> */}
          <Stack>
            <CardBody>
              <Heading size="md" textAlign={"center"}>
                {data?.data?.attributes?.title}
              </Heading>
              <Text textAlign={"center"}>
                {data?.data?.attributes?.description}
              </Text>
              <Text color="blue.100" fontSize="2xl" textAlign={"center"}>
                {data?.data?.attributes?.category?.data?.attributes?.title}
              </Text>
              <Text color="blue.300" fontSize="2xl" textAlign={"center"}>
                ${data?.data?.attributes?.price}
              </Text>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button
                variant="solid"
                colorScheme="purple"
                w={"full"}
                size={"lg"}
                bg={"#6b28ef"}
                _hover={{
                  bg: "#570af2",
                  border: "transparent",
                }}
                color={"white"}
                textTransform={"uppercase"}
                onClick={() => {
                  dispatch(addToCart(data?.data));
                }}
              >
                Add to cart
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      </Center>
    </Box>
  );
};

export default Product;
