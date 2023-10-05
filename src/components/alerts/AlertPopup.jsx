/* eslint-disable react/prop-types */
import { chakra, Box, Flex } from "@chakra-ui/react";
import { BsLightningFill } from "react-icons/bs";
import { IoMdAlert, IoMdCheckmarkCircle } from "react-icons/io";

const AlertPopup = (props) => {
  const { type, text, subtext } = props;

  const getPopupColor = (alertType) => {
    switch (alertType) {
      case "success":
        return "green.500";
      case "info":
        return "blue.500";
      case "warning":
        return "yellow.500";
      case "danger":
        return "red.500";
      default:
        return null;
    }
  };

  const getPopupIcon = (alertType) => {
    switch (alertType) {
      case "success":
        return <IoMdCheckmarkCircle color="white" size="25px" />;
      case "info":
        return <IoMdAlert color="white" size="25px" />;
      case "warning":
        return <BsLightningFill color="white" size="25px" />;
      case "danger":
        return <IoMdAlert color="white" size="25px" />;
      default:
        return null;
    }
  };

  if (text && type) {
    return (
      <Flex
        maxW="sm"
        w="full"
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        rounded="lg"
        overflow="hidden"
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          w={12}
          bg={getPopupColor(type)}
        >
          {getPopupIcon(type)}
        </Flex>

        <Box mx={-3} py={2} px={4}>
          <Box mx={3}>
            <chakra.span
              color={getPopupColor(type)}
              _dark={{
                color: "green.400",
              }}
              fontWeight="bold"
            >
              {text}
            </chakra.span>
            <chakra.p
              color="gray.600"
              _dark={{
                color: "gray.200",
              }}
              fontSize="sm"
            >
              {subtext}
            </chakra.p>
          </Box>
        </Box>
      </Flex>
    );
  }
  return <> </>;
};

export default AlertPopup;
