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
  Link,
  Button,
  Icon,
  Grid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// import Image from "next/image";
// Assets
// import imageLight from "assets/img/free/openSource/section4-light.png";
// Custom components
import { MdChevronRight } from "react-icons/md";

import Image from "../../actions/NextChakraImg";
import InnerContent from "layouts/InnerContent";

export default function DiveCentreBenefits() {
  // const image = useColorModeValue(imageLight, imageLight);
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.700", "white");
  // const borderColor = useColorModeValue("secondaryGray.100", "white");
  return (
    <Flex
      w="100%"
      direction={{ base: "column" }}
      pt={{ base: "80px", md: "140px", xl: "50px" }}
      pb={{ base: "100px", md: "140px", xl: "100px" }}
      overflow="hidden"
      bgSize="cover"
      position="relative"
    >
      <InnerContent px={{ base: "20px", md: "40px", xl: "0px" }}>
        <Flex direction={{ base: "column-reverse", lg: "row" }} width="100%">
          <Box mb="0" mr="50px">
            <Image
              // me="110px"
              src="/img/diving/dive_centre_isometric.png"
              // w={{ base: "90%", md: "100%", lg: "400px", xl: "565px" }}
              width="800px"
              height="600px"
              // mt={{ base: "40px", md: "40px", lg: "0px" }}
            />
          </Box>
          <Flex direction="column" width="stretch">
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
                DIVE CENTRES
              </Text>
              <Text
                fontWeight="800"
                color={textColor}
                fontSize={{ base: "28px", md: "48px" }}
                lineHeight={{ base: "38px", md: "58px" }}
                mb="20px"
                px={{ base: "30px", md: "unset" }}
                textAlign={{ base: "center", lg: "left" }}
                maxW={{ base: "100%", md: "unset" }}
              >
                Find the Right Dive Centre for You
              </Text>
              <Text
                color={textColorSecondary}
                textAlign={{ base: "center", lg: "left" }}
                fontSize="lg"
                w={{ base: "100%", md: "100%" }}
                mb="30px"
              >
                Stop trying to figure out which dive centre meets your needs or
                feeling tied to your hotel dive shop. Whether you&apos;re
                interested in comparing prices, looking for someone who speaks
                your language or seeking additional services, we have you
                covered. Additionally, all our partners are guaranteed to follow
                the highest standards in safety and environmental practices.
              </Text>
              <Flex
                align="center"
                direction={{ base: "column", md: "row" }}
                mb="30px"
                justifyContent={{ base: "center", lg: "unset" }}
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
                    Get started for Free
                    <Icon
                      as={MdChevronRight}
                      ms="5px"
                      mt="2px"
                      h="16px"
                      w="16px"
                    />
                  </Button>
                </Link>
                <Link href="/">
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
                    See Figma version
                  </Button>
                </Link>
              </Flex>
            </Box>
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
        </Flex>
      </InnerContent>
    </Flex>
  );
}
