/* eslint-disable react/prop-types */
import {
  Button,
  Flex,
  Icon,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import { useContext } from "react";
// Custom components
import { MdAddCircle } from "react-icons/md";

import IconBox from "components/icons/IconBox";
import { CartContext } from "contexts/CartContext";

export default function EquipLineItem(props) {
  const { item, ...rest } = props;
  const {
    id,
    // centreId,
    centreName,
    // equipId,
    equipName,
    stripePriceId,
    price,
    icon,
  } = item || {};
  const { addToCart } = useContext(CartContext);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconBoxBg = "secondaryGray.300";
  return (
    <Flex justifyContent="center" alignItems="center" w="100%" {...rest}>
      <IconBox
        h="42px"
        w="42px"
        bg={iconBoxBg}
        me="20px"
        icon={
          <Image
            src={icon}
            height="30px"
            width="30px"
            // filter="invert(100%) sepia(0%) saturate(7500%) hue-rotate(70deg) brightness(99%) contrast(107%)"
          />
        }
      />
      <Flex direction="column" align="start" me="auto">
        <Text color={textColor} fontSize="md" me="6px" fontWeight="700">
          {equipName}
        </Text>
        {/* <Text color="secondaryGray.600" fontSize="sm" fontWeight="500">
          {subtitle}
        </Text> */}
      </Flex>
      <Text
        ms="auto"
        color="green.500"
        fontSize="lg"
        me="10px"
        fontWeight="700"
      >
        €{price / 100}
      </Text>
      <Tooltip label="Add to Cart">
        <Button
          align="center"
          justifyContent="center"
          // bg="brand.100"
          colorScheme="brand"
          w="37px"
          h="37px"
          mt="10px"
          lineHeight="100%"
          borderRadius="10px"
          onClick={() =>
            addToCart({
              id,
              title: equipName,
              itemType: "equipment",
              centreName,
              price,
              priceId: stripePriceId,
              deposit: price * 0.15,
            })
          }
          {...rest}
        >
          <Icon as={MdAddCircle} color="white" w="24px" h="24px" />
        </Button>
      </Tooltip>
    </Flex>
  );
}
