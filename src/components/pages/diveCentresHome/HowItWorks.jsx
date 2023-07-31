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
import { Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";

// import Image from "next/image";
// Assets
// import Javascript from "assets/img/free/started/Javascript.png";
// import NextJS from "assets/img/free/started/NextJS.png";
// import Typescript from "assets/img/free/started/Typescript.png";
// Custom components

import Steps from "components/pages/diveCentresHome/Steps";
import InnerContent from "layouts/InnerContent";

export default function Tools() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Flex
      w="100%"
      maxW="100%"
      direction={{ base: "column" }}
      pt={{ base: "100px", md: "140px", xl: "100px" }}
      pb={{ base: "60px", md: "120px" }}
      overflow="hidden"
      bgSize="cover"
      position="relative"
      id="version"
    >
      <InnerContent>
        <Flex
          maxW="100%"
          direction="column"
          width="stretch"
          px={{ base: "20px", md: "20px", xl: "0px" }}
        >
          <Flex
            direction="column"
            mx="auto"
            mb="40px"
            maxW={{ base: "100%", lg: "100%", xl: "70%" }}
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
              HOW IT WORKS
            </Text>
            <Heading
              color={textColor}
              fontWeight="800"
              fontSize={{ base: "28px", md: "40px", lg: "46px" }}
              lineHeight={{ base: "38px", md: "50px", lg: "52px" }}
              mb={{ base: "14px", lg: "30px" }}
            >
              Increase your Dive Bookings in 3 Easy Steps
            </Heading>
            <Text
              textAlign="center"
              color="secondaryGray.600"
              fontSize="md"
              fontWeight="400"
            >
              At Coral Playground, we make booking a dive trip a breeze for both
              you and your customers. Customers can secure their spot with a
              deposit on their selected dives, and the rest is payable directly
              to you upon their arrival. This process also provides you with all
              the necessary information, including diver details, safety
              information, and any additional equipment needs, so you can
              prepare for the trip with ease.
            </Text>
          </Flex>
        </Flex>
        <Steps
          me="20px"
          gridArea={{ base: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        />
      </InnerContent>
    </Flex>
  );
}
