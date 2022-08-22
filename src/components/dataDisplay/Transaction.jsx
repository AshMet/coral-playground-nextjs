/* eslint-disable react/prop-types */
// import React from "react";

// Chakra imports
import {
  Button,
  Flex,
  Icon,
  Text,
  Tooltip,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
// import { useRouter } from "next/router";
import { useContext, useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoMdTime } from "react-icons/io";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";

import { DivingContext } from "../../contexts/DivingContext";
import AlertPopup from "components/alerts/AlertPopup";

import "../../../public/css/MiniCalendar.module.css";
// import "react-calendar/dist/Calendar.css";
// import "react-datetime-picker/dist/DateTimePicker.css";
// import "react-clock/dist/Clock.css";

export default function Transaction(props) {
  const { diveDate, price, icon, siteList, tripId, centreName, ...rest } =
    props;
  const { dives, setDives } = useContext(DivingContext);
  const toast = useToast();

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconBoxBg = useColorModeValue("secondaryGray.300", "navy.700");

  const [value, onChange] = useState();
  // const router = useRouter();

  const siteNames = siteList?.map((site) => site.attributes.name).join(" + ");

  const addDive = () => {
    if (!diveDate && !value) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="warning"
            text="No Date Provided"
            subtext="Please select a date before adding your dive"
          />
        ),
      });
      return;
    }
    const dive = {
      id: tripId,
      siteName: siteNames,
      siteCount: siteList.length,
      centreName,
      diveDate: diveDate ? new Date(diveDate) : new Date(value),
      diveTime: "morning",
      price,
      priceId: "price_1LBLSVAvLPvC9h7xk0HEvL3f", // mapLocation.stripePriceId,
    };

    const newDiveList = [dive, ...dives];
    setDives(newDiveList);
    toast({
      position: "top",
      render: () => (
        <AlertPopup
          type="success"
          text="Dive Added"
          subtext="View Shopping Cart to complete your order"
        />
      ),
    });
  };

  return (
    <Flex justifyContent="center" alignItems="center" w="100%" {...rest}>
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
              {siteList.map((site) => site.attributes.name).join(" + ")}
            </Text>
          </Flex>
        </Flex>
        <Flex align="center">
          <Icon me="8px" as={IoStorefrontOutline} w="16px" h="16px" />
          <Text color={textColor} fontSize="md" me="6px" fontWeight="500">
            {centreName}
          </Text>
        </Flex>
        {diveDate ? (
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
        ) : (
          <Tooltip label="Select Date before adding to cart">
            <Flex align="center">
              <Icon me="8px" as={IoMdTime} w="16px" h="16px" />
              <DatePicker onChange={onChange} value={value} />
            </Flex>
          </Tooltip>
        )}
      </Flex>
      <Flex direction="column">
        <Text
          ms="auto"
          color="green.500"
          fontSize="sm"
          me="6px"
          fontWeight="700"
        >
          €
          <Text as="span" fontSize="lg">
            {price / 100}
          </Text>
        </Text>
        <Tooltip label="Add to Cart">
          <Button
            align="center"
            justifyContent="center"
            bg={iconBoxBg}
            // _hover={bgHover}
            // _focus={bgFocus}
            // _active={bgFocus}
            w="37px"
            h="37px"
            mt="10px"
            lineHeight="100%"
            borderRadius="10px"
            onClick={addDive}
            {...rest}
          >
            <Icon as={MdAddCircle} color={textColor} w="24px" h="24px" />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
