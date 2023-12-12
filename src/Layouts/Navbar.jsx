/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  Text,
  Badge,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { BsCart, BsMagic } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import CookieService from "../services/CookieService";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../app/features/cartSlice";
import CartDrawer from "../components/CartDrawer";
import { onOpenCartDrawerAction } from "../app/features/globalSlice";

const Links = ["products", "about"];

export default function AppNavbar() {
  const dispatch=useDispatch()
  const token = CookieService.get("jwt");
  const username = CookieService.get("name");
  const email = CookieService.get("email");

  const { cartProducts } = useSelector(selectCart);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const logoutHandler = () => {
    CookieService.remove("jwt");
    window.location.reload();
  };
  return (
    <>
    <CartDrawer/>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        className={` sticky top-0 z-50 ${
          colorMode === "dark" ? "app-navbar-dark" : "app-navbar-light"
        } `}
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Button
                as={Link}
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                leftIcon={<BsMagic />}
                to={"/"}
              >
                E&apos;Commerce
              </Button>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLinks key={link}>{link}</NavLinks>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"} gap={2}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Button
              onClick={() => {
                console.log(cartProducts);
                dispatch(onOpenCartDrawerAction())
              }}
              position="relative"
            >
              <BsCart size={20} />
              <Badge
                ml="1"
                colorScheme="green"
                position="absolute"
                top={0}
                right={2}
              >
                {cartProducts.length}
              </Badge>
            </Button>

            {token ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    rounded={"full"}
                    border={"1px  solid teal"}
                    size={"sm"}
                    src={
                      "https://cdn.icon-icons.com/icons2/3951/PNG/512/programmer_icon_251062.png"
                    }
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      rounded={"full"}
                      border={"1px  solid teal"}
                      size={"2xl"}
                      src={
                        "https://cdn.icon-icons.com/icons2/3951/PNG/512/programmer_icon_251062.png"
                      }
                    />
                  </Center>
                  <br />
                  <Center>
                    <Text className=" capitalize">{username}</Text>
                  </Center>

                  <MenuDivider />
                  {/* <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem> */}
                  <MenuItem as={Button} onClick={logoutHandler}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                as={Link}
                to={"/login"}
              >
                Login
              </Button>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLinks key={link}>{link}</NavLinks>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

const NavLinks = (props) => {
  const { children } = props;
  return (
    <NavLink
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      to={children}
    >
      {children}
    </NavLink>
  );
};
