/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
// Chakra imports
import {
  Box,
  chakra,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import { PiClockAfternoon, PiCertificate } from "react-icons/pi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

import Image from "../actions/NextChakraImg";

import Card from "./Card";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});
// Assets

export default function DiveTripCard(props) {
  const { diveTrip, coverPhoto, ...rest } = props;
  const { name, duration, deposit, price, divingCert, diveCentreName } =
    diveTrip;
  const textColor = useColorModeValue("navy.700", "white");

  return (
    <ChakraBox
      layout
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <Card
        p="10px"
        boxShadow="0 5px 10px rgb(0 0 0 / 5%)"
        _hover={{
          boxShadow: "0.1em 0.1em 3em rgba(0,0,0,0.3)",
          transform: "scale(1.01)",
        }}
        as="a"
        {...rest}
      >
        <Flex direction={{ base: "column" }} justify="center">
          <Box position="relative" cursor="pointer">
            <Image
              src={coverPhoto}
              width="300"
              height="200"
              borderRadius="20px"
            />
          </Box>
          <Flex
            flexDirection="column"
            justify="space-between"
            h="100%"
            pl="10px"
          >
            <Flex
              justify="space-between"
              direction={{
                base: "row",
                md: "column",
                lg: "row",
                xl: "column",
                "2xl": "row",
              }}
            >
              <Flex direction="column">
                {name && (
                  <Text
                    color={textColor}
                    fontSize={{
                      base: "xl",
                      md: "lg",
                      lg: "lg",
                      xl: "lg",
                      "2xl": "md",
                      "3xl": "lg",
                    }}
                    mb="5px"
                    fontWeight="bold"
                    me="14px"
                  >
                    {name}
                  </Text>
                )}
                {diveCentreName && (
                  <Text
                    color="secondaryGray.600"
                    fontSize={{
                      base: "sm",
                    }}
                    fontWeight="400"
                    me="14px"
                    mb="10px"
                  >
                    {diveCentreName}
                  </Text>
                )}
                <Box>
                  <SimpleGrid columns={3} spacing="10px">
                    {duration && (
                      <VStack>
                        <Icon
                          me="8px"
                          as={PiClockAfternoon}
                          w="16px"
                          h="16px"
                        />
                        <Text>{duration} hours</Text>
                      </VStack>
                    )}
                    {divingCert && (
                      <VStack>
                        <Icon me="8px" as={PiCertificate} w="16px" h="16px" />
                        <Text>{divingCert}</Text>
                      </VStack>
                    )}
                    {deposit && price && (
                      <VStack>
                        <Icon
                          me="8px"
                          as={RiMoneyDollarCircleLine}
                          w="16px"
                          h="16px"
                        />
                        <Text>${price / 100}</Text>
                        <Text>(${deposit / 100} Now)</Text>
                      </VStack>
                    )}
                  </SimpleGrid>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </ChakraBox>
  );
}
