import {
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io5";

const Contact = () => {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.700", "white");
  // const handleClick = () => {
  //   fbq.event("Purchase", { currency: "USD", value: 10 });
  // };

  return (
    <Stack direction={{ base: "column", md: "row" }} mb="50px">
      <Stack direction="column" spacing={10} justifyContent="center">
        <Flex direction="column" width="stretch">
          <Flex
            direction="column"
            mx="auto"
            mb="40px"
            mt="80px"
            maxW={{ base: "100%", md: "100%", lg: "80%", xl: "70%" }}
            textAlign="center"
          >
            <Text
              fontWeight="700"
              letterSpacing="2px"
              bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
              bgClip="text"
              fontSize="sm"
              w="100%"
              mb="10px"
            >
              CONTACT US
            </Text>
            <Heading
              color={textColor}
              fontWeight="800"
              fontSize={{ base: "28px", md: "40px", lg: "48px" }}
              lineHeight={{ base: "38px", md: "50px", lg: "58px" }}
              mb="20px"
            >
              Looking for a Customized Dive Package?
            </Heading>
            <Text color={textColorSecondary} fontSize="xl" w="100%" mb="20px">
              We can always help you book a custom trip. We work with various
              dive centres across the Red Sea and can help you organize the trip
              of your dreams.{" "}
              <Text
                color={textColorSecondary}
                as="span"
                fontWeight="700"
                mb={10}
              >
                Call one of our booking agents today and we will do our best to
                organize your trip <br />
              </Text>
              <Button
                h="50px"
                mt={5}
                bg="linear-gradient(135deg, #00E676 0%, #1EBEA5 100%)"
              >
                <HStack justify="center" color="white">
                  <Icon as={IoLogoWhatsapp} mr={5} w="30px" h="30px" />
                  <Link href="tel:+201032893381">
                    <Text fontSize={30} fontWeight="extrabold" cursor="pointer">
                      +201032893381
                    </Text>
                  </Link>
                </HStack>
              </Button>
            </Text>
          </Flex>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default Contact;
