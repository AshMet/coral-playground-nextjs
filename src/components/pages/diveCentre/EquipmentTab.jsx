/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

import Image from "components/actions/NextChakraImg";
import Card from "components/card/Card";
import CentreEquipTile from "components/dataDisplay/CentreEquipTile";

export default function EquipmentSelection(props) {
  const { equipment } = props;
  const iconColor = useColorModeValue(
    "",
    "invert(100%) sepia(0%) saturate(2%) hue-rotate(142deg) brightness(105%) contrast(101%)"
  );

  const freeEquipment = equipment.filter((item) => item.price === 0);
  const PaidEquipment = equipment.filter((item) => item.price !== 0);

  // const equipLineItems = PaidEquipment?.map((item) => ({
  //   id: item.id,
  //   title: item.name,
  //   itemType: "equipment",
  //   centreName: "",
  //   startDate: "",
  //   diveTime: "",
  //   price: item.price,
  //   priceId: item.stripePriceId,
  //   deposit: item.deposit,
  // }));
  // console.log("equipLineItems", equipLineItems);
  // console.log("equipment list", equipmentList);
  // console.log("freeEquipment", freeEquipment);
  // console.log("Equipment", equipment);

  return (
    <Box>
      <Text color="grey.500" fontSize="md" fontWeight="500" mb="20px">
        Select any specialized equipment you would like to add to your trip
      </Text>
      <Flex direction="column" w="100%">
        <Flex wrap="wrap">
          <SimpleGrid columns={{ sm: 2, md: 4 }} gap="20px" w="100%">
            {PaidEquipment?.map((item) => (
              <CentreEquipTile item={item} key={item.id} />
            ))}
          </SimpleGrid>
          {freeEquipment.length > 0 && (
            <Card background="grey.500">
              <Text color="green.500" fontSize="md" fontWeight="500" mb="20px">
                Note that the following equipment is included for free on every
                dive trip as needed
              </Text>
              <SimpleGrid columns={{ sm: 3, md: 4 }} gap="20px" w="100%">
                {freeEquipment?.map((item) => (
                  <VStack>
                    <Image
                      src={`/svg/equipment/${item.name
                        .toLowerCase()
                        .replaceAll(" ", "-")}.svg`}
                      width="100%"
                      height="40px"
                      borderRadius="15px"
                      filter={iconColor}
                    />
                    <Text mb={0}>{item.name}</Text>
                  </VStack>
                ))}
              </SimpleGrid>
            </Card>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
