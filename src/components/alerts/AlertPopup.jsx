import { chakra, Box, Flex, Icon } from "@chakra-ui/react";
import { BsLightningFill } from "react-icons/bs";
import { IoMdAlert, IoMdCheckmarkCircle } from "react-icons/io";

import useAlert from "../hooks/useAlert";

const AlertPopup = () => {
  const { type, text, subtext } = useAlert();

  // const AlertColor = switch (type) {
  //     case "success":
  //       return "green.500";
  //     case "info":
  //       return "blue.500";
  //     case "warning":
  //       return "yellow.500";
  //     case "danger":
  //       return "red.500";
  //     default:
  //       return null;
  //   };

  if (text && type) {
    return (
      <Flex
        w="full"
        alignItems="end"
        justifyContent="end"
        mt={100}
        position="absolute"
        zIndex={10}
      >
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
            bg={(() => {
              switch (type) {
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
            })()}
          >
            {(() => {
              switch (type) {
                case "success":
                  return (
                    <Icon as={IoMdCheckmarkCircle} color="white" boxSize={6} />
                  );
                case "info":
                  return <Icon as={IoMdAlert} color="white" boxSize={6} />;
                case "warning":
                  return <Icon as={IoMdAlert} color="white" boxSize={6} />;
                case "danger":
                  return (
                    <Icon as={BsLightningFill} color="white" boxSize={6} />
                  );
                default:
                  return null;
              }
            })()}
          </Flex>

          <Box mx={-3} py={2} px={4}>
            <Box mx={3}>
              <chakra.span
                color="green.500"
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
      </Flex>
    );
  }
  return <> </>;
};

export default AlertPopup;
