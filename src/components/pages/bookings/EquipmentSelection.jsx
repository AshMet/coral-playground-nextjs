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
import { useContext } from "react";

import { DivingContext } from "../../../contexts/DivingContext";
import Image from "components/actions/NextChakraImg";
import Card from "components/card/Card";
// import checkout from "components/pages/diving/checkout";
import equipment from "lib/constants/equipment.json";

export default function EquipmentSelection(props) {
  const { mediaTab } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const priceColor = useColorModeValue("green.300", "green.500");
  const iconColor = useColorModeValue(
    "",
    "invert(100%) sepia(0%) saturate(2%) hue-rotate(142deg) brightness(105%) contrast(101%)"
  );
  const selectedBgColor = useColorModeValue("brand.400", "brand.400");
  // const [equipmentList, setEquipmentList] = useState([]);

  const { equipmentList, setEquipmentList, redirectToCheckout } =
    useContext(DivingContext);

  // const getProductId = (n) => {
  //   switch (n) {
  //     case 1:
  //       return "prod_Lt7hO6IqEZT5Fb";
  //     case 2:
  //       return "prod_Lt7cRX9OGqgQDz";
  //     case 3:
  //       return "prod_MHU0OAktSpIMur";
  //     default:
  //       return "prod_Lt7hO6IqEZT5Fb";
  //   }
  // };

  const freeEquipment = equipment.filter((item) => item.price === 0);
  const PaidEquipment = equipment.filter((item) => item.price !== 0);

  const equipLineItems = PaidEquipment?.map((item) => ({
    id: item.id,
    title: item.name,
    siteCount: 1,
    centreName: "",
    diveDate: "",
    diveTime: "",
    price: item.price,
    priceId: item.priceId,
  }));

  function toggleArrayItem(arr, item) {
    arr.includes(item)
      ? setEquipmentList(arr.filter((i) => i !== item)) // remove item
      : setEquipmentList([...arr, item]); // add item
  }
  console.log(equipLineItems);
  console.log(equipmentList);
  console.log("freeEquipment", freeEquipment);

  return (
    <Card p="30px">
      <Text color={textColor} fontSize="2xl" fontWeight="700" mb="20px">
        Equipment
      </Text>
      <Text color="grey.500" fontSize="md" fontWeight="500" mb="20px">
        Select any specialized eqiupment you would like to add to your trip
      </Text>
      <Flex direction="column" w="100%">
        <Flex wrap="wrap">
          <SimpleGrid columns={{ sm: 2, md: 5 }} gap="20px" w="100%">
            {equipLineItems?.map((item) => (
              <Button
                key={item.title}
                borderRadius="15px"
                display="flex"
                p={3}
                mb={3}
                justifyContent="center"
                minH="130px"
                _hover={{
                  background: "brand.300",
                  color: "white",
                  filter: iconColor,
                }}
                bgColor={
                  equipmentList.map((a) => a.id).includes(item.id) &&
                  selectedBgColor
                }
                onClick={() => toggleArrayItem(equipmentList, item)}
              >
                <VStack>
                  <Image
                    src={`/svg/equipment/${item.title
                      .toLowerCase()
                      .replaceAll(" ", "-")}.svg`}
                    width="100%"
                    height="40px"
                    borderRadius="15px"
                    filter={iconColor}
                  />
                  <Text mb={0}>{item.title}</Text>
                  <Text mt="0px" color={priceColor}>
                    {item.price === 0 ? "FREE" : `+€${item.price / 100}`}
                  </Text>
                </VStack>
              </Button>
            ))}
          </SimpleGrid>
          <Card background="grey.500">
            <Text color="green.500" fontSize="md" fontWeight="500" mb="20px">
              Note that the following equipment is included for free on every
              dive trip as needed
            </Text>
            <SimpleGrid columns={{ sm: 3, md: 5 }} gap="20px" w="100%">
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
