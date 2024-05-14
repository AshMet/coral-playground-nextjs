/* eslint-disable react/prop-types */
// Chakra imports
import { Flex, Icon, Text, useColorModeValue, Badge } from "@chakra-ui/react";
// Custom components
// Assets
import { AiOutlineShop } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoBoatOutline } from "react-icons/io5";

import Card from "components/card/Card";

import LogLineItem from "./LogLineItem";

export default function LogDetails(props) {
  const { diveLog, ...rest } = props;

  // Chakra Color Mode
  const blueIcon = useColorModeValue("blue.500", "white");
  const greenIcon = useColorModeValue("green.500", "white");
  const yellowIcon = useColorModeValue("yellow.500", "white");
  const balanceBg = useColorModeValue("brand.900", "#1B254B");
  const textColor = useColorModeValue("secondaryGray.500", "white");
  return (
    <Card direction="column" w="100%" {...rest}>
      <Flex
        justify="space-between"
        p="20px"
        mb="20px"
        borderRadius="16px"
        bgColor={balanceBg}
        bgPosition="right"
        bgSize="cover"
      >
        <Flex flexDirection="column" me="20px">
          <Text color="white" fontSize="sm" fontWeight="500">
            Dive Log
          </Text>
          <Text
            color="white"
            fontSize="34px"
            fontWeight="700"
            lineHeight="100%"
          >
            24 May 2024
          </Text>
        </Flex>
      </Flex>
      <Text color="secondaryGray.600" fontWeight="500" fontSize="sm" mb="10px">
        Details
      </Text>
      <Flex direction="column">
        <LogLineItem
          mb="20px"
          name="Shark's Bay"
          date="Hurghada, Egypt"
          // sum="-$154.50"
          icon={
            <Icon
              as={HiOutlineLocationMarker}
              color={blueIcon}
              w="20px"
              h="18px"
            />
          }
        />
        <LogLineItem
          mb="20px"
          name="Oasis Divers"
          date="Dive Centre"
          // sum="-$40.50"
          icon={<Icon as={AiOutlineShop} color={greenIcon} w="20px" h="18px" />}
        />
        <LogLineItem
          name={diveLog.access}
          date="Access"
          // sum="-$70.00"
          icon={
            <Icon as={IoBoatOutline} color={yellowIcon} w="20px" h="18px" />
          }
        />

        {diveLog.divingTypes && (
          <Flex direction="column">
            <Text
              color="secondaryGray.600"
              fontWeight="500"
              fontSize="sm"
              mb="10px"
              pt="20px"
              pb="10px"
            >
              Tags
            </Text>
            <Flex wrap="wrap" gap={3} mb="25px">
              {diveLog.divingTypes?.map((type) => (
                <Badge
                  key={type}
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
          </Flex>
        )}

        {diveLog.notes && (
          <Flex direction="column">
            <Text
              color="secondaryGray.600"
              fontWeight="500"
              fontSize="sm"
              mb="10px"
              pt="20px"
              pb="10px"
            >
              Notes
            </Text>
            <Text fontSize="sm" color={textColor} pb="10px">
              {diveLog.notes}
            </Text>
          </Flex>
        )}
      </Flex>
    </Card>
  );
}
