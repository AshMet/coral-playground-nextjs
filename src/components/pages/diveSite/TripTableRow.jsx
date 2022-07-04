/* eslint-disable react/prop-types */
import {
  Button,
  Flex,
  Tr,
  Td,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function TripTableRow(props) {
  const {
    // diveSiteName,
    // diveSiteImg,
    diveCentreName,
    numberOfDives,
    diveDays,
    divePrice,
  } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Tr>
      <Td>
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="bold">
            {diveCentreName}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Flex align="center">
          <Text color="gray.500" fontSize="sm" fontWeight="bold">
            {numberOfDives}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Flex align="center">
          <Text color="gray.500" fontSize="sm" fontWeight="bold">
            {diveDays}
          </Text>
        </Flex>
      </Td>
      <Td>
        {/* <Progress size="xs" colorScheme="teal" value={70} borderRadius="12px" /> */}
      </Td>
      <Td>
        <Text color="green.500" fontSize="sm" fontWeight="bold">
          €{divePrice}
        </Text>
      </Td>
      <Td>
        <Button
          variant="outline"
          size="sm"
          colorScheme="teal"
          fontSize="xs"
          fontWeight="bold"
          // onClick={() =>
          //   navigate("/diving/create_booking", {
          //     state: {
          //       diveSiteName,
          //       imgData: diveSiteImg,
          //       diveCentre: diveCentreName,
          //       price: divePrice,
          //     },
          //   })
          // }
        >
          {" "}
          Select Time
        </Button>
      </Td>
    </Tr>
  );
}
