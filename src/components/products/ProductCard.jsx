/* eslint-disable react/prop-types */
import {
  Card,
  Image,
  CardBody,
  Stack,
  Text,
  Heading,
  Button,
  CardFooter,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { Link } from "react-router-dom";
const ProductCard = ({ attributes, id }) => {
  const colorMode = useColorMode();

  return (
    <Card border={"1px solid #a8b5c8"} bg={"none"}>
      <CardBody>
        <Image
          src={attributes?.thumbnail?.data?.attributes?.formats?.thumbnail?.url}
          alt="Green double couch with wooden legs"
          borderRadius="2xl"
          h={"200px"}
          w={"300px"}
          mx={"auto"}
          objectFit={"cover"}
        />
        <Stack mt="6">
          <Heading
            size="md"
            textAlign={"center"}
            textDecor={"underline"}
            mb={2}
          >
            {attributes.title}
          </Heading>
          <Text textAlign={"center"} fontSize={"sm"}>
            {attributes.description}
          </Text>
          <Text color="purple.600" fontSize="2xl" textAlign={"center"}>
            ${attributes.price}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button
          as={Link}
          to={`/products/${id}`}
          bg={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
          color={colorMode === "light" ? "white" : "#9f7aea"}
          size={"3xl"}
          border={"none"}
          w={"full"}
          py={5}
          _hover={{
            bg: colorMode !== "light" ? "#9f7aea" : "white",
            color: colorMode !== "light" ? "white" : "#9f7aea",
            border: "transparent",
          }}
          variant="outline"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
