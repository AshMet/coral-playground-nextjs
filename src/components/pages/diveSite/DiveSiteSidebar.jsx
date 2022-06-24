/* eslint-disable react/prop-types */
// Chakra imports
import {
  Flex,
  Text,
  Icon,
  // Link,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react";
// Custom components
// import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";

import Image from "components/actions/NextChakraImg";
import Card from "components/card/Card";
// import { CircProgressMini } from "components/charts/CircularProgress";
// Assets
// import diploma from "assets/img/account/Diploma.png";

export default function CourseInfo({
  depth,
  visibility,
  current,
  access,
  certLevel,
  diveTypes,
  city,
  country,
  ...rest
}) {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorTertiary = useColorModeValue("secondaryGray.600", "white");
  const bg = useColorModeValue("secondaryGray.300", "navy.700");
  return (
    <Card {...rest} maxH="max-content">
      <Text color={textColor} fontSize="xl" fontWeight="700" mb="16px">
        Upcoming Dive Trips
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
        {`${city}, ${country}`}
      </Flex>
    </Card>
  );
}
