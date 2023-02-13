/* eslint-disable react/prop-types */
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
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  TbAward,
  TbCalendarEvent,
  TbCreditCard,
  TbCrown,
  TbGlobe,
  TbRun,
} from "react-icons/tb";

import Feature from "components/features/2ColumnIcon";
import InnerContent from "layouts/InnerContent";

export default function Benefits() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  // const textColorSecondary = useColorModeValue("secondaryGray.700", "white");
  // const brandColor = useColorModeValue("brand.500", "white");
  return (
    <Flex
      w="100%"
      maxW="100%"
      direction={{ base: "column" }}
      // pt={{ base: "80px", md: "120px", xl: "140px" }}
      // pb={{ base: "80px", lg: "120px", xl: "140px" }}
      overflow="hidden"
      // bgSize="cover"
      position="relative"
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
            maxW={{ base: "100%", md: "70%", lg: "80%", xl: "70%" }}
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
              WHAT MAKES US BETTER
            </Text>
            <Text
              color={textColor}
              fontWeight="800"
              fontSize={{ base: "28px", md: "48px" }}
              lineHeight={{ base: "38px", md: "58px" }}
              mb={{ base: "14px", lg: "30px" }}
            >
              A Complete End-to-End Diving Experience
            </Text>
          </Flex>
        </Flex>

        <Box my={20}>
          <Stack
            spacing={{
              base: 10,
              md: 0,
            }}
            display={{
              md: "grid",
            }}
            gridTemplateColumns={{
              md: "repeat(2,1fr)",
            }}
            gridColumnGap={{
              md: 8,
            }}
            gridRowGap={{
              md: 10,
            }}
          >
            <Feature
              title="Reserve Your Spot with Ease"
              icon={<Icon as={TbCalendarEvent} size="25px" />}
            >
              Secure your dive trip with a small, fully refundable deposit.
              Booking with us has never been easier!
            </Feature>

            <Feature
              title="Browse and Compare"
              icon={<Icon as={TbGlobe} size="25px" />}
            >
              Browse through a variety of dive sites and dive centers in the Red
              Sea, and compare to find the perfect fit for you.
            </Feature>

            <Feature
              title="Get Certified"
              icon={<Icon as={TbAward} size="25px" />}
            >
              Enhance your diving experience by getting certified through our
              network of trusted dive centers.
            </Feature>

            <Feature
              title="Enjoy Secure Payments"
              icon={<Icon as={TbCreditCard} size="25px" />}
            >
              Make secure, hassle-free payments with confidence. We&apos;ve got
              you covered.
            </Feature>

            <Feature
              title="Streamline Your Experience"
              icon={<Icon as={TbRun} size="25px" />}
            >
              Check-in faster and dive sooner with our automated check-in
              process. Say goodbye to long wait times.
            </Feature>

            <Feature
              title="Access Exclusive Trips"
              icon={<Icon as={TbCrown} size="25px" />}
            >
              Join us for unique and unforgettable diving experiences, only
              available through Coral Playground.
            </Feature>
          </Stack>
        </Box>
      </InnerContent>
    </Flex>
  );
}
