/* eslint-disable react/prop-types */
import {
  // Badge,
  Flex,
  Spacer,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegAddressCard } from "react-icons/fa";
import { IoBoatOutline } from "react-icons/io5";
import { VscSymbolRuler } from "react-icons/vsc";

import IconBox from "components/icons/IconBox";

export default function DetailsTab() {
  //   {
  //   depth,
  //   access,
  //   certLevel,
  //   diveTypes,
  // }
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("purple", "white");
  const iconBoxBg = useColorModeValue("gray.300", "navy.700");

  return (
    <Flex direction="column" w="100%">
      <Stack
        direction="column"
        spacing="24px"
        w="100%"
        mb="20px"
        pr={{ md: "0px", lg: "25px" }}
      >
        <Flex align="center" w="100%">
          <Flex align="center">
            <IconBox
              as="box"
              h="40px"
              minW="40px"
              bg={iconBoxBg}
              me="18px"
              icon={<VscSymbolRuler h="20px" w="20px" color={iconColor} />}
            />
            <Flex direction="column">
              <Text fontSize="sm" fontWeight="bold" color={textColor}>
                Depth
              </Text>
            </Flex>
          </Flex>
          <Spacer />
          <Text color="green.400" fontSize="xs">
            <Text as="span" fontSize="lg" fontWeight="bold">
              {/* {`${depth}m`} */}
            </Text>{" "}
            Max
          </Text>
        </Flex>
        <Flex align="center" w="100%">
          <Flex align="center">
            <IconBox
              as="box"
              h="40px"
              minW="40px"
              bg={iconBoxBg}
              me="18px"
              icon={<IoBoatOutline h="20px" w="20px" color={iconColor} />}
            />
            <Flex direction="column">
              <Text fontSize="sm" fontWeight="bold" color={textColor}>
                Access
              </Text>
            </Flex>
          </Flex>
          <Spacer />
          <Text fontWeight="bold" color="green.400" fontSize="lg">
            {/* {access} */}
          </Text>
        </Flex>
        <Flex align="center" w="100%">
          <Flex align="center">
            <IconBox
              as="box"
              h="40px"
              minW="40px"
              bg={iconBoxBg}
              me="18px"
              icon={<FaRegAddressCard h="20px" w="20px" color={iconColor} />}
            />
            <Flex direction="column">
              <Text fontSize="sm" fontWeight="bold" color={textColor}>
                Certification Level
              </Text>
            </Flex>
          </Flex>
          <Spacer />
          <Text fontWeight="bold" color="green.400" fontSize="lg">
            {/* {certLevel?.map((level, index) => (index ? ", " : "") + level)} */}
          </Text>
        </Flex>
      </Stack>
      <Flex wrap="wrap" gap={3}>
        {/* {diveTypes?.map((type) => (
          <Badge
            colorScheme="teal"
            borderRadius="15px"
            display="flex"
            px={4}
            py={2}
            justifyContent="center"
          >
            {type}
          </Badge>
        ))} */}
      </Flex>
    </Flex>
  );
}
