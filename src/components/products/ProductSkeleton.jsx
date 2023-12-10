import { SkeletonCircle, SkeletonText, Box } from "@chakra-ui/react";
const ProductSkeleton = () => {
  return (
<Box  padding="10" boxShadow="lg" height='300px' width='300px'   alignItems={"space-between"} bg="gray.100" rounded={"lg"}>
      <SkeletonCircle size="10" mx={"auto"} />
      <SkeletonText mt="4" noOfLines={1} spacing="4" w={20} mx={"auto"} />
      <SkeletonText mt="4" noOfLines={2}  spacing="4" mx={"auto"} />

      {/* <Flex justifyContent={"space-around"}>
        <SkeletonText mt="4" noOfLines={1} spacing="4" w={20} />
        <SkeletonText mt="4" noOfLines={1} spacing="4" w={20} />
      </Flex> */}
      <SkeletonText mt="4" mx={"auto"} noOfLines={1} spacing="4" w={20} />

      <SkeletonText mt="4" noOfLines={1} spacing="4"   mx={"auto"} />
    </Box>
  );
};

export default ProductSkeleton;
