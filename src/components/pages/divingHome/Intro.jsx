import {
  Button,
  Flex,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

const Intro = () => {
  // Chakra Color Mode
  const textColor = useColorModeValue("white", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.700", "white");
  // const handleClick = () => {
  //   fbq.event("Purchase", { currency: "USD", value: 10 });
  // };

  return (
    <Stack direction={{ base: "column", md: "row" }}>
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
              OUR MISSION
            </Text>
            <Text
              color={textColor}
              fontWeight="800"
              fontSize={{ base: "28px", md: "40px", lg: "48px" }}
              lineHeight={{ base: "38px", md: "50px", lg: "58px" }}
              mb="20px"
            >
              A Better Diving Experience
            </Text>
            <Text color={textColor} fontSize="xl" w="100%" mb="20px">
              Coral Playground is your gateway to the largest collection of
              dives in Egypt, operated by a network of the highest quality dive
              centres, guides and instructors.{" "}
              <Text
                color={textColorSecondary}
                as="span"
                fontWeight="700"
                mb={10}
              >
                Our goal is to make sure you can book the best dive vacation of
                your life as quickly and easily as possible with complete peace
                of mind. <br />
              </Text>
              <Text color={textColorSecondary} mt={5} fontSize="xl">
                No matter your experience level, we have a dive trip that will
                meet your needs.
              </Text>
              <Flex
                direction={{ base: "column", md: "row" }}
                spacing={{ base: 5, md: 10 }}
                flexWrap="wrap"
                justifyContent="center"
                mt={10}
              >
                <Link href="/diving/map">
                  <Button
                    py="20px"
                    px="16px"
                    fontSize="sm"
                    variant="brand"
                    borderRadius="12px"
                    me={{ base: "0px", md: "20px" }}
                    mb={{ base: "20px", md: "0px" }}
                    w="210px"
                    h="54px"
                    // onClick={handleClick}
                  >
                    Start Exploring
                    <Icon
                      as={MdChevronRight}
                      ms="5px"
                      mt="2px"
                      h="16px"
                      w="16px"
                    />
                  </Button>
                </Link>
                <Link href="/dive_centres/home">
                  <Button
                    variant="no-hover"
                    border="1px solid"
                    borderColor={textColorSecondary}
                    color={textColor}
                    fontSize="md"
                    borderRadius="12px"
                    bg="transparent"
                    my="auto"
                    w={{ base: "210px", md: "180px" }}
                    h="54px"
                  >
                    Partner with Us
                  </Button>
                </Link>
              </Flex>
            </Text>
          </Flex>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default Intro;
