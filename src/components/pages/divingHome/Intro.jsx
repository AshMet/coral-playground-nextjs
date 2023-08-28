import {
  Heading,
  Text,
  Button,
  Flex,
  Stack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
// import { TextLine } from "components/icons/Icons";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

export default function CallToActionWithAnnotation() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.700", "white");
  return (
    <Stack direction={{ base: "column", md: "row" }} mb="100px">
      <Stack direction="column" spacing={10} justifyContent="center" w="100%">
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
              as="h1"
            >
              WELCOME TO CORAL PLAYGROUND
            </Text>
            <Heading
              color={textColor}
              fontWeight="800"
              fontSize={{ base: "38px", md: "60px", lg: "68px" }}
              lineHeight={{ base: "48px", md: "70px", lg: "78px" }}
              mb="20px"
            >
              The Better Way to Book your <br />
              <Text as="span" color="brand.100">
                Red Sea{" "}
                {/* <Icon
                  position="absolute"
                  as={TextLine}
                  bottom={{
                    base: "-20px",
                    md: "-32px",
                    lg: "-30px",
                    xl: "-44px",
                  }}
                  left={{ base: "94%", md: "50%" }}
                  transform={{
                    base: "translate(-100%, 0px)",
                    md: "translate(-50%, 0px)",
                  }}
                  w={{ base: "180px", md: "300px", xl: "400px" }}
                /> */}
              </Text>
              <Text as="span" color={textColor}>
                Diving Adventure
              </Text>
            </Heading>
            {/* <Text color={textColorSecondary} fontSize="xl" w="100%" mb="20px">
            At Coral Playground, 
          </Text> */}
            <Flex
              direction={{ base: "column", md: "row" }}
              spacing={{ base: 5, md: 10 }}
              flexWrap="wrap"
              justifyContent="center"
              align="center"
              mt={10}
            >
              <Link href="/map">
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
              <Link href="/business/home">
                <Button
                  variant="no-hover"
                  border="1px solid"
                  borderColor={textColorSecondary}
                  color={textColor}
                  fontSize="md"
                  borderRadius="12px"
                  bg="transparent"
                  my="auto"
                  // w={{ base: "210px", md: "180px" }}
                  h="54px"
                >
                  Own a Dive Business?
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Stack>
    </Stack>
  );
}
