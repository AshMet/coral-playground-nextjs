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
import { useContext } from "react";
import { MdAddCircle } from "react-icons/md";

import { DivingContext } from "../../contexts/DivingContext";
import AlertPopup from "components/alerts/AlertPopup";

export default function Transaction(props) {
  const {
    diveDate,
    price,
    icon,
    siteName,
    siteId,
    centreName,
    locationType,
    ...rest
  } = props;
  const { dives, setDives } = useContext(DivingContext);
  const toast = useToast();

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconBoxBg = useColorModeValue("secondaryGray.300", "navy.700");

  const addDive = () => {
    if (!siteName || !diveDate) {
      return;
    }
    const dive = {
      id: siteId,
      siteName,
      centreName,
      diveDate: new Date(diveDate.iso),
      diveTime: "morning",
      priceId: "price_1LBLSVAvLPvC9h7xk0HEvL3f", // mapLocation.stripePriceId,
    };

    const newDiveList = [dive, ...dives];
    setDives(newDiveList);
    toast({
      position: "top-right",
      render: () => (
        <AlertPopup
          type="success"
          text="Dive Added."
          subtext="View Shopping Cart to complete your order."
        />
      ),
    });
    // toast({
    //   title: "Dive Added.",
    //   description: "View Shopping Cart to complete your order.",
    //   status: "success",
    //   duration: 9000,
    //   isClosable: true,
    // });
  };

  // console.log(...dives);
  // console.log(diveDate);
  return (
    <Flex justifyContent="center" alignItems="center" w="100%" {...rest}>
      {/* <IconBox h="42px" w="42px" bg={iconBoxBg} me="20px" icon={icon} /> */}
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
          mt="5px"
          mr="10px"
          lineHeight="100%"
          borderRadius="10px"
          onClick={addDive}
          {...rest}
        >
          <Icon as={MdAddCircle} color={textColor} w="24px" h="24px" />
        </Button>
      </Tooltip>
      <Flex direction="column" align="start" me="auto">
        <Text color={textColor} fontSize="md" me="6px" fontWeight="700">
          {locationType === "dive_centre" ? siteName : centreName}
        </Text>
        <Text color="secondaryGray.600" fontSize="sm" fontWeight="500">
          {new Date(diveDate?.iso).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          {" @ "}
          {new Date(diveDate?.iso).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </Flex>
      <Text ms="auto" color="green.500" fontSize="sm" me="6px" fontWeight="700">
        €{price}
      </Text>
    </Flex>
  );
}
