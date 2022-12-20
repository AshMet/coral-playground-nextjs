// Chakra imports
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { GiShop } from "react-icons/gi";
import { IoBoatOutline } from "react-icons/io5";
import { MdCheckCircle } from "react-icons/md";

import { DashCurveDown, DashCurveUp } from "components/icons/Icons";
import IconStep from "components/icons/IconStep";

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
          icon={GiShop}
          title="Promote"
          subtitle="Add your diving calendar to help customers discover and book from your upcoming dive trips"
        />
        <DashCurveUp
          mt="10px"
          color={dashColor}
          w={{ base: "100px", lg: "132px" }}
          display={{ base: "none", md: "flex" }}
          h="22px"
        />
        <IconStep
          icon={MdCheckCircle}
          title="Confirm"
          subtitle="Customers will reserve their desired dives and dates with a small deposit. Once payment is complete, you will both receieve an automated confirmation email with the complete itinerary"
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
          icon={IoBoatOutline}
          title="Dive"
          subtitle="Customers will be given an option to complete a pre-dive check-in to speed up onboarding and will pay any outstanding fees directly to the dive centre"
        />
      </Flex>
    </Box>
  );
}
