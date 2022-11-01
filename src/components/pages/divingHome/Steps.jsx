// Chakra imports
import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import { GiDivingHelmet } from "react-icons/gi";
import { IoBoatOutline } from "react-icons/io5";
import { MdCheckCircle } from "react-icons/md";

import IconBox from "components/icons/IconBox";
import { DashCurveDown, DashCurveUp } from "components/icons/Icons";
// Assets

export default function Conversion(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const dashColor = useColorModeValue("brand.500", "whiteAlpha.500");
  const shadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const completeShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "inset 0px 4px 4px rgba(255, 255, 255, 0.2)"
  );
  const boxBg = useColorModeValue(
    "white",
    "linear-gradient(180deg, #1F2A4F 0%, #18224D 50.63%, #111C44 100%)"
  );
  return (
    <Box px="80px" py="30px" w="100%" {...rest}>
      <Flex
        position="relative"
        direction={{ base: "column", md: "row" }}
        justifyContent="space-around"
      >
        <Flex direction="column" align="center" justify="center">
          <IconBox
            mb="16px"
            w="100px"
            h="100px"
            bg={boxBg}
            shadow={shadow}
            boxShadow={completeShadow}
            icon={
              <Icon w="38px" h="38px" as={GiDivingHelmet} color={brandColor} />
            }
          />
          <Text
            textAlign="center"
            color={textColor}
            fontSize="xl"
            fontWeight="700"
            mb="10px"
          >
            Explore
          </Text>
          <Text
            textAlign="center"
            color="secondaryGray.600"
            fontSize="md"
            fontWeight="400"
            maxW="278px"
            mb="70px"
          >
            Browse our list of Dive Sites and Dive Centres to find upcoming
            trips
          </Text>
        </Flex>
        <DashCurveUp
          mt="10px"
          color={dashColor}
          w={{ base: "100px", lg: "132px" }}
          display={{ base: "none", md: "flex" }}
          h="22px"
        />
        <Flex mx="60px" direction="column" align="center" justify="center">
          <IconBox
            mb="16px"
            w="100px"
            h="100px"
            bg={boxBg}
            shadow={shadow}
            boxShadow={completeShadow}
            icon={
              <Icon w="38px" h="38px" as={IoBoatOutline} color={brandColor} />
            }
          />
          <Text
            textAlign="center"
            color={textColor}
            fontSize="xl"
            fontWeight="700"
            mb="10px"
          >
            Select
          </Text>
          <Text
            textAlign="center"
            color="secondaryGray.600"
            fontSize="md"
            fontWeight="400"
            maxW="278px"
            mb="70px"
          >
            Pick the dive trips and dates you wish to dive, and we will take
            care of the rest
          </Text>
        </Flex>
        <DashCurveDown
          mt="50px"
          color={dashColor}
          w={{ base: "100px", lg: "132px" }}
          display={{ base: "none", md: "flex" }}
          h="22px"
        />
        <Flex direction="column" align="center" justify="center">
          <IconBox
            mb="16px"
            w="100px"
            h="100px"
            bg={boxBg}
            shadow={shadow}
            boxShadow={completeShadow}
            icon={
              <Icon w="38px" h="38px" as={MdCheckCircle} color={brandColor} />
            }
          />
          <Text
            textAlign="center"
            color={textColor}
            fontSize="xl"
            fontWeight="700"
            mb="10px"
          >
            Checkout
          </Text>
          <Text
            textAlign="center"
            color="secondaryGray.600"
            fontSize="md"
            fontWeight="400"
            maxW="278px"
            mb="70px"
          >
            Provide your basic details and pay a refundable deposit
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
