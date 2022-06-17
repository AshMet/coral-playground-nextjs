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

// Custom components
import Image from "components/actions/NextChakraImg";
import Card from "components/card/Card";
import checkout from "components/pages/activities/checkout";

export default function EquipmentSelection(props) {
  const { mediaTab, dives } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const equipment = [
    "Air Tank",
    "Camera",
    "Drysuit",
    "Fins",
    "Flashlights",
    "Snorkel",
    "Long Wetsuit",
    "Short Wetsuit",
  ];

  const lineItems = dives.map((dive) => {
    return {
      price: dive.priceId, // eg: "price_1KuasdfaWasdfasdfasfnsF4fi",
      quantity: 1,
    };
  });

  const metadata = {
    diver_name: "diverName",
    dive_date: "diveDate",
    dive_time: "diveTime",
    cert: "certLevel",
  };

  console.log(lineItems);

  const redirectToCheckout = async () => {
    checkout({ lineItems, metadata });
  };

  return (
    <Card p="30px">
      <Text color={textColor} fontSize="2xl" fontWeight="700" mb="20px">
        Equipment
      </Text>
      <Flex direction="column" w="100%">
        <Flex wrap="wrap">
          <SimpleGrid columns={{ sm: 2, md: 4 }} spacing="40px" w="100%">
            {equipment?.map((item) => (
              <Button
                colorScheme="purple"
                borderRadius="15px"
                display="flex"
                p={3}
                mb={3}
                justifyContent="center"
                minH="100px"
              >
                <VStack>
                  <Image
                    src={`/svg/equipment/${item
                      .toLowerCase()
                      .replaceAll(" ", "_")}.svg`}
                    width="100%"
                    height="40px"
                    borderRadius="15px"
                  />
                  <Text>{item}</Text>
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
