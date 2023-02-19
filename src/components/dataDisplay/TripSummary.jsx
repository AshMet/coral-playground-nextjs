/* eslint-disable react/prop-types */
// import React from "react";

// Chakra imports
import { Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoMdTime } from "react-icons/io";
import { IoStorefrontOutline } from "react-icons/io5";

import "../../../public/css/MiniCalendar.module.css";
// import "react-calendar/dist/Calendar.css";
// import "react-datetime-picker/dist/DateTimePicker.css";
// import "react-clock/dist/Clock.css";

export default function TripSummary(props) {
  const { title, centreName, diveDate } = props; // , diveTime

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Flex justifyContent="center" alignItems="center" w="100%">
      {/* <IconBox h="42px" w="42px" bg={iconBoxBg} me="20px" icon={icon} /> */}
      <Flex direction="column" align="start" me="auto" w="100%">
        <Flex direction="row" align="stretch" me="auto">
          <Flex align="center">
            <Icon me="8px" as={HiOutlineLocationMarker} w="16px" h="16px" />
            <Text
              color={textColor}
              fontSize="md"
              me="6px"
              fontWeight="700"
              // onClick={() => router.push("/diving/booking")} // Not Working
            >
              {title}
            </Text>
          </Flex>
        </Flex>
        {centreName && (
          <Flex align="center">
            <Icon me="8px" as={IoStorefrontOutline} w="16px" h="16px" />
            <Text color={textColor} fontSize="md" me="6px" fontWeight="500">
              {centreName}
            </Text>
          </Flex>
        )}
        {diveDate && (
          <Flex align="center">
            <Icon me="8px" as={IoMdTime} w="16px" h="16px" />
            <Text color="secondaryGray.600" fontSize="sm" fontWeight="500">
              {new Date(diveDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              {" @ "}
              {new Date(diveDate).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
