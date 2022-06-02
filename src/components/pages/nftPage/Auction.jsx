/* eslint-disable react/prop-types */
// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// import React from "react";
// Assets
import { IoMdTrendingUp } from "react-icons/io";
import { MdVerified, MdOutlineMonetizationOn } from "react-icons/md";

import TraitsList from "components/pages/nftPage/TraitsList";

export default function Auction(props) {
  // Chakra Color Mode
  const { name, price, creator, creatorAvatar, metadata, desc } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  // const shadow = useColorModeValue(
  //   " 0px 50px 40px -34px rgba(112, 144, 176, 0.16)",
  //   "unset"
  // );
  // const borderColor = useColorModeValue("secondaryGray.400", "transparent");
  // const cardBg = useColorModeValue("white", "navy.800");
  return (
    <Flex
      direction="column"
      ps={{ base: "unset", lg: "'65px'" }}
      mx="auto"
      maxW={{ base: "100%", md: "max-content" }}
    >
      <Text
        color={textColor}
        fontSize={{ base: "36px", "2xl": "54px" }}
        fontWeight="700"
        mb="-30px"
        lineHeight="100%"
      >
        {name}
      </Text>
      <Flex>
        <Flex
          mt="55px"
          mb="36px"
          me="auto"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            h={{ base: "40px", md: "60px" }}
            w={{ base: "40px", md: "60px" }}
            src={creatorAvatar}
            me="20px"
          />
          <Box>
            <Text color="secondaryGray.600" fontSize="md" fontWeight="500">
              Creator
            </Text>
            <Flex align="center">
              <Text color={textColor} fontSize="lg" fontWeight="700" me="5px">
                {creator}
              </Text>
              <Icon
                as={MdVerified}
                h="16px"
                w="16px"
                color="blue.500"
                mt="2px"
              />
            </Flex>
          </Box>
        </Flex>
        <Flex mt="75px" mb="56px" justifyContent="center" alignItems="center">
          <Flex
            h={{ base: "40px", md: "60px" }}
            w={{ base: "40px", md: "60px" }}
            bg="green.500"
            me="20px"
            borderRadius="50px"
            justify="center"
            align="center"
          >
            <Icon
              as={MdOutlineMonetizationOn}
              h={{ base: "25px", md: "38px" }}
              w={{ base: "25px", md: "38px" }}
              color="white"
            />
          </Flex>
          <Box>
            <Text color="secondaryGray.600" fontSize="md" fontWeight="500">
              Instant price
            </Text>
            <Flex align="center">
              <Text color={textColor} fontSize="lg" me="6px" fontWeight="700">
                {price}
              </Text>
              <Icon as={IoMdTrendingUp} h="20px" w="20px" color="green.500" />
            </Flex>
          </Box>
        </Flex>
      </Flex>
      <TraitsList metadata={metadata} description={desc} />
      <Button variant="brand" fontSize="sm" fontWeight="500" h="46px">
        Place a bid
      </Button>
    </Flex>
  );
}
