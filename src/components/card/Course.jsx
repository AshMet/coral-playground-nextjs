/* eslint-disable react/prop-types */
// Chakra imports
import { Box, Flex, Text, useColorModeValue, Button } from "@chakra-ui/react";
// Assets
// import OpenWaterCert from "../../assets/svg/open_water_cert.svg";
// import AdvancedCert from "../../assets/svg/advanced_diver_cert.svg";
// import MasterCert from "../../assets/svg/dive_master_cert.svg";
// Custom components
// import React from "react";

import Image from "components/actions/NextChakraImg";
import Card from "components/card/Card";
// Assets

export default function Course(props) {
  const { imageUrl, title, desc, agency, price, duration, bgBox } = props;
  const textColor = useColorModeValue("navy.700", "white");
  const textBrand = useColorModeValue("brand.500", "white");
  // const bgBadge = useColorModeValue("secondaryGray.300", "whiteAlpha.50");
  return (
    <Card p="20px" h="max-content" minH={{ md: "450px", xl: "auto" }}>
      <Flex direction={{ base: "column", md: "column", xl: "row" }}>
        <Flex direction="column" pr="20px">
          <Box
            bg={bgBox}
            minW={{ base: "100%", xl: "270px" }}
            minH={{ base: "200px", xl: "270px" }}
            borderRadius="20px"
            me="34px"
            width="100%"
            height="100%"
            position="relative"
          >
            <Image src={imageUrl} layout="fill" />
          </Box>
          <Button
            variant="darkBrand"
            color="white"
            fontSize="sm"
            fontWeight="500"
            borderRadius="70px"
            mt="20px"
            // onClick={redirectToCheckout}
            // disabled={isLoading}
          >
            {/* {isLoading ? "Loading..." : "Book Now"} */}
            Book Now
          </Button>
        </Flex>
        <Flex
          justify="space-between"
          flexDirection="column"
          mb="auto"
          pb={{ base: "0px", md: "0px" }}
        >
          <Flex display={{ base: "block", xl: "flex" }}>
            <Box direction="column" w="100%" mb="5px">
              <Text
                color={textColor}
                fontSize={{
                  base: "xl",
                  md: "xl",
                  xl: "xl",
                  "2xl": "28px",
                }}
                mb="10px"
                fontWeight="700"
              >
                {title}
              </Text>
              <Text
                color="secondaryGray.600"
                fontSize={{
                  base: "md",
                }}
                fontWeight="400"
                me="14px"
                mb="10px"
              >
                {desc}
              </Text>
              <Flex justify="space-between" w="100%">
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    {agency}
                  </Text>
                  <Text color={textBrand} fontSize="sm" fontWeight="normal">
                    Agency
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    {duration}
                  </Text>
                  <Text color={textBrand} fontSize="sm" fontWeight="normal">
                    Duration
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    {price}
                  </Text>
                  <Text color={textBrand} fontSize="sm" fontWeight="normal">
                    Price
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
