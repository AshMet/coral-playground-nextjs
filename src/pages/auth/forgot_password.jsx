import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
// import { TbBuildingStore, TbScubaMask } from "react-icons/tb";

import AlertPopup from "components/alerts/AlertPopup";
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

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({ email: "" });
  const { email } = userData;

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const resetPass = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    // Alert & Analytics for failed load
    if (error) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="danger"
            text="Unable to Reset Password"
            subtext={error.message}
          />
        ),
      });
      gtag.event({
        action: "pass-reset-error",
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
            text="Password Reset Successful"
            subtext="Please check your email to complete"
          />
        ),
      });
      // Success Analytics Tag
      gtag.event({
        action: "pass-reset-success",
        category: "button",
        label: "User",
        // value: newItem.title,
      });
    }

    setLoading(false);
    // router.push(`/diving/dive_centres/${data.id}`);
  };

  if (user) {
    router.push("/");
  } else
    return (
      <LoginLayout
        illustrationBackground="/img/diving/4-anemone.jpeg"
        image="/img/diving/4-anemone.jpeg"
      >
        <Flex
          w="100%"
          maxW="max-content"
          mx={{ base: "auto", lg: "0px" }}
          me="auto"
          h="100%"
          alignItems="start"
          justifyContent="center"
          mb={{ base: "30px", md: "60px", lg: "100px", xl: "60px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "40px", lg: "16vh", xl: "22vh" }}
          flexDirection="column"
        >
          <Box me="auto" mb="34px">
            <Heading
              color={textColor}
              fontSize={{ base: "3xl", md: "36px" }}
              mb="16px"
            >
              Forgot your password?
            </Heading>
            <Text
              color={textColorSecondary}
              fontSize="md"
              w={{ base: "100%", lg: "456px" }}
              maxW="100%"
            >
              No problem. Just let us know your email address and we&apos;ll
              email you a password reset link that will allow you to choose a
              new one.
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
              <Button
                variant="brand"
                fontSize="14px"
                fontWeight="500"
                w="100%"
                h="50"
                mb="24px"
                onClick={resetPass}
                disabled={loading}
              >
                Email password reset link
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </LoginLayout>
    );
}
