/* eslint-disable sonarjs/no-duplicate-string */
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
import { CartContext } from "contexts/CartContext";
// Assets

export default function BookingDetails(props) {
  const {
    courseId,
    courseName,
    startDate,
    diveTime,
    price,
    priceId,
    deposit,
    ...rest
  } = props;
  const { addToCart } = useContext(CartContext);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("transparent", "whiteAlpha.100");
  const [centreName, seCentreName] = useState();

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
          <Flex direction="column" mb="34px">
            {/* Dive Centre Selection */}
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
              placeholder="Select..."
              borderColor={useColorModeValue(
                "secondaryGray.100",
                "whiteAlpha.100"
              )}
              onChange={(e) => seCentreName(e.target.value)}
            >
              {[
                "Pro Master Diving Club",
                "Blue Water Dive Resort",
                "Dive Hurghada",
                "Crazy Dolphin Dive Center",
                "Crazy Waves Diving - Sahl Hashish",
                "Divers Lodge",
                "Funny Divers",
                "Cave Divers",
                "White Whale Divers",
              ]
                .sort()
                .map((centre) => (
                  <option value={centre}>{centre}</option>
                ))}
            </Select>
          </Flex>
          {/* Display selected course and date */}
          <Card bgColor={useColorModeValue("secondaryGray.100", "brand.400")}>
            <Flex direction="column">
              <Flex my={3}>
                <Text ml={2} fontSize="sm" color={textColor} fontWeight="bold">
                  Course:
                </Text>
                <Spacer />
                <Text>{courseName || "None Selected"}</Text>
              </Flex>
              <Flex my={3}>
                <Text ml={2} fontSize="sm" color={textColor} fontWeight="bold">
                  Dive Centre:
                </Text>
                <Spacer />
                <Text>{centreName || "None Selected"}</Text>
              </Flex>
              <Flex mt={3} mb={6}>
                <Text ml={2} fontSize="sm" color={textColor} fontWeight="bold">
                  Start Date:
                </Text>
                <Spacer />
                <Text>
                  {startDate?.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </Flex>
              <Flex>
                <Text ml={2} fontSize="sm" color={textColor} fontWeight="bold">
                  Start Time:
                </Text>
                <Spacer />
                <Text>
                  {`${diveTime?.split(":")[0]}:${diveTime?.split(":")[1]}` ||
                    "None Selected"}
                </Text>
              </Flex>
            </Flex>
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
                  title: courseName,
                  itemType: "certification",
                  centreName,
                  startDate,
                  diveTime,
                  price,
                  priceId,
                  deposit,
                })
              }
            >
              Add to Cart
            </Button>
          </Card>
        </Flex>
      </SimpleGrid>
    </Card>
  );
}
