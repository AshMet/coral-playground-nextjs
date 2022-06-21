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
import { FaRegAddressCard } from "react-icons/fa";
import { IoBoatOutline } from "react-icons/io5";
import { VscSymbolRuler } from "react-icons/vsc";

import Image from "components/actions/NextChakraImg";
import Card from "components/card/Card";
// import { CircProgressMini } from "components/charts/CircularProgress";
// Assets
// import diploma from "assets/img/account/Diploma.png";

export default function CourseInfo({
  depth,
  access,
  certLevel,
  diveTypes,
  ...rest
}) {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorTertiary = useColorModeValue("secondaryGray.600", "white");
  const bg = useColorModeValue("secondaryGray.300", "navy.700");
  return (
    <Card {...rest} maxH="max-content">
      <Text color={textColor} fontSize="xl" fontWeight="700" mb="16px">
        Dive Information
      </Text>
      <Card bg={bg} p="18px" height="200px" maxW={{ base: "400px" }} mb="20px">
        <Image
          src="/img/account/StaticMap.png"
          layout="fill"
          borderRadius="14px"
        />
      </Card>
      <Flex mb="25px" align="center" cursor="pointer">
        <Icon
          as={VscSymbolRuler}
          ms="auto"
          h="22px"
          w="22px"
          mr="10px"
          color={textColorTertiary}
        />
        <Text color={textColorTertiary} fontWeight="500" fontSize="md" me="5px">
          Depth
        </Text>
        <Spacer />
        <Text color="green.400" fontSize="xs">
          <Text as="span" fontSize="lg" fontWeight="bold">
            {`${depth}m`}
          </Text>{" "}
          Max
        </Text>
      </Flex>
      <Flex mb="25px" align="center" cursor="pointer">
        <Icon
          as={IoBoatOutline}
          ms="auto"
          h="22px"
          w="22px"
          mr="10px"
          color={textColorTertiary}
        />
        <Text color={textColorTertiary} fontWeight="500" fontSize="md" me="5px">
          Access
        </Text>
        <Spacer />
        <Text fontWeight="bold" color="green.400" fontSize="lg">
          {access}
        </Text>
      </Flex>
      <Flex mb="25px" align="center" cursor="pointer">
        <Icon
          as={FaRegAddressCard}
          ms="auto"
          h="22px"
          w="22px"
          mr="10px"
          color={textColorTertiary}
        />
        <Text color={textColorTertiary} fontWeight="500" fontSize="md" me="5px">
          Certification Level
        </Text>
        <Spacer />
        <Text fontWeight="bold" color="green.400" fontSize="lg">
          {certLevel?.map((level, index) => (index ? ", " : "") + level)}
        </Text>
      </Flex>
      <Flex mb="15px" align="center" cursor="pointer">
        <Icon
          as={FaRegAddressCard}
          ms="auto"
          h="22px"
          w="22px"
          mr="10px"
          color={textColorTertiary}
        />
        <Text color={textColorTertiary} fontWeight="500" fontSize="md" me="5px">
          Diving Types
        </Text>
        <Spacer />
      </Flex>
      <Flex wrap="wrap" gap={3} mb="25px">
        {diveTypes?.map((type) => (
          <Badge
            colorScheme="teal"
            borderRadius="15px"
            display="flex"
            px={4}
            py={2}
            justifyContent="center"
          >
            {type}
          </Badge>
        ))}
      </Flex>
    </Card>
  );
}
