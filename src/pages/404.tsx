import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  useColorMode,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import MotionBox from "lib/components/motion/Box";

const Page404 = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();

  return (
    <Flex minHeight="70vh" direction="column" justifyContent="center">
      <MotionBox
        animate={{ y: 20 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        width={["100%", "70%", "60%", "60%"]}
        margin="0 auto"
      >
        <Image src="/404-error.png" alt="Error 404 not found Illustration" />
      </MotionBox>

      <Box marginY={4}>
        <Heading textAlign="center">Page not Found.</Heading>

        <Box textAlign="center" marginTop={4}>
          <Text>It&apos;s Okay!</Text>
          <Button
            backgroundColor={colorMode === "light" ? "gray.300" : "teal.500"}
            onClick={() => router.back()}
          >
            Let&apos;s Head Back
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Page404;
