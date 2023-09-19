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
  Text,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { usePostHog } from "posthog-js/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
// import { TbBuildingStore, TbScubaMask } from "react-icons/tb";

import AlertPopup from "components/alerts/AlertPopup";
import InputField from "components/fields/InputField";
import NavLink from "components/navLinks/NavLink";
import { HSeparator } from "components/separator/Separator";
import LoginLayout from "layouts/LoginLayout";
// import * as gtag from "lib/data/gtag";

export default function Login() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const toast = useToast();
  const posthog = usePostHog();
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
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userData;

  const togglePassVis = () => setShow(!show);
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const signInEmailPass = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    // Alert & Analytics for failed load
    if (error) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="danger"
            text="Unable to Login"
            subtext={error.message}
          />
        ),
      });
      // gtag.event({
      //   action: "login-error",
      //   category: "button",
      //   label: "User",
      //   // value: newItem.title,
      // });
      posthog.capture("Login Failed", {
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
            text="Login Successful"
            // subtext="Please confirm your email to complete registration"
          />
        ),
      });
      // Success Analytics Tag
      posthog.capture("Login", {
        Email: email,
        Method: "Email",
      });
      // gtag.event({
      //   action: "login-success",
      //   category: "button",
      //   label: "User",
      //   // value: newItem.title,
      // });
    }

    setLoading(false);
    // router.push(`/dive_centres/${data.id}`);
  };

  const loginGoogle = async () => {
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
      // gtag.event({
      //   action: "google-login-error",
      //   category: "button",
      //   label: "User",
      //   // value: newItem.title,
      // });
      posthog.capture("Google Login Failed", {
        Error: error.message,
      });
    } else {
      // Success Alert
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="success"
            text="Logged In using Google Successfully"
            subtext="Redirecting..."
          />
        ),
      });
      // Success Analytics Tag
      // gtag.event({
      //   action: "login-google-success",
      //   category: "button",
      //   label: "User",
      //   // value: newItem.title,
      // });
      posthog.capture("Login", {
        Email: email,
        Method: "Google",
      });
    }

    setLoading(false);
    // router.push(`/dive_centres.id}`);
  };

  if (user) {
    router.push("/users/me");
  } else
    return (
      <>
        <NextSeo
          title="Login"
          description="Login Page"
          canonical="https://www.coralplayground.com/auth/login"
          openGraph={{
            type: "website",
            title: "Coral Playground | Login",
            description: "Dive Centres Login Page",
            url: "https://www.coralplayground.com/auth/login",
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
          illustrationBackground="/img/diving/3-clownfish.jpg"
          image="/img/diving/3-clownfish.jpg"
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
                Sign In
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
                {userData.role !== "business" && (
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
                      onClick={loginGoogle}
                      disabled={loading}
                    >
                      <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
                      Sign in with Google
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
                  <NavLink to="/auth/forgot_password">
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
                  variant="brand"
                  fontSize="14px"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  mb="24px"
                  onClick={signInEmailPass}
                  disabled={loading}
                >
                  Sign In
                </Button>
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="start"
                  maxW="100%"
                  mt="0px"
                >
                  <Text
                    color={textColorDetails}
                    fontWeight="400"
                    fontSize="14px"
                  >
                    Not registered yet?
                    <NavLink to="/auth/signup">
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
              </Flex>
            </Flex>
          </Flex>
        </LoginLayout>
      </>
    );
}
