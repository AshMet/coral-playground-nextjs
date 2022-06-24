/* eslint-disable react/prop-types */
import {
  Flex,
  Icon,
  Text,
  SimpleGrid,
  Spacer,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineDollar } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";

export default function DetailsTab({
  name,
  city,
  country,
  description,
  equipment,
  languages,
  memberships,
  services,
  paymentMethods,
  ...rest
}) {
  const textColorSecondary = useColorModeValue("secondaryGray.700", "white");
  const textColorTertiary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.500"
  );
  return (
    <SimpleGrid
      columns="1"
      {...rest}
      maxW="100%"
      w={{ base: "100%", md: "unset" }}
    >
      <Text fontSize="lg" color={textColorSecondary} fontWeight="400" mb="30px">
        {description}
      </Text>
      <Flex mb="15px" align="center" cursor="pointer">
        <Icon
          as={FaRegAddressCard}
          ms="auto"
          h="22px"
          w="22px"
          mr="10px"
          color={textColorTertiary}
        />
        <Text color={textColorTertiary} fontWeight="500" fontSize="md" me="5px">
          Memberships
        </Text>
        <Spacer />
      </Flex>
      <Flex wrap="wrap" gap={3} mb="25px">
        {memberships?.map((membership) => (
          <Badge
            colorScheme="teal"
            borderRadius="15px"
            display="flex"
            px={4}
            py={2}
            justifyContent="center"
          >
            {membership}
          </Badge>
        ))}
      </Flex>

      <Flex mb="15px" align="center" cursor="pointer">
        <Icon
          as={AiOutlineDollar}
          ms="auto"
          h="22px"
          w="22px"
          mr="10px"
          color={textColorTertiary}
        />
        <Text color={textColorTertiary} fontWeight="500" fontSize="md" me="5px">
          Payment Methods
        </Text>
        <Spacer />
      </Flex>
      <Flex wrap="wrap" gap={3} mb="25px">
        {paymentMethods?.map((method) => (
          <Badge
            colorScheme="teal"
            borderRadius="15px"
            display="flex"
            px={4}
            py={2}
            justifyContent="center"
          >
            {method}
          </Badge>
        ))}
      </Flex>
      <Flex mb="15px" align="center" cursor="pointer">
        <Icon
          as={IoLanguage}
          ms="auto"
          h="22px"
          w="22px"
          mr="10px"
          color={textColorTertiary}
        />
        <Text color={textColorTertiary} fontWeight="500" fontSize="md" me="5px">
          Languages
        </Text>
        <Spacer />
      </Flex>
      <Flex wrap="wrap" gap={3} mb="25px">
        {languages?.map((language) => (
          <Badge
            colorScheme="teal"
            borderRadius="15px"
            display="flex"
            px={4}
            py={2}
            justifyContent="center"
          >
            {language}
          </Badge>
        ))}
      </Flex>
    </SimpleGrid>
  );
}
