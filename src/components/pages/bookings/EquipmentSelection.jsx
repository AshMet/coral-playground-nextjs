/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import {
  Button,
  Flex,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

// Custom components
import Image from "components/actions/NextChakraImg";
import Card from "components/card/Card";
import checkout from "components/pages/diving/checkout";
import equipment from "lib/constants/equipment.json";

export default function EquipmentSelection(props) {
  const { mediaTab, dives, diverName, diverEmail, diverCert, lastDive, notes } =
    props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const priceColor = useColorModeValue("green.300", "green.500");
  const iconColor = useColorModeValue(
    "",
    "invert(100%) sepia(0%) saturate(2%) hue-rotate(142deg) brightness(105%) contrast(101%)"
  );
  const selectedBgColor = useColorModeValue("brand.400", "brand.400");
  const [equipmentList, setEquipmentList] = useState([]);

  const getProductId = (n) => {
    // if (n = 1) {
    //   return "prod_Lt7hO6IqEZT5Fb";
    // } else {
    // }
    switch (n) {
      case 1:
        return "prod_Lt7hO6IqEZT5Fb";
      case 2:
        return "prod_Lt7cRX9OGqgQDz";
      case 3:
        return "prod_MHU0OAktSpIMur";
      default:
        return "prod_Lt7hO6IqEZT5Fb";
    }
  };

  function toggleArrayItem(arr, item) {
    arr.includes(item)
      ? setEquipmentList(arr.filter((i) => i !== item)) // remove item
      : setEquipmentList([...arr, item]); // add item
  }

  const lineItems = dives.map((dive) => {
    return {
      // price: dive.priceId, // eg: "price_1KuasdfaWasdfasdfasfnsF4fi",
      price_data: {
        unit_amount: dive.price,
        currency: "usd",
        product: getProductId(dive.siteCount),
      },
      quantity: 1,
    };
  });

  const custMetadata = {
    diverCert,
    lastDive,
    notes,
  };

  // const arrayToObject = (arr, key) => {
  //   return arr.reduce((obj, item) => {
  //     obj[item[key]] = item;
  //     return obj;
  //   }, {});
  // };

  // console.log(arrayToObject(dives, "id"));
  // const sessionMetadata = arrayToObject(dives, "id");

  const sessionMetadata = {
    dive1: JSON.stringify(dives[0]),
    dive2: JSON.stringify(dives[1]),
    dive3: JSON.stringify(dives[2]),
  };

  console.log(equipmentList);
  console.log(dives);

  const redirectToCheckout = async () => {
    checkout({
      lineItems,
      diverName,
      diverEmail,
      custMetadata,
      sessionMetadata,
    });
  };

  return (
    <Card p="30px">
      <Text color={textColor} fontSize="2xl" fontWeight="700" mb="20px">
        Equipment
      </Text>
      <Flex direction="column" w="100%">
        <Flex wrap="wrap">
          <SimpleGrid columns={{ sm: 2, md: 4 }} gap="20px" w="100%">
            {equipment?.map((item) => (
              <Button
                key={item.name}
                borderRadius="15px"
                display="flex"
                p={3}
                mb={3}
                justifyContent="center"
                minH="130px"
                bgColor={equipmentList.includes(item) && selectedBgColor}
                onClick={() => toggleArrayItem(equipmentList, item)}
              >
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
                  <Text mt="0px" color={priceColor}>
                    +${item.price}
                  </Text>
                </VStack>
              </Button>
            ))}
          </SimpleGrid>
        </Flex>
        <Flex justify="space-between" mt="24px">
          <Button
            variant="light"
            fontSize="sm"
            borderRadius="16px"
            w={{ base: "128px", md: "148px" }}
            h="46px"
            onClick={() => mediaTab.current.click()}
          >
            Prev
          </Button>
          <Button
            variant="darkBrand"
            fontSize="sm"
            borderRadius="16px"
            w={{ base: "128px", md: "148px" }}
            h="46px"
            onClick={() => redirectToCheckout()}
          >
            Go to Payment
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
