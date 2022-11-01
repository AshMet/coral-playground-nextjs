import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

import InnerContent from "../../../layouts/InnerContent";

// import heroVideo from "../../../../public/img/diving/HeroVideo.mp4";

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
                <Text
                  color={textColor}
                  fontSize={{ base: "54px", md: "48px", xl: "54px" }}
                  lineHeight={{ base: "64px", md: "58px", xl: "64px" }}
                  mb="30px"
                  fontWeight="600"
                >
                  Explore the Ocean
                  <br />
                  <Text as="span" fontWeight="800">
                    Like{" "}
                    <Text color="brand.100" as="span" fontWeight="800">
                      Never Before
                    </Text>
                  </Text>
                </Text>
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
