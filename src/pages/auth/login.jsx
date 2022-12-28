/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___  
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \ 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/ 
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { NextSeo } from "next-seo";
// import { useRouter } from "next/router";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useSelector } from "react-redux";

import NavLink from "../../components/navLinks/NavLink";
import { HSeparator } from "components/separator/Separator";
import CenteredAuth from "layouts/auth/types/Centered";

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const emailRef = useRef();
  const passwordRef = useRef();
  const errorMessages = useSelector((state) => state.session.errorMessages);
  const [errors, setErrors] = useState([]);
  const loading = false;
  // const dispatch = useDispatch();
  // const router = useRouter();

  useEffect(() => {
    emailRef?.current?.focus();
    if (errorMessages.length > 0) {
      setErrors(errorMessages);
    }
  }, []);

  async function handleSubmit(event) {
    console.log("start login email", emailRef);
    console.log("start login password", passwordRef);
    event.preventDefault();
    setErrors([]);
    if (
      emailRef?.current === undefined ||
      emailRef.current.value === "" ||
      passwordRef?.current === undefined ||
      passwordRef.current.value === ""
    ) {
      return setErrors(["Please fill out all fields"]);
    }

    const { data, error } = await supabase.auth.signUp({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    // const response = await dispatch(loginUser(payload));
    // // console.log(response);
    // if (errorMessages.length === 0) {
    //   router.push("/");
    // } else {
    //   return setErrors(errorMessages);
    // }
  }

  if (user) router.push("/diving/home");
  else
    return (
      <>
        <NextSeo
          title="Sign In"
          description="Log in to start enjoying all the features of Coral Playground"
        />
        <CenteredAuth
          image="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
          cardTop={{ base: "140px", md: "14vh" }}
          cardBottom={{ base: "50px", lg: "auto" }}
          mx="0px"
        >
          <Flex
            maxW={{ base: "100%", md: "max-content" }}
            w="100%"
            mx={{ base: "auto", lg: "0px" }}
            me="auto"
            justifyContent="center"
            px={{ base: "20px", md: "0px" }}
            flexDirection="column"
          >
            {/* Using built-in supabase auth form */}
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="dark"
            />
            {/* Following sectiion is for manual auth form */}
            {/* <Box me="auto">
              <Heading color={textColor} fontSize="36px" mb="10px">
                Sign In
              </Heading>
              <Text
                mb="36px"
                ms="4px"
                color={textColorSecondary}
                fontWeight="400"
                fontSize="md"
              >
                Enter your email and password to sign in!
              </Text>
            </Box>
            <Flex
              zIndex="2"
              direction="column"
              w={{ base: "100%", md: "420px" }}
              maxW="100%"
              background="transparent"
              borderRadius="15px"
              mx={{ base: "auto", lg: "unset" }}
              me="auto"
              mb={{ base: "20px", md: "auto" }}
            >
              <Button
                fontSize="sm"
                me="0px"
                mb="26px"
                py="15px"
                h="50px"
                borderRadius="16px"
                bg={googleBg}
                color={googleText}
                fontWeight="500"
                _hover={googleHover}
                _active={googleActive}
                _focus={googleActive}
              >
                <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
                Sign in with Google
              </Button>
              <Flex align="center" mb="25px">
                <HSeparator />
                <Text color="gray.400" mx="14px">
                  or
                </Text>
                <HSeparator />
              </Flex>
              {errors.length > 0 ? (
                <Alert status="error" mb={5}>
                  {errors.map((error, index) => {
                    return (
                      <Box key={`alert-${index}`}>
                        <AlertIcon />
                        <AlertTitle>{error}</AlertTitle>
                      </Box>
                    );
                  })}
                </Alert>
              ) : (
                <> </>
              )}
              <FormControl>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Email<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "0px" }}
                  type="email"
                  placeholder="mail@simmmple.com"
                  mb="24px"
                  fontWeight="500"
                  size="lg"
                  ref={emailRef}
                />
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  isRequired
                  display="flex"
                >
                  Password<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    isRequired
                    fontSize="sm"
                    ms={{ base: "0px", md: "4px" }}
                    placeholder="Min. 8 characters"
                    mb="24px"
                    size="lg"
                    type={show ? "text" : "password"}
                    variant="auth"
                    ref={passwordRef}
                  />
                  <InputRightElement
                    display="flex"
                    alignItems="center"
                    mt="4px"
                  >
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: "pointer" }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClick}
                    />
                  </InputRightElement>
                </InputGroup>
                <Flex justifyContent="space-between" align="center" mb="24px">
                  <FormControl display="flex" alignItems="center">
                    <Checkbox
                      id="remember-login"
                      colorScheme="brandScheme"
                      me="10px"
                    />
                    <FormLabel
                      htmlFor="remember-login"
                      mb="0"
                      fontWeight="normal"
                      color={textColor}
                      fontSize="sm"
                    >
                      Keep me logged in
                    </FormLabel>
                  </FormControl>
                  <NavLink to="/auth/forgot-password">
                    <Text
                      color={textColorBrand}
                      fontSize="sm"
                      w="124px"
                      fontWeight="500"
                    >
                      Forgot password?
                    </Text>
                  </NavLink>
                </Flex>
                <Button
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  mb="24px"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Sign In
                </Button>
              </FormControl>
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="start"
                maxW="100%"
                mt="0px"
              >
                <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                  Not registered yet?
                  <NavLink to="/auth/sign-up">
                    <Text
                      color={textColorBrand}
                      as="span"
                      ms="5px"
                      fontWeight="500"
                    >
                      Create an Account
                    </Text>
                  </NavLink>
                </Text>
              </Flex>
            </Flex> */}
          </Flex>
        </CenteredAuth>
      </>
    );
}

// SignIn.PageLayout = CenteredAuth;
// SignIn.getLayout = function getLayout(page) {
//   return <CenteredAuth>{page}</CenteredAuth>;
// };

export default SignIn;
