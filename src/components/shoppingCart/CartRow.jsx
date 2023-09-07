/* eslint-disable react/prop-types */
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

import TimeTile from "components/dataDisplay/TimeTile";

export default function CartRow(props) {
  const { startDate, startTime, title, subTitle, price, ...rest } = props;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  // const iconBoxBg = useColorModeValue("secondaryGray.300", "navy.700");
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      w="100%"
      mb="20px"
      {...rest}
    >
      <TimeTile
        date={new Date(startDate)}
        time={startTime}
        color="white"
        // bg={selected ? "gray.800" : "purple.400"}
        tileSize="sm"
        mr="20px"
      />
      <Flex direction="column" align="start" me="auto">
        <Text color={textColor} fontSize="md" me="6px" fontWeight="700">
          {title}
        </Text>
        <Text color="secondaryGray.800" fontSize="sm" fontWeight="500">
          {subTitle}
        </Text>
      </Flex>
      <Text
        ms="20px"
        color={useColorModeValue("green.400", "green.200")}
        fontSize="sm"
        me="6px"
        fontWeight="700"
      >
        € {price}
      </Text>
    </Flex>
  );
}
