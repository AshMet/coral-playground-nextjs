/* eslint-disable react/prop-types */
// Chakra imports
import {
  Flex,
  Text,
  Icon,
  // Link,
  useColorModeValue,
  Spacer,
  Badge,
} from "@chakra-ui/react";
// Custom components
// import React from "react";
import { AiOutlineDollar } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoLanguage } from "react-icons/io5";

import Image from "components/actions/NextChakraImg";
import Card from "components/card/Card";
// import { CircProgressMini } from "components/charts/CircularProgress";
// Assets
// import diploma from "assets/img/account/Diploma.png";

export default function DiveCentreSidebar({
  address,
  paymentMethods,
  languages,
  memberships,
  ...rest
}) {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorTertiary = useColorModeValue("secondaryGray.600", "white");
  const bg = useColorModeValue("secondaryGray.300", "navy.700");
  return (
    <Card {...rest} maxH="max-content">
      <Text color={textColor} fontSize="xl" fontWeight="700" mb="16px">
        Centre Information
      </Text>
      <Card bg={bg} p="18px" height="200px" maxW={{ base: "400px" }} mb="20px">
        <Image
          src="/img/account/StaticMap.png"
          layout="fill"
          borderRadius="14px"
        />
      </Card>
      <Flex mb="15px" align="center" cursor="pointer">
        <Icon
          as={HiOutlineLocationMarker}
          ms="auto"
          h="22px"
          w="22px"
          mr="10px"
          color={textColorTertiary}
        />
        <Text color={textColorTertiary} fontWeight="500" fontSize="md" me="5px">
          Address
        </Text>
        <Spacer />
      </Flex>
      <Flex wrap="wrap" gap={3} mb="25px">
        {address}
      </Flex>
      <Flex mb="15px" align="center" cursor="pointer">
        <Icon
          as={AiOutlineDollar}
          ms="auto"
          h="22px"
          w="22px"
          mr="10px"
          color={textColorTertiary}
        />
        <Text color={textColorTertiary} fontWeight="500" fontSize="md" me="5px">
          Memberships
        </Text>
        <Spacer />
      </Flex>
      <Flex wrap="wrap" gap={3} mb="25px">
        {memberships?.map((membership) => (
          <Badge
            colorScheme="teal"
            borderRadius="15px"
            display="flex"
            px={4}
            py={2}
            justifyContent="center"
          >
            {membership}
          </Badge>
        ))}
      </Flex>

      <Flex mb="15px" align="center" cursor="pointer">
        <Icon
          as={AiOutlineDollar}
          ms="auto"
          h="22px"
          w="22px"
          mr="10px"
          color={textColorTertiary}
        />
        <Text color={textColorTertiary} fontWeight="500" fontSize="md" me="5px">
          Payment Methods
        </Text>
        <Spacer />
      </Flex>
      <Flex wrap="wrap" gap={3} mb="25px">
        {paymentMethods?.map((method) => (
          <Badge
            colorScheme="teal"
            borderRadius="15px"
            display="flex"
            px={4}
            py={2}
            justifyContent="center"
          >
            {method}
          </Badge>
        ))}
      </Flex>
      <Flex mb="15px" align="center" cursor="pointer">
        <Icon
          as={IoLanguage}
          ms="auto"
          h="22px"
          w="22px"
          mr="10px"
          color={textColorTertiary}
        />
        <Text color={textColorTertiary} fontWeight="500" fontSize="md" me="5px">
          Languages
        </Text>
        <Spacer />
      </Flex>
      <Flex wrap="wrap" gap={3} mb="25px">
        {languages?.map((language) => (
          <Badge
            colorScheme="teal"
            borderRadius="15px"
            display="flex"
            px={4}
            py={2}
            justifyContent="center"
          >
            {language}
          </Badge>
        ))}
      </Flex>
    </Card>
  );
}
