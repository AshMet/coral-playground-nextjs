/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

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
} from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { usePostHog } from "posthog-js/react";
import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
// import { TbBuildingStore, TbScubaMask } from "react-icons/tb";

import AlertPopup from "components/alerts/AlertPopup";
import InputField from "components/fields/InputField";
import NavLink from "components/navLinks/NavLink";
import LoginLayout from "layouts/LoginLayout";
// import * as gtag from "lib/data/gtag";
import { addBrevoContact } from "utils/sendInBlue/contacts";
import { sendBrevoMail } from "utils/sendInBlue/sendMail";

export default function SignUp() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const toast = useToast();
  const posthog = usePostHog();

  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consented, setConsented] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "business",
    businessName: "",
  });
  const togglePassVis = () => setShow(!show);

  const { firstName, lastName, email, password, role, businessName } = userData;

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

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
    const { error } = await supabase.auth.signUp({
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
      // gtag.event({
      //   action: "signup-error",
      //   category: "button",
      //   label: "User",
      //   // value: newItem.title,
      // });
      posthog.capture("Sign Up Failed", {
        Email: email,
        Method: "Email",
        Error: error.message,
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
      posthog.capture("Sign Up", {
        $set: {
          email,
          Role: role,
          "First Name": firstName,
          "Last Name": lastName,
          "Business Name": businessName,
        },
      });
      // Success Analytics Tag
      // gtag.event({
      //   action: "signup-success",
      //   category: "button",
      //   label: "User",
      //   // value: newItem.title,
      // });
      // Add user to Brevo
      const brevoUser = await addBrevoContact(
        firstName,
        lastName,
        email,
        role,
        businessName
      );
      const brevoEmail = await sendBrevoMail(
        "Coral Playground",
        email,
        "Welcome to Coral Plaground",
        10
      );
      console.log("brevoUser", brevoUser);
      console.log("brevoEmail", brevoEmail);
    }

    setLoading(false);
    // router.push(`/dive_centres/${data.id}`);
  };

  if (user) {
    router.push("/users/me");
  } else
    return (
      <>
        <NextSeo
          title="Coral Playground | Sign Up"
          description="Login Page"
          canonical="https://www.coralplayground.com/business/signup"
          openGraph={{
            type: "website",
            title: "Coral Playground | Sign Up",
            description: "Dive Centres Sign Up Page",
            url: "https://www.coralplayground.com/business/signup",
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
        <LoginLayout illustrationBackground="/img/auth/dive_school.jpg">
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
              <Heading as="h1" color={textColor} fontSize="36px" mb="10px">
                Business Sign Up
              </Heading>
              <Text
                mb="36px"
                ms="4px"
                color={textColorSecondary}
                fontWeight="400"
                fontSize="md"
              >
                Sign Up as a Diver Instead?
                <Link href="/auth/signup" color="brand.100" ml={3}>
                  Click Here
                </Link>
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
                  name="businessName"
                  label="Business Name"
                  value={businessName}
                  placeholder="Name of your dive centre"
                  onChange={handleChange}
                  isError={businessName === ""}
                  errorMessage="Business Name cannot be empty"
                  isRequired
                />
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
