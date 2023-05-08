/* eslint-disable react/prop-types */
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

import Card from "components/card/Card";

export default function Auction(props) {
  // Chakra Color Mode
  const { name, price, payNow, diveDate, diveTime, duration } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const shadow = useColorModeValue(
    " 0px 50px 40px -34px rgba(112, 144, 176, 0.16)",
    "unset"
  );
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";
  return (
    <Card
      direction="column"
      ps={{ base: "unset", lg: "'65px'" }}
      maxW="100%"
      minW="400px"
      align="center"
      p="20px"
      mb="20px"
      boxShadow={shadow}
    >
      {/* <Flex
        w="100%"
        
        direction="column"
        border="1px solid"
        borderColor={borderColor}
        bg={cardBg}
        borderRadius="30px"
      > */}
      <Text fontSize="xl" color={textColorPrimary} fontWeight="bold">
        Trip Summary
      </Text>
      <Text fontSize="md" color={textColorSecondary} mb={10}>
        Please confirm selections and click &quot;Add Dive Trip&quot; to save
      </Text>
      <Text fontWeight="500" color={textColor} fontSize="22px">
        {name}
      </Text>

      <Text fontSize="xl" color={textColor} fontWeight="500" mb="28px">
        {diveDate
          ? `${diveDate.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}`
          : "Every Day"}
        {` @ ${diveTime}`}
      </Text>
      <Text fontSize="xl" color={textColor} fontWeight="500" mb="28px">
        Duration: {duration && `${duration} hours`}
      </Text>
      <Flex w="100%" justify="center">
        <Flex direction="column" align="center" me="60px">
          <Text color={textColor} fontSize="lg" fontWeight="700">
            {`€${price / 100}`}
          </Text>
          <Text color="secondaryGray.600" fontSize="md" fontWeight="500">
            Total Price
          </Text>
        </Flex>
        <Flex direction="column" align="center" me="60px">
          <Text color={textColor} fontSize="lg" fontWeight="700">
            {`€${payNow / 100}`}
          </Text>
          <Text color="secondaryGray.600" fontSize="md" fontWeight="500">
            Deposit
          </Text>
        </Flex>
        <Flex direction="column" align="center">
          <Text color={textColor} fontSize="lg" fontWeight="700">
            {`€${(price - payNow) / 100}`}
          </Text>
          <Text color="secondaryGray.600" fontSize="md" fontWeight="500">
            Remaining
          </Text>
        </Flex>
      </Flex>
      {/* </Flex> */}
      {/* 
      <Button variant="brand" fontSize="sm" fontWeight="500" h="46px">
        Create Trip
      </Button> */}
    </Card>
  );
}
