// Chakra imports
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
// Custom components
import { GiDivingHelmet } from "react-icons/gi";
import { IoBoatOutline } from "react-icons/io5";
import { MdCheckCircle } from "react-icons/md";

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
          icon={GiDivingHelmet}
          title="Explore"
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
          icon={IoBoatOutline}
          title="Select"
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
          icon={MdCheckCircle}
          title="Checkout"
          subtitle="Provide your basic details and pay a refundable deposit"
        />
      </Flex>
    </Box>
  );
}
