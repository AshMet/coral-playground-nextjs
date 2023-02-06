import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Stack,
  Text,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

// import InnerContent from "../../../layouts/InnerContent";

// import heroVideo from "../../../../public/img/diving/HeroVideo.mp4";

const Hero = () => {
  // Chakra Color Mode
  const textColor = useColorModeValue("white", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.700", "white");

  return (
    <Flex
      id="MgHero"
      direction={{ sm: "column", md: "row" }}
      w="full"
      px={{ base: 6, md: "100px" }}
      py={14}
      h="100vh"
      bgImage="url(/img/diving/Hero.jpg)"
      bgRepeat="no-repeat"
      backgroundSize="cover"
      bgPosition={{ sm: "top", lg: "initial" }}
    >
      <Box w={{ sm: "100%", md: "70%" }} mt={{ sm: "150px", lg: "200px" }}>
        <Stack direction={{ base: "column", md: "row" }}>
          <Stack direction="column" spacing={10} justifyContent="center">
            <Text
              as="h1"
              fontSize={{ sm: "5xl", lg: "7xl" }}
              color="white"
              lineHeight={1}
              fontWeight="bold"
              textAlign="left"
            >
              Book Your Next
              <chakra.span
                bgGradient="linear(to-br, brand.100, red.400)"
                bgClip="text"
              >
                {" "}
                Red Sea{" "}
              </chakra.span>{" "}
              <br />
              Diving Adventure
            </Text>
            <Text
              color={textColor}
              fontSize="lg"
              textAlign="left"
              fontWeight="700"
              maxW="700px"
            >
              Book your next Red Sea diving adventure with ease on Coral
              Playground, the premier dive trip booking platform. No matter your
              experience level, we have a dive trip that will meet your needs.
            </Text>
            <Flex
              direction={{ base: "column", md: "row" }}
              spacing={{ base: 5, md: 10 }}
              flexWrap="wrap"
            >
              {/* <Flex
                  align="center"
                  direction={{ base: "column", md: "row" }}
                  mb="30px"
                > */}
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
            {/* </Flex> */}
            {/* <Stack
                direction={{ base: 'column', sm: 'row' }}
                spacing={{ base: 0, sm: 2 }}
                flexWrap="wrap"
              >
                <chakra.button
                  h={12}
                  px={6}
                  bgGradient="linear(to-br, #228be6, #15aabf)"
                  color="white"
                  _hover={{ bgGradient: 'linear(to-br, #228be6, #228be6)' }}
                  variant="solid"
                  size="lg"
                  rounded="md"
                  fontWeight="bold"
                  mb={{ base: 2, sm: 0 }}
                >
                  <chakra.span> Get started </chakra.span>
                </chakra.button>
                <Flex
                  border="1px solid"
                  borderColor="gray.700"
                  justify="center"
                  p={3}
                  px={4}
                  lineHeight={1.18}
                  rounded="md"
                  boxShadow="md"
                  fontWeight="bold"
                  alignItems="center"
                  as={Link}
                >
                  <Icon as={FaGithub} h={4} w={4} />
                  <chakra.span ml={1}> Github</chakra.span>
                </Flex>
              </Stack> */}
          </Stack>
        </Stack>
      </Box>
      <Center w={{ sm: "100%", md: "30%" }}>
        {/* <Image
          alt="Hero Image"
          fit="cover"
          align="center"
          width="450"
          height="350"
          src="/home/products/custom-mouthguard.png"
          ml="20px"
        /> */}
      </Center>
    </Flex>
  );
};

export default Hero;
