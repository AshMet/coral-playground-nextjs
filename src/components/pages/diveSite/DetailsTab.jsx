/* eslint-disable react/prop-types */
import {
  // Badge,
  Flex,
  Spacer,
  Text,
  Stack,
  useColorModeValue,
  Box,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import { FaRegAddressCard } from "react-icons/fa";
import { IoBoatOutline } from "react-icons/io5";

import Card from "components/card/Card";
import CircularProgress from "components/charts/CircularProgress";
import IconBox from "components/icons/IconBox";

export default function DetailsTab({
  depth,
  visibility,
  current,
  access,
  certLevel,
  diveTypes,
}) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const valueColor = useColorModeValue("teal.500", "teal.300");
  const iconColor = useColorModeValue("purple", "white");
  const iconBoxBg = useColorModeValue("gray.300", "navy.700");

  return (
    <Flex direction="column" w="100%">
      <Box gridArea="1 / 2 / 2 / 3">
        <SimpleGrid mt="20px" columns={{ sm: 2, md: 3 }} gap="20px" mb="20px">
          <Card p={{ base: "10px", md: "20px" }}>
            <CircularProgress
              title="Depth"
              percentage="75"
              text={`${depth}m`}
            />
          </Card>
          <Card p={{ base: "10px", md: "20px" }}>
            <CircularProgress
              title="Visibility"
              percentage="60"
              text={visibility}
            />
          </Card>
          <Card p={{ base: "10px", md: "20px" }}>
            <CircularProgress title="Current" percentage="15" text={current} />
          </Card>
        </SimpleGrid>
      </Box>

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
              icon={<IoBoatOutline h="20px" w="20px" color={iconColor} />}
            />
            <Flex direction="column">
              <Text fontSize="sm" fontWeight="bold" color={textColor}>
                Access
              </Text>
            </Flex>
          </Flex>
          <Spacer />
          <Text fontWeight="bold" color={valueColor} fontSize="lg">
            {access}
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
          <Text fontWeight="bold" color={valueColor} fontSize="lg">
            {certLevel?.map((level, index) => (index ? ", " : "") + level)}
          </Text>
        </Flex>
      </Stack>
      <Flex align="center" mb="10px">
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
            Diving Types
          </Text>
        </Flex>
      </Flex>
      <Spacer />
      <Flex wrap="wrap" gap={3} mb="25px">
        {diveTypes?.map((type) => (
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
        ))}
      </Flex>
    </Flex>
  );
}
