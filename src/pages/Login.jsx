/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  InputRightElement,
  InputGroup,
  useColorMode,
  Text,
  FormHelperText,
} from "@chakra-ui/react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { BsArrowLeft } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLogin, userLogin } from "../app/features/loginSlice";

export default function Login({ isAuthenticated }) {
  const { loading, data  } = useSelector(selectLogin);
  console.log(data)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });
  const [isidentifier, setIsIdentifier] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const { colorMode } = useColorMode();

  const goBack = () => navigate(-1);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();

    if (!user.identifier && !user.password) {
      setIsIdentifier(true);
      setIsPassword(true);
      return;
    }
    if (!user.identifier) {
      setIsIdentifier(true);

      return;
    }
    if (!user.password) {
      setIsPassword(true);
      return;
    }
    setIsIdentifier(false);
    setIsPassword(false);
    dispatch(userLogin(user));
    console.log(user);
  };
  useEffect(() => {
    if (isAuthenticated !== null && isAuthenticated) {
      navigate(-1, { replace: true });
    }
  }, [isAuthenticated, navigate]);
 
  return (
    <Flex minH={"80vh"} align={"center"} justify={"center"}>
      <Stack mx={"auto"} maxW={"lg"}>
        <Flex
          alignItems={"center"}
          maxW="sm"
          mr={"auto"}
          my={3}
          fontSize={"lg"}
          cursor={"pointer"}
          onClick={goBack}
        >
          <BsArrowLeft />
          <Text ml={2}>Back</Text>
        </Flex>

        <Stack align={"center"}>
          <Heading fontSize={"4xl"} mb={3}>
            Sign in to your account
          </Heading>
        </Stack>

        <Box
          as={"form"}
          rounded={"lg"}
          border={
            colorMode === "light" ? "1px solid #ddd" : "1px solid #2d3748"
          }
          boxShadow={"10px 10px 0px 0px rgba(245,245,245,1)"}
          p={8}
          onSubmit={submitHandler}
        >
          <Stack spacing={4}>
            <FormControl id="identifier">
              <FormLabel>Email address</FormLabel>
              <Input
                value={user.identifier}
                type="identifier"
                isInvalid={isidentifier}
                errorBorderColor="crimson"
                name={"identifier"}
                onChange={onChangeHandler}
              />
              {isidentifier === false ? (
                <FormHelperText>Enter the Email</FormHelperText>
              ) : (
                <FormHelperText color={"crimson"}>
                  Email is required.
                </FormHelperText>
              )}
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  name={"password"}
                  isInvalid={isPassword}
                  onChange={onChangeHandler}
                  placeholder={
                    isPassword ? "Password is required" : "Enter Password"
                  }
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPassword === false ? (
                <FormHelperText>enter password.</FormHelperText>
              ) : (
                <FormHelperText color={"crimson"}>
                  Password is required.
                </FormHelperText>
              )}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"#7f42f8"}>Forgot password?</Link>
              </Stack>
              <Button
                color={"#e6f3fd"}
                bg={isidentifier || isPassword ? "red.500" : "blue.400"}
                _hover={{
                  bg: isidentifier || isPassword ? "red.600" : "blue.600",
                  border: "transparent",
                }}
                type="submit"
                h={12}
                isLoading={loading}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
     
    </Flex>
  );
}
