/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
// Chakra imports
import { Flex, Box, Text, useToast, useColorModeValue } from "@chakra-ui/react";
// Custom components
// import { IoLogoFacebook, IoLogoTwitter } from "react-icons/io";

export default function Conversion(props) {
  const { referralCode, fbLink, twtLink } = props;
  const toast = useToast();

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box>
      <Text color={textColor} fontSize="lg" fontWeight="700" mb="5px" ml="10px">
        Share your (social media optimized) referral link
      </Text>
      {/* <Text color="secondaryGray.600" fontSize="md" fontWeight="400" mb="5px" ml=>
        You can also share your referral link by copying and sending it to your
        friends or sharing it on social media.
      </Text> */}
      <Flex>
        <Flex
          w="100%"
          px="18px"
          align="center"
          borderRadius="50px"
          cursor="pointer"
          onClick={function () {
            navigator.clipboard.writeText(referralCode);
            toast({
              title: `Invite link copied!`,
              position: "top",
              status: "success",
              isClosable: true,
            });
          }}
          bg={boxBg}
          me="6px"
          minH="40px"
        >
          <Text
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            w={{ base: "60%", md: "85%", "2xl": "68%", "3xl": "80%" }}
          >
            {referralCode}
          </Text>
          <Text ms="auto" color={iconColor} fontSize="sm" fontWeight="500">
            Copy link
          </Text>
        </Flex>
        {/* <IconButton me="6px" bg={boxBg} borderRadius="50%">
          <Icon w="22px" h="22px" as={IoLogoFacebook} color={iconColor} />
        </IconButton>
        <IconButton bg={boxBg} borderRadius="50%">
          <Icon w="18px" h="18px" as={IoLogoTwitter} color={iconColor} />
        </IconButton> */}
      </Flex>
    </Box>
  );
}
