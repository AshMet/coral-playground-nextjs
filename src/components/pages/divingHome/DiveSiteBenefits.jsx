/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___  
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \ 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/ 
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Box,
  Flex,
  Button,
  Icon,
  Grid,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { MdChevronRight } from "react-icons/md";
import { Parallax } from "react-scroll-parallax";

import Image from "../../actions/NextChakraImg";
import InnerContent from "layouts/InnerContent";

export default function DiveSiteBenefits() {
  // const image = useColorModeValue(imageLight, imageLight);
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.700", "white");
  // const borderColor = useColorModeValue("secondaryGray.100", "white");
  return (
    <Flex
      w="100%"
      direction={{ base: "column" }}
      pt={{ base: "50px", md: "50px", xl: "70px" }}
      pb={{ base: "20px", md: "0px", xl: "70px" }}
      overflow="hidden"
      bgSize="cover"
      position="relative"
    >
      <InnerContent px={{ base: "20px", md: "40px", xl: "0px" }}>
        <Flex direction={{ base: "column", lg: "row" }} width="100%">
          <Flex
            me={{ lg: "50px", xl: "110px" }}
            direction="column"
            width="stretch"
          >
            <Parallax opacity={[0, 1.5, "easeOutQuad"]}>
              <Box my="auto">
                <Text
                  fontWeight="700"
                  letterSpacing="2px"
                  bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
                  bgClip="text"
                  fontSize="sm"
                  textAlign={{ base: "center", lg: "left" }}
                  w="100%"
                  mb="10px"
                >
                  DIVE SITES
                </Text>
                <Text
                  fontWeight="800"
                  color={textColor}
                  fontSize={{ base: "28px", md: "40px" }}
                  lineHeight={{ base: "38px", md: "50px" }}
                  mb="20px"
                  textAlign={{ base: "center", lg: "left" }}
                  maxW={{ base: "100%", md: "unset" }}
                >
                  Explore the Best Dive Sites with Confidence
                </Text>
                <Text
                  textAlign={{ base: "center", lg: "left" }}
                  color={textColorSecondary}
                  fontSize="lg"
                  w={{ base: "100%", md: "100%" }}
                  mb="30px"
                >
                  Get all the Information You Need with Coral Playground!
                  Discover maps, descriptions, conditions and species
                  information to help you select dive sites that align with your
                  interests and expertise.
                </Text>
                <Flex
                  align="center"
                  mb="30px"
                  justifyContent={{ base: "center", lg: "unset" }}
                >
                  {/* <Flex me={{ base: "20px", md: "50px" }} direction="column">
                  <Text
                    color={textColor}
                    fontWeight="800"
                    fontSize={{ base: "30px", md: "38px" }}
                    lineHeight="100%"
                    mb="10px"
                  >
                    100+
                  </Text>
                  <Text
                    color={textColorSecondary}
                    fontWeight="700"
                    fontSize={{ base: "xs", md: "sm" }}
                    letterSpacing="2px"
                  >
                    DIVE SITES
                  </Text>
                </Flex> */}
                </Flex>
                <Flex
                  align="center"
                  justifyContent={{ base: "center", lg: "unset" }}
                  direction={{ base: "column", md: "row" }}
                  mb="30px"
                >
                  <Link href="/diving/dive_sites">
                    <Button
                      py="20px"
                      px="16px"
                      fontSize="sm"
                      variant="brand"
                      borderRadius="12px"
                      me={{ base: "0px", md: "20px" }}
                      mb={{ base: "20px", md: "0px" }}
                      w={{ base: "335px", md: "210px" }}
                      h="54px"
                    >
                      View Dive Sites
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
                      w={{ base: "335px", md: "180px" }}
                      h="54px"
                    >
                      See Live Preview
                    </Button>
                  </Link> */}
                </Flex>
              </Box>
            </Parallax>
            <Grid
              mb="20px"
              gridTemplateColumns={{
                base: "repeat(2, 1fr)",
                "2xl": "720fr 350fr",
              }}
              gap="20px"
              display={{ base: "block", lg: "grid" }}
            >
              <Flex
                gridArea={{
                  base: "1 / 1 / 2 / 3",
                  "2xl": "1 / 1 / 2 / 2",
                }}
              />
              <Flex
                gridArea={{
                  base: "2 / 1 / 3 / 3",
                  "2xl": "1 / 2 / 2 / 3",
                }}
              />
            </Grid>
          </Flex>
          <Parallax speed={-10}>
            <Image
              src="/img/diving/coral_reef_3d.png"
              // w={{ base: "100%", md: "100%", lg: "400px", xl: "565px" }}
              width="1200px"
              height="900px"
              mt={{ base: "40px", md: "40px", lg: "0px" }}
            />
          </Parallax>
        </Flex>
      </InnerContent>
    </Flex>
  );
}
