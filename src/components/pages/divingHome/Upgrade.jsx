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
  Button,
  Icon,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
// import bgUpgrade from "assets/img/free/bg-upgrade-pro-free.png";
// import dashboard from "assets/img/free/image-upgrade-pro-free.png";
// import shadowUpgrade from "assets/img/free/shadow-upgrade-pro-free.png";
// Custom components
import { MdChevronRight } from "react-icons/md";

import Image from "../../actions/NextChakraImg";
import InnerContent from "layouts/InnerContent";

export default function Upgrade() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.700", "white");
  // const borderColor = useColorModeValue("secondaryGray.100", "white");
  return (
    <Flex
      w="100%"
      h="800px"
      overflow="hidden"
      maxW="100%"
      direction={{ base: "column" }}
      pt={{ base: "80px", md: "120px", xl: "140px" }}
      // bg={`url(${bgUpgrade})`}
      bgRepeat="no-repeat"
      position="relative"
    >
      <InnerContent>
        <Flex
          maxW="100%"
          direction="column"
          zIndex="1"
          width="stretch"
          mb="68px"
        >
          <Flex
            direction="column"
            mx="auto"
            mb="40px"
            px={{ base: "0px", md: "40px", xl: "0px" }}
            maxW={{ base: "100%", lg: "70%", "2xl": "85%" }}
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
              UPGRADE TO HORIZON UI PRO
            </Text>
            <Text
              color={textColor}
              fontWeight="800"
              fontSize={{ base: "28px", md: "48px" }}
              lineHeight={{ base: "38px", md: "58px" }}
              px={{ base: "20px", md: "0px" }}
              mb={{ base: "14px", lg: "30px" }}
            >
              Improve your development process and start doing more with Horizon
              UI PRO
            </Text>
            <Text
              mb="30px"
              color={textColorSecondary}
              alignSelf="center"
              fontSize="lg"
              px={{ base: "20px", md: "0px" }}
              w={{ base: "100%", md: "80%" }}
            >
              Save hundreds of hours trying to create and develop a dashboard
              from scratch. The fastest, most responsive & trendiest admin
              template is here. Seriously.
            </Text>{" "}
            <Flex align="center" justify="center" mb="30px">
              <Flex me={{ base: "20px", md: "50px" }} direction="column">
                <Text
                  color={textColor}
                  fontWeight="800"
                  mb="10px"
                  fontSize={{ base: "30px", md: "38px" }}
                  lineHeight="100%"
                >
                  400+
                </Text>
                <Text
                  color={textColorSecondary}
                  fontWeight="700"
                  fontSize={{ base: "xs", md: "sm" }}
                  letterSpacing="2px"
                >
                  COMPONENTS
                </Text>
              </Flex>
              <Flex me="50px" direction="column">
                <Text
                  color={textColor}
                  fontWeight="800"
                  mb="10px"
                  fontSize={{ base: "30px", md: "38px" }}
                  lineHeight="100%"
                >
                  40+
                </Text>
                <Text
                  color={textColorSecondary}
                  fontWeight="700"
                  fontSize={{ base: "xs", md: "sm" }}
                  letterSpacing="2px"
                >
                  EXAMPLES
                </Text>
              </Flex>
              <Flex direction="column">
                <Text
                  color={textColor}
                  fontWeight="800"
                  mb="10px"
                  fontSize={{ base: "30px", md: "38px" }}
                  lineHeight="100%"
                >
                  10+
                </Text>
                <Text
                  color={textColorSecondary}
                  fontWeight="700"
                  fontSize={{ base: "xs", md: "sm" }}
                  letterSpacing="2px"
                >
                  CATEGORIES
                </Text>
              </Flex>
            </Flex>
            <Flex mx="auto" align="center" justifyItems="center">
              <Link href="https://horizon-ui.com/pro">
                <Button
                  py="20px"
                  px="16px"
                  fontSize="sm"
                  variant="brand"
                  borderRadius="12px"
                  me="20px"
                  w="160px"
                  h="54px"
                >
                  Upgrade to PRO
                  <Icon as={MdChevronRight} color="white" h="16px" w="16px" />
                </Button>
              </Link>
              <Link href="https://horizon-ui.com/chakra-pro/">
                <Button
                  variant="no-hover"
                  border="1px solid"
                  borderColor={textColorSecondary}
                  color={textColor}
                  fontSize="md"
                  borderRadius="12px"
                  bg="transparent"
                  my="auto"
                  w="140px"
                  h="54px"
                >
                  Live preview
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Flex>
        <Flex mb={{ base: "-40px", md: "-130px" }}>
          <Box mt="auto" position="relative">
            <Flex zIndex="0" position="relative" w="100%" top="150px">
              <Box
                filter="blur(195.487px)"
                borderRadius="100%"
                left="0px"
                top="300px"
                position="absolute"
                transform="matrix(0.96, 0.13, -0.28, 0.99, 0, 0)"
                w="512px"
                h="365px"
                opacity="0.9"
                bg="#4318FF"
              />
              <Box
                filter="blur(195.487px)"
                borderRadius="100%"
                left="50px"
                top="20px"
                position="absolute"
                transform="matrix(0.96, 0.13, -0.28, 0.99, 0, 0)"
                w="512px"
                h="365px"
                opacity="0.8"
                bg="#FF18F6"
              />
              <Box
                filter="blur(195.487px)"
                borderRadius="100%"
                right="180px"
                top="0px"
                position="absolute"
                transform="matrix(0.96, 0.13, -0.28, 0.99, 0, 0)"
                w="512px"
                h="365px"
                opacity="0.8"
                bg="#00E0FF"
              />
              <Box
                filter="blur(195.487px)"
                borderRadius="100%"
                right="200px"
                top="40px"
                position="absolute"
                transform="matrix(0.96, -0.13, -0.28, -0.99, 0, 0)"
                w="582px"
                h="410px"
                opacity="0.9"
                bg="#4318FF"
              />
              <Box
                filter="blur(195.487px)"
                borderRadius="100%"
                right="320px"
                top="500px"
                position="absolute"
                transform="matrix(0.96, 0.13, -0.28, 0.99, 0, 0)"
                w="512px"
                h="365px"
                opacity="0.8"
                bg="#FFA26E"
              />
              <Box
                filter="blur(195.487px)"
                borderRadius="100%"
                right="260px"
                top="350px"
                position="absolute"
                transform="matrix(0.96, -0.13, -0.28, -0.99, 0, 0)"
                w="512px"
                h="365px"
                opacity="0.8"
                bg="#FF18F6"
              />
            </Flex>
            <Image
              src="/img/diving/4-anemone.jpeg"
              width="1000px"
              height="1000px"
              layout="fill"
              maxH="max-content"
              position="relative"
            />
          </Box>
        </Flex>
      </InnerContent>
    </Flex>
  );
}
