import {
  Skeleton,
  SkeletonText,
  CardFooter,
  Card,
  Divider,
  Stack,
  CardBody,
  Flex,
  Text,
  Box,
  Center,
} from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const ProductDetailsSkeleton = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
<Box w={"50%"} minW={{sm:"400px",base:"100%"}} mx={"auto"}>
      <Flex
        alignItems={"center"}
        maxW="sm"
        mx={4}
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
          p={4}
          m={2} w={"100%"}
        >
          <Skeleton mx={"auto"} h={"200px"} minW={{sm:"50%",base:"100%"}} />
          <Stack mx={"auto"}>
            <CardBody>
              <SkeletonText
                mt="4"
                noOfLines={1}
                spacing="4"
                w={"100%"} 
                mx={"2px"}
              />
              <SkeletonText
                mt="4"
                noOfLines={2}
                spacing="4"
                w={40}
                mx={"auto"}
              />
            </CardBody>
            <Divider />
            <CardFooter>
              <Skeleton height="20px" spacing="4" w={"100%"} mx={"auto"} />
            </CardFooter>
          </Stack>
        </Card>
      </Center>
    </Box>
  );
};

export default ProductDetailsSkeleton;
