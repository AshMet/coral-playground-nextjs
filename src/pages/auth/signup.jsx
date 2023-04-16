/* eslint-disable import/no-extraneous-dependencies */
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

// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  InputGroup,
  InputRightElement,
  Link,
  SimpleGrid,
  Text,
  useToast,
  useColorModeValue,
  useRadioGroup,
  Spacer,
} from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { posthog } from "posthog-js";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
// import { TbBuildingStore, TbScubaMask } from "react-icons/tb";

import AlertPopup from "components/alerts/AlertPopup";
import InputField from "components/fields/InputField";
import RadioCard from "components/fields/RadioCard";
import NavLink from "components/navLinks/NavLink";
import { HSeparator } from "components/separator/Separator";
import LoginLayout from "layouts/LoginLayout";
import * as gtag from "lib/data/gtag";

export default function SignUp() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const toast = useToast();
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
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
  const [loading, setLoading] = useState(false);
  const [consented, setConsented] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const togglePassVis = () => setShow(!show);

  const { firstName, lastName, email, password, role } = userData;

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value) => {
    const roleValue =
      value === "Register My Business" ? "dive_centre_owner" : "diver";
    setUserData({ ...userData, role: roleValue });
    // console.log("roleValue", roleValue);
    // console.log("userData", userData);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "Sign up as a Diver",
    onChange: handleRoleChange,
  });

  const group = getRootProps();
  // const options = [
  //   { icon: <Icon as={TbScubaMask} width="30px" />, title: "Diver" },
  //   { icon: <Icon as={TbBuildingStore} size="30px" />, title: "Business" },
  // ];
  const options = ["Sign up as a Diver", "Register My Business"];

  const signUpEmailPass = async () => {
    if (consented === false) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="danger"
            text="Please accept terms & conditions before proceeding"
          />
        ),
      });
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          user_role: role,
        },
      },
    });
    // Alert & Analytics for failed load
    if (error) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="danger"
            text="Unable to Sign Up"
            subtext={error.message}
          />
        ),
      });
      gtag.event({
        action: "signup-error",
        category: "button",
        label: "User",
        // value: newItem.title,
      });
    } else {
      // Success Alert
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="success"
            text="Sign Up Successful"
            subtext="Please confirm your email to complete registration"
          />
        ),
      });
      // posthog.identify(data.id, { role }, { email });
      posthog.identify({
        distinctId: data.id,
        properties: {
          role,
          email,
        },
      });
      // Success Analytics Tag
      gtag.event({
        action: "signup-success",
        category: "button",
        label: "User",
        // value: newItem.title,
      });
    }

    setLoading(false);
    // router.push(`/diving/dive_centres/${data.id}`);
  };

  const signUpGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    // Alert & Analytics for failed load
    if (error) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="danger"
            text="Unable to Login using Google, please try a different method"
            subtext={error.message}
          />
        ),
      });
      gtag.event({
        action: "google-login-error",
        category: "button",
        label: "User",
        // value: newItem.title,
      });
    } else {
      // Success Alert
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="success"
            text="Signed Up using Google Successfully"
            subtext="Redirecting..."
          />
        ),
      });
      // Success Analytics Tag
      gtag.event({
        action: "signup-google-success",
        category: "button",
        label: "User",
        // value: newItem.title,
      });
    }

    setLoading(false);
    // router.push(`/diving/dive_centres/${data.id}`);
  };

  if (user) {
    router.push("/users/me");
  } else
    return (
      <>
        <NextSeo
          title="Coral Playground | Sign Up"
          description="Login Page"
          canonical="https://www.coralplayground.com/auth/signup"
          openGraph={{
            type: "website",
            title: "Coral Playground | Sign Up",
            description: "Dive Centres Sign Up Page",
            url: "https://www.coralplayground.com/auth/signup",
            images: [
              {
                url: "https://www.coralplayground.com/svg/coral-logo.svg",
                width: 800,
                height: 400,
                alt: "Coral Playground Logo",
              },
            ],
          }}
        />
        <LoginLayout
          illustrationBackground={
            role === "dive_centre_owner"
              ? "/img/auth/dive_school.jpg"
              : "/img/auth/diver.jpg"
          }
        >
          <Flex
            maxW={{ base: "100%", md: "max-content" }}
            w="100%"
            mx={{ base: "auto", lg: "0px" }}
            me="auto"
            h="100%"
            alignItems="start"
            justifyContent="center"
            mb={{ base: "30px", md: "60px" }}
            px={{ base: "25px", md: "0px" }}
            mt={{ base: "40px", md: "7vh" }}
            flexDirection="column"
          >
            <Box me="auto">
              <Heading color={textColor} fontSize="36px" mb="10px">
                Sign Up
              </Heading>
              <Text
                mb="36px"
                ms="4px"
                color={textColorSecondary}
                fontWeight="400"
                fontSize="md"
              >
                Select your preferred method below:
              </Text>
            </Box>

            <SimpleGrid columns={2} gap={{ sm: "10px", md: "26px" }} {...group}>
              {options.map((value) => {
                const radio = getRadioProps({ value });
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                );
              })}
              <Spacer />
            </SimpleGrid>

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
                {userData.role !== "dive_centre_owner" && (
                  <>
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
                      onClick={signUpGoogle}
                      disabled={loading}
                    >
                      <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
                      Sign up with Google
                    </Button>
                    <Flex align="center" mb="25px">
                      <HSeparator />
                      <Text color={textColorSecondary} mx="14px">
                        or
                      </Text>
                      <HSeparator />
                    </Flex>
                  </>
                )}
                <SimpleGrid
                  columns={{ base: "1", md: "2" }}
                  gap={{ sm: "10px", md: "26px" }}
                >
                  <Flex direction="column">
                    <InputField
                      name="firstName"
                      label="First Name"
                      value={firstName}
                      placeholder="First Name"
                      onChange={handleChange}
                      isError={firstName === ""}
                      errorMessage="First name cannot be empty"
                      isRequired
                    />
                  </Flex>
                  <Flex direction="column">
                    <InputField
                      name="lastName"
                      label="Last Name"
                      value={lastName}
                      placeholder="Last Name"
                      onChange={handleChange}
                      isError={lastName === ""}
                      errorMessage="Last name cannot be empty"
                      isRequired
                    />
                  </Flex>
                </SimpleGrid>

                <InputField
                  name="email"
                  label="Email"
                  value={email}
                  placeholder="Email"
                  onChange={handleChange}
                  isError={email === ""}
                  errorMessage="Email cannot be empty"
                  isRequired
                />
                <InputGroup size="md">
                  <InputField
                    name="password"
                    value={password}
                    label="Password"
                    isRequired
                    variant="auth"
                    fontSize="sm"
                    ms={{ base: "0px", md: "4px" }}
                    placeholder="Min. 8 characters"
                    mb="24px"
                    size="lg"
                    type={show ? "text" : "password"}
                    isError={password === ""}
                    errorMessage="Password cannot be empty"
                    onChange={handleChange}
                  />
                  <InputRightElement
                    display="flex"
                    alignItems="center"
                    mt="30px"
                  >
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: "pointer" }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={togglePassVis}
                    />
                  </InputRightElement>
                </InputGroup>
                <Flex justifyContent="space-between" align="center" mb="24px">
                  <FormControl display="flex" alignItems="start">
                    <Checkbox
                      id="remember-login"
                      colorScheme="brandScheme"
                      me="10px"
                      mt="3px"
                      isChecked={consented}
                      onChange={() => setConsented(!consented)}
                      isRequired
                    />
                    <FormLabel
                      htmlFor="remember-login"
                      mb="0"
                      fontWeight="normal"
                      color={textColor}
                      fontSize="sm"
                    >
                      By creating an account means you agree to the{" "}
                      <Link href="../legal/terms" fontWeight="500">
                        Terms and Conditions,
                      </Link>{" "}
                      and our{" "}
                      <Link href="../legal/privacy" fontWeight="500">
                        Privacy Policy
                      </Link>
                    </FormLabel>
                  </FormControl>
                </Flex>
                <Button
                  variant="brand"
                  fontSize="14px"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  mb="24px"
                  onClick={signUpEmailPass}
                  disabled={loading}
                >
                  Create my account
                </Button>
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="start"
                  maxW="100%"
                  mt="0px"
                >
                  <Text color={textColorDetails} fontWeight="400" fontSize="sm">
                    Already a member?
                    <NavLink to="/auth/login">
                      <Text
                        color={textColorBrand}
                        as="span"
                        ms="5px"
                        fontWeight="500"
                      >
                        Sign in
                      </Text>
                    </NavLink>
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </LoginLayout>
      </>
    );
}
