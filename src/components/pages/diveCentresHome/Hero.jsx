import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

import InnerContent from "../../../layouts/InnerContent";

const Hero = () => {
  // Chakra Color Mode
  const textColor = useColorModeValue("white", "white");
  // const textColorSecondary = useColorModeValue("secondaryGray.700", "white");

  return (
    <Center pos="relative" w="100%" h="100vh">
      <video
        autoPlay
        loop
        muted
        // playbackRate={0.5}
        style={{
          position: "absolute",
          zIndex: "-1",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="/img/diving/HeroVideo.mp4" type="video/mp4" />
      </video>
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        backgroundColor="rgba(0, 0, 0, 0.3)"
      >
        <Flex
          // bg={`url(${backgroundHorizonFree})`}
          w="100%"
          direction="column"
          pt={{
            base: "130px",
            md: "140px",
            xl: "190px",
            "2xl": "210px",
            "3xl": "200px",
          }}
          pb={{ base: "0px", lg: "80px", xl: "170px" }}
          bgRepeat="no-repeat"
          position="relative"
        >
          <InnerContent
            w="1170px"
            maxW="100%"
            px={{ base: "20px", md: "40px", xl: "0px" }}
            zIndex="2"
          >
            <Flex
              maxW="100%"
              direction="column"
              width="stretch"
              justify="center"
              align="center"
            >
              <Flex
                direction="column"
                align="center"
                maxW="100%"
                textAlign="center"
                mt={{ sm: "200px", lg: "80px" }}
              >
                <Heading
                  color={textColor}
                  fontWeight="800"
                  fontSize={{ base: "28px", md: "40px", lg: "48px" }}
                  lineHeight={{ base: "38px", md: "50px", lg: "58px" }}
                  mb="20px"
                >
                  Manage & Grow Your <br />
                  <Text as="span" color="brand.100">
                    Dive Business{" "}
                  </Text>
                  <Text as="span" color={textColor}>
                    Like Never Before
                  </Text>
                </Heading>
                {/* <Text
                  color={textColor}
                  fontSize="lg"
                  lineHeight="32px"
                  w={{ base: "100%", lg: "65%", xl: "60%" }}
                  mb="40px"
                >
                  Your gateway to the largest collection of dives in Egypt by a
                  network of the highest quality dive centres, guides and
                  instructors.
                </Text> */}
                <Flex
                  align="center"
                  direction={{ base: "column", md: "row" }}
                  mb="30px"
                >
                  <Link href="/business/signup">
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
                      Join Now
                      <Icon
                        as={MdChevronRight}
                        ms="5px"
                        mt="2px"
                        h="16px"
                        w="16px"
                      />
                    </Button>
                  </Link>
                  {/* <Link href="/">
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
                      See live preview
                    </Button>
                  </Link> */}
                </Flex>
              </Flex>
            </Flex>
          </InnerContent>
        </Flex>
      </Box>
    </Center>
  );
};

export default Hero;
