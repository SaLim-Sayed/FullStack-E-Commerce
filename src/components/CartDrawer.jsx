import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,Text
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onCloseCartDrawerAction,
  selectGlobal,
} from "../app/features/globalSlice";
import { removeAllItems, selectCart } from "../app/features/cartSlice";
import CartDrawerItem from "./CartDrawerItem";
import { BsTrash2Fill } from "react-icons/bs";

const CartDrawer = () => {
  const btnRef = React.useRef();
  const { isOpenCartDrawer } = useSelector(selectGlobal);
  const { cartProducts } = useSelector(selectCart);
  console.log(cartProducts);
  const dispatch = useDispatch();

  const onCloseHandler = () => {
    dispatch(onCloseCartDrawerAction());
  };
  return (
    <Drawer
      isOpen={isOpenCartDrawer}
      placement="right"
      onClose={onCloseHandler}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your Shopping Cart</DrawerHeader>

        <DrawerBody>
        {cartProducts.length ? (
            cartProducts.map(item => <CartDrawerItem key={item.id} {...item} />)
          ) : (
            <Text fontSize={"lg"}>Your cart is empty</Text>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button
          leftIcon={<BsTrash2Fill />}
            variant="outline"
            colorScheme="red"
            mr={3}
            onClick={() => dispatch(removeAllItems())}
          >
            Clear All
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
