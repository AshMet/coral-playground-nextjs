import { Box, Flex, useColorModeValue, Text } from "@chakra-ui/react";
// import { useRouter } from "next/router";

import LandingLayout from "../../layouts/home/Landing";
import ContactForm from "components/contact/ContactForm";

export default function ContactUs() {
  // const router = useRouter();

  return (
    <Flex
      // bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={{ sm: "5", md: "10", lg: "20" }}
      w="auto"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        py={12}
        // bg={useColorModeValue("white", "gray.800")}
        rounded="xl"
      >
        <Box maxW="7xl" mx="auto" px={{ base: 4, lg: 8 }}>
          <Box textAlign={{ lg: "center" }}>
            <Text
              color={useColorModeValue("brand.600")}
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Contact Us
            </Text>
            <Text
              mt={2}
              mb={10}
              fontSize={{ base: "3xl", sm: "4xl" }}
              lineHeight="8"
              fontWeight="extrabold"
              letterSpacing="tight"
              color={useColorModeValue("gray.900")}
            >
              Ask us Anything
            </Text>
          </Box>
          <ContactForm />
        </Box>
      </Box>
    </Flex>
  );
}

ContactUs.getLayout = function getLayout(page) {
  return <LandingLayout>{page}</LandingLayout>;
};
