/* eslint-disable react/prop-types */
// Chakra imports
import {
  Flex,
  Text,
  useColorModeValue,
  SimpleGrid,
  FormLabel,
  Select,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
// Custom components

import Card from "components/card/Card";
import InputField from "components/fields/InputField";
import checkout from "components/pages/activities/checkout";
// Assets

export default function BookingDetails(props) {
  const { courseId, courseName, diveDate, ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("transparent", "whiteAlpha.100");
  // const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [diverName, setDiverName] = useState();
  const [diveTime, setDiveTime] = useState();
  const [certLevel, setCertLevel] = useState();
  const [isLoading, setLoading] = useState(false);

  const lineItems = [
    {
      price: courseId, // eg: "price_1KuasdfaWasdfasdfasfnsF4fi",
      quantity: 1,
    },
  ];

  const redirectToCheckout = async () => {
    setLoading(true);
    checkout({ lineItems });
    setLoading(false);
  };
  return (
    <Card
      border="1px solid"
      borderColor={borderColor}
      justifyContent="center"
      direction="column"
      w="100%"
      pb="20px"
      {...rest}
    >
      <SimpleGrid columns="1" gap={{ base: "0px", md: "20px" }}>
        <Flex direction="column" mb="34px">
          <Flex my={3}>
            <Text ml={2} fontSize="sm" color={textColor} fontWeight="bold">
              Course:
            </Text>
            <Spacer />
            <Text>{courseName || "None Selected"}</Text>
          </Flex>
          <Flex mt={3} mb={6}>
            <Text ml={2} fontSize="sm" color={textColor} fontWeight="bold">
              Start Date:
            </Text>
            <Spacer />
            <Text>
              {diveDate?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </Flex>
          <FormLabel
            ms="10px"
            htmlFor="currency"
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            _hover={{ cursor: "pointer" }}
          >
            Dive Time
          </FormLabel>
          <Select
            value={diveTime}
            fontSize="sm"
            id="currency"
            variant="main"
            h="44px"
            maxh="44px"
            defaultValue="morning"
            onChange={(e) => setDiveTime(e.target.value)}
          >
            <option value="morning">Morning (9:00 AM)</option>
            <option value="afternoon">Afternoon (1:00 PM)</option>
          </Select>
        </Flex>
        <InputField
          value={diverName}
          id="name"
          placeholder="eg. John Smith"
          label="Diver Name"
          onChange={(e) => setDiverName(e.target.value)}
        />
        <Flex direction="column" mb="34px">
          <FormLabel
            ms="10px"
            htmlFor="currency"
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            _hover={{ cursor: "pointer" }}
          >
            Current Certification Level
          </FormLabel>
          <Select
            value={certLevel}
            fontSize="sm"
            id="currency"
            variant="main"
            h="44px"
            maxh="44px"
            defaultValue="open_water"
            onChange={(e) => setCertLevel(e.target.value)}
          >
            <option value="open_water">Open Water</option>
            <option value="advanced">Advanced</option>
            <option value="dive_master">Dive Master</option>
          </Select>
        </Flex>
        <Flex direction="column" mb="34px">
          <FormLabel
            ms="10px"
            htmlFor="currency"
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            _hover={{ cursor: "pointer" }}
          >
            Dive Centre
          </FormLabel>
          <Select
            fontSize="sm"
            id="currency"
            variant="main"
            h="44px"
            maxh="44px"
            defaultValue="sinai"
          >
            <option value="sinai">Sinai Divers</option>
            <option value="blue_hole">Blue Hole Divers</option>
            <option value="hurghada">Dive Hurghada</option>
          </Select>
        </Flex>
        <Flex direction="column" mb="34px">
          <Button
            variant="darkBrand"
            color="white"
            fontSize="sm"
            fontWeight="500"
            borderRadius="70px"
            mt="20px"
            onClick={() => redirectToCheckout()}
            isLoading={isLoading}
          >
            Book Now
          </Button>
        </Flex>
      </SimpleGrid>
    </Card>
  );
}
