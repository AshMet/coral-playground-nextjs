/* eslint-disable react/prop-types */
// Chakra imports
import { Icon, Flex, Text, useColorModeValue } from "@chakra-ui/react";
// import React from "react";
// Custom components
import { MdVerified } from "react-icons/md";

import Card from "../../card/Card";

// Assets

export default function Details(props) {
  const { symbol, owner, tokenAddress, tokenId, createdAt } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorLink = useColorModeValue("blue.500", "white");
  // Chakra Color Mode
  return (
    <Card p="30px" mb={{ base: "20px", "2xl": "20px" }}>
      <Text color={textColor} fontSize="2xl" fontWeight="700" mb="20px">
        Description
      </Text>
      <Flex align="center" mb="5px">
        <Text color="secondaryGray.600" fontSize="lg" fontWeight="400">
          Owner
        </Text>
        <Text color={textColorLink} fontSize="lg" fontWeight="500" mx="4px">
          {owner}
        </Text>
        <Icon as={MdVerified} h="16px" w="16px" color="blue.500" mt="3px" />
      </Flex>
      <Flex align="center" mb="5px">
        <Text color="secondaryGray.600" fontSize="lg" fontWeight="400">
          Symbol
        </Text>
        <Text color={textColorLink} fontSize="lg" fontWeight="500" mx="4px">
          {symbol}
        </Text>
      </Flex>
      {/* <Flex align="center" mb="5px">
        <Text color="secondaryGray.600" fontSize="lg" fontWeight="400">
          IPFS Link
        </Text>
        <Text color={textColorLink} fontSize="lg" fontWeight="500" mx="4px">
          {ipfsLink}
        </Text>
      </Flex> */}
      <Flex align="center" mb="5px">
        <Text color="secondaryGray.600" fontSize="lg" fontWeight="400">
          Token Address
        </Text>
        <Text color={textColorLink} fontSize="lg" fontWeight="500" mx="4px">
          {tokenAddress}
        </Text>
      </Flex>
      <Flex align="center" mb="5px">
        <Text color="secondaryGray.600" fontSize="lg" fontWeight="400">
          Token Id
        </Text>
        <Text color={textColorLink} fontSize="lg" fontWeight="500" mx="4px">
          {tokenId}
        </Text>
      </Flex>
      <Flex align="center" mb="20px">
        <Text color="secondaryGray.600" fontSize="lg" fontWeight="400">
          Created On
        </Text>
        <Text color={textColorLink} fontSize="lg" fontWeight="500" mx="4px">
          {createdAt}
        </Text>
      </Flex>
    </Card>
  );
}
