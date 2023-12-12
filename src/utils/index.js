import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();
export const addItemToShoppingCart = (
  cartItem = {},
  shoppingCartItems = []
) => {
  const existItem = shoppingCartItems.find((item) => item.id === cartItem.id);
  if (existItem) {
    toast({
      title: "Item added to cart",
      description: "Item already in the cart",
      status: "success",
      isClosable: true,
      duration: 2000,
    });
    return shoppingCartItems.map((item) =>
      item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  toast({
    title: "Item added to cart",
    status: "success",
    isClosable: true,
    duration: 2000,
  });
  return [...shoppingCartItems, { ...cartItem, quantity: 1 }];
};
