/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
// Chakra imports
import { Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
// Assets
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

export default function RatingResult(props) {
  const { stars, title, value, ...rest } = props;
  // Chakra Color Mode
  const textColorTertiary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.500"
  );

  function getIcon(x) {
    return stars >= x - 0.5 && stars < x
      ? IoMdStarHalf
      : stars >= x
      ? IoMdStar
      : IoMdStarOutline;
  }

  return (
    <Flex align="center" {...rest}>
      {title && (
        <Text
          colorScheme="brand"
          color={textColorTertiary}
          h="8px"
          w="150px"
          maxW={{ base: "100px", md: "200px", lg: "150px", "2xl": "340px" }}
          me="10px"
        >
          {title}
        </Text>
      )}
      <Icon
        color="orange.500"
        h={{ base: "16px", md: "24px" }}
        w={{ base: "16px", md: "24px" }}
        as={getIcon(1)}
      />
      <Icon
        color="orange.500"
        h={{ base: "16px", md: "24px" }}
        w={{ base: "16px", md: "24px" }}
        as={getIcon(2)}
      />
      <Icon
        color="orange.500"
        h={{ base: "16px", md: "24px" }}
        w={{ base: "16px", md: "24px" }}
        as={getIcon(3)}
      />
      <Icon
        color="orange.500"
        h={{ base: "16px", md: "24px" }}
        w={{ base: "16px", md: "24px" }}
        as={getIcon(4)}
      />
      <Icon
        color="orange.500"
        h={{ base: "16px", md: "24px" }}
        w={{ base: "16px", md: "24px" }}
        as={getIcon(5)}
        me="20px"
      />

      {value && (
        <Text fontSize="lg" color={textColorTertiary} fontWeight="500">
          {value}
        </Text>
      )}
    </Flex>
  );
}
