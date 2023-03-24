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
  Text,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
// import { TbBuildingStore, TbScubaMask } from "react-icons/tb";

import AlertPopup from "components/alerts/AlertPopup";
import NavLink from "components/navLinks/NavLink";
import { HSeparator } from "components/separator/Separator";
import LoginLayout from "layouts/LoginLayout";
import * as gtag from "lib/data/gtag";

export default function Login() {
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
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userData;

  const togglePassVis = () => setShow(!show);
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const signUpEmailPass = async () => {
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
      gtag.event({
        action: "login-error",
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
            text="Login Successful"
            // subtext="Please confirm your email to complete registration"
          />
        ),
      });
      // Success Analytics Tag
      gtag.event({
        action: "login-success",
        category: "button",
        label: "User",
        // value: newItem.title,
      });
    }

    setLoading(false);
    // router.push(`/diving/dive_centres/${data.id}`);
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
              <FormControl isRequired>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Email
                </FormLabel>
                <Input
                  name="email"
                  value={email}
                  isRequired
                  variant="auth"
                  fontSize="sm"
                  type="email"
                  placeholder="user@email.com"
                  mb="24px"
                  size="lg"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  isRequired
                  color={textColor}
                  display="flex"
                >
                  Password
                </FormLabel>
              </FormControl>
              <InputGroup size="md">
                <Input
                  name="password"
                  value={password}
                  isRequired
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: "0px", md: "4px" }}
                  placeholder="Min. 8 characters"
                  mb="24px"
                  size="lg"
                  type={show ? "text" : "password"}
                  onChange={handleChange}
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
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
                variant="brand"
                fontSize="14px"
                fontWeight="500"
                w="100%"
                h="50"
                mb="24px"
                onClick={signUpEmailPass}
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
                <Text color={textColorDetails} fontWeight="400" fontSize="14px">
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
    );
}
