/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Image, Stack, Text, Flex, Divider } from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { URL } from "../store/type";
import { removeFromCart } from "../app/features/cartSlice";

const CartDrawerItem = ({
  id,
  attributes: { thumbnail, title, price },
  quantity,
}) => {
  console.log({ thumbnail, title, price });
  const dispatch = useDispatch();
  return (
    <>
      <Flex alignItems={"center"} mb={3} py={2}>
        <Image
          src={ thumbnail?.data?.attributes?.url} 
          alt={title}
          w={"80px"}
          h={"80px"}
          rounded="full"
          objectFit={"cover"}
          mr={5}
        />
        <Stack w="full">
          <Text fontSize={"sm"}>Title: {title}</Text>
          <Text fontSize={"sm"}>Price: ${price}</Text>

          <Text fontSize={"sm"}>Quantity: {quantity}</Text>
          <Button
            leftIcon={<BsTrash />}
            variant="outline"
            colorScheme="red"
            size="md"
            w="full"
            onClick={() => dispatch(removeFromCart(id))}
          >
            Remove
          </Button>
        </Stack>
      </Flex>

      <Divider />
    </>
  );
};

export default CartDrawerItem;
