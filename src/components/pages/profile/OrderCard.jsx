/* eslint-disable react/prop-types */
import {
  Button,
  Flex,
  Text,
  Divider,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react";

import Card from "components/card/Card";

export default function OrderCard(props) {
  const {
    orderId,
    diverName,
    createdAt,
    paid,
    totalCost,
    currency,
    status,
    tripCount,
    certCount,
  } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card p={{ base: "15px", md: "30px" }} mb="10px">
      <Flex direction={{ base: "column", md: "row" }}>
        <Flex direction="column" me="auto" mb={{ base: "30px", md: "0px" }}>
          <Text
            w="max-content"
            textAlign="center"
            fontSize="sm"
            p="6px 12px"
            bg="linear-gradient(108.54deg, #08a743 6.56%, #08c999 95.2%)"
            color="black"
            borderRadius="10px"
            fontWeight="700"
            mb={2}
          >
            {status.toUpperCase()}
          </Text>
          <Text
            fontSize="sm"
            color="gray.500"
            fontWeight="500"
            casing="uppercase"
          >
            {`Order# ${orderId.split("-").pop()}`}
          </Text>
          <Text color={textColor} fontSize="xl" fontWeight="700">
            {`Receipt for: ${diverName}`}
          </Text>
          <Text
            w="max-content"
            mb="8px"
            fontSize="md"
            color="secondaryGray.600"
            fontWeight="400"
          >
            {`Created On: ${new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}`}
            {/* {lineItems[0].description} */}
          </Text>
          <Flex direction="row" mb={3}>
            <Text color={textColor} fontSize="md" fontWeight="700">
              {`Trips: ${tripCount}`}
            </Text>
            <Spacer />
            <Text color={textColor} fontSize="md" fontWeight="700">
              {`Certs: ${certCount}`}
            </Text>
          </Flex>
          <Spacer />
          <Button size="sm">View Details</Button>
        </Flex>
        <Flex direction="column">
          <Text
            w="max-content"
            fontSize="md"
            color="green.600"
            fontWeight="400"
          >
            Amount Paid
          </Text>
          <Text color={textColor} fontSize="36px" fontWeight="700">
            {paid}
            <Text as="span" fontSize="20px" casing="uppercase" ml={2}>
              {currency}
            </Text>
          </Text>
          <Divider color="secondaryGray.600" my={3} />
          <Text w="max-content" fontSize="md" color="red.600" fontWeight="400">
            Outstanding Balance
          </Text>
          <Text color={textColor} fontSize="36px" fontWeight="700">
            {(totalCost - paid).toFixed(2)}
            <Text as="span" fontSize="20px" casing="uppercase" ml={2}>
              {currency}
            </Text>
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
