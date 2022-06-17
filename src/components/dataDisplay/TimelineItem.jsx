/* eslint-disable react/prop-types */
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// import React from "react";
import { BsX } from "react-icons/bs";
// Assets
import { IoMdTime } from "react-icons/io";

export default function Default(props) {
  const { confirmed, day, weekday, hours, title, id, removeDive, ...rest } =
    props;
  // Chakra Color Mode
  const miniCardConfirmed = useColorModeValue("brand.900", "brand.400");
  const miniCardNonConfirmed = useColorModeValue("transparent", "navy.700");
  const boxConfirmed = useColorModeValue("#32278D", "navy.900");
  const boxNonConfirmed = useColorModeValue("secondaryGray.300", "navy.800");
  const textConfirmed = useColorModeValue("white", "white");
  const textNonConfirmed = useColorModeValue("secondaryGray.900", "white");
  const textSecondaryConfirmed = useColorModeValue("white", "white");
  const textSecondaryNonConfirmed = useColorModeValue(
    "secondaryGray.600",
    "white"
  );
  return (
    <Flex
      align="center"
      p="6px"
      borderRadius="20px"
      bg={confirmed ? miniCardConfirmed : miniCardNonConfirmed}
      {...rest}
    >
      <Flex
        me="20px"
        direction="column"
        align="center"
        justify="center"
        w="77px"
        h="77px"
        borderRadius="15px"
        bg={confirmed ? boxConfirmed : boxNonConfirmed}
      >
        <Text
          mb="2px"
          fontSize="md"
          fontWeight="500"
          color={confirmed ? textSecondaryConfirmed : textSecondaryNonConfirmed}
        >
          {weekday}
        </Text>
        <Text
          lineHeight="100%"
          fontSize="34px"
          fontWeight="700"
          color={confirmed ? textConfirmed : textNonConfirmed}
        >
          {day}
        </Text>
      </Flex>
      <Box>
        <Text
          fontSize="lg"
          fontWeight="700"
          color={confirmed ? textConfirmed : textNonConfirmed}
        >
          {title}
        </Text>
        <Flex align="center">
          <Icon
            me="8px"
            as={IoMdTime}
            w="16px"
            h="16px"
            color={
              confirmed ? textSecondaryConfirmed : textSecondaryNonConfirmed
            }
          />
          <Text
            fontSize="sm"
            fontWeight="500"
            color={
              confirmed ? textSecondaryConfirmed : textSecondaryNonConfirmed
            }
          >
            {hours}
          </Text>
        </Flex>
      </Box>
      {confirmed && (
        <Button
          p="0px"
          ms="auto"
          variant="no-hover"
          bg="transparent"
          cursor="pointer"
          color="white"
          _hover={{ transform: "translate(4px)" }}
          onClick={() => removeDive(id)}
        >
          <Text fontSize="sm" fontWeight="bold">
            Remove
          </Text>
          <Icon
            as={BsX}
            w="18px"
            h="18px"
            transition="all .3s ease"
            ms=".3rem"
          />
        </Button>
      )}
      {/* <Button
        // mb="auto"
        variant="no-hover"
        bg="transparent"
        p="0px"
        ms="auto"
        onClick={() => removeDive(id)}
      >
        <Icon
          as={BsX}
          color={confirmed ? textConfirmed : textNonConfirmed}
          w="20px"
          h="20px"
        />
      </Button> */}
    </Flex>
  );
}
