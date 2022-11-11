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
import { useContext, useState } from "react";
// Custom components

import Card from "components/card/Card";
// import InputField from "components/fields/InputField";
// import checkout from "components/pages/diving/checkout";
import { DivingContext } from "contexts/DivingContext";
// Assets

export default function BookingDetails(props) {
  const { courseId, courseName, diveDate, diveTime, price, priceId, ...rest } =
    props;
  const { addToCart } = useContext(DivingContext);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("transparent", "whiteAlpha.100");
  const [diveCentre, setDiveCentre] = useState();

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
          {/* <Flex my={3}>
            <Text ml={2} fontSize="sm" color={textColor} fontWeight="bold">
              Dive Time:
            </Text>
            <Spacer />
            <Text>{diveTime || "None Selected"}</Text>
          </Flex> */}
        </Flex>
        <Flex direction="column" mb="34px">
          <FormLabel
            ms="10px"
            htmlFor="diveCentre"
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            _hover={{ cursor: "pointer" }}
          >
            Dive Centre
          </FormLabel>
          <Select
            fontSize="sm"
            id="diveCentre"
            variant="main"
            h="44px"
            maxh="44px"
            defaultValue="Select Option"
            onChange={(e) => setDiveCentre(e.target.value)}
          >
            <option value="Sinai Divers">Sinai Divers</option>
            <option value="Blue Hole Divers">Blue Hole Divers</option>
            <option value="Dive Hurghada">Dive Hurghada</option>
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
            onClick={() =>
              addToCart({
                id: courseId,
                siteName: courseName,
                siteCount: 1,
                centreName: diveCentre,
                diveDate,
                diveTime: "morning",
                price,
                priceId,
              })
            }
          >
            Add to Cart
          </Button>
        </Flex>
      </SimpleGrid>
    </Card>
  );
}
