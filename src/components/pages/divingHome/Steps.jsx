// Chakra imports
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { TbCalendarEvent, TbScubaMask, TbShoppingCart } from "react-icons/tb";

import { DashCurveDown, DashCurveUp } from "components/icons/Icons";
import IconStep from "components/icons/IconStep";
// Assets

export default function Conversion(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const dashColor = useColorModeValue("brand.500", "whiteAlpha.500");
  return (
    <Box px="80px" py="30px" w="100%" {...rest}>
      <Flex
        position="relative"
        direction={{ base: "column", md: "row" }}
        justifyContent="space-around"
      >
        <IconStep
          icon={TbScubaMask}
          title="Discover"
          subtitle="Browse our list of Dive Sites and Dive Centres to find upcoming
            trips"
        />
        <DashCurveUp
          mt="10px"
          color={dashColor}
          w={{ base: "100px", lg: "132px" }}
          display={{ base: "none", md: "flex" }}
          h="22px"
        />
        <IconStep
          icon={TbCalendarEvent}
          title="Schedule"
          subtitle="Pick the dive trips and dates you wish to dive, and we will take
            care of the rest"
          // mx="60px"
        />
        <DashCurveDown
          mt="50px"
          color={dashColor}
          w={{ base: "100px", lg: "132px" }}
          display={{ base: "none", md: "flex" }}
          h="22px"
        />
        <IconStep
          icon={TbShoppingCart}
          title="Checkout"
          subtitle="Provide your basic details and pay a refundable deposit"
        />
      </Flex>
    </Box>
  );
}
