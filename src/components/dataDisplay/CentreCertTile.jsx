/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
// import { Item } from "@supabase/ui/dist/cjs/components/Menu/Menu";
import Image from "next/image";
import { useContext, useMemo, useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";

import { CartContext } from "contexts/CartContext";
import { combineDateAndTime } from "utils/helpers/diveCentresHelper";

function CentreCertTile({ item }) {
  const {
    id,
    certName,
    price,
    stripePriceId,
    startTime,
    centreName,
    coverPhoto,
  } = item || {};
  const { addToCart, cartItems } = useContext(CartContext);
  const priceColor = useColorModeValue("green.300", "green.500");
  const iconColor = useColorModeValue(
    "",
    "invert(100%) sepia(0%) saturate(2%) hue-rotate(142deg) brightness(105%) contrast(101%)"
  );
  const selectedIconColor =
    "invert(100%) sepia(0%) saturate(2%) hue-rotate(142deg) brightness(105%) contrast(101%)";
  const tileColor = useColorModeValue("gray.100", "whiteAlpha.200");
  const selectedBgColor = useColorModeValue("brand.400", "brand.400");

  const [selectedDate, onChange] = useState();
  const { isOpen } = useDisclosure();

  const isInCart = cartItems.map((a) => a.id).includes(item.id);

  // function handleClick(cartItem) {
  //   cartItems.map((a) => a.id).includes(cartItem.id)
  //     ? removeFromCart(cartItem) // remove item
  //     : addToCart(cartItem); // add item
  // }

  const setDate = useMemo(() => {
    return (newDate) => {
      // setStartDate(newDate[0]);
      // setEndDate(newDate[1]);
      onChange(newDate);
      addToCart({
        id,
        title: certName,
        itemType: "certification",
        centreName,
        startDate: combineDateAndTime(newDate, startTime),
        startTime,
        price,
        priceId: stripePriceId,
        deposit: price * 0.15,
      });
    };
  }, []);

  return (
    <Box
      key={item.id}
      borderRadius="15px"
      display="flex"
      p={3}
      mb={3}
      justifyContent="center"
      minH="180px"
      _hover={{
        boxShadow: "0.1em 0.1em 3em rgba(0,0,0,0.3)",
        zIndex: 10,
        transform: "scale(1.2)",
      }}
      // _hover={{
      //   // background: "brand.300",
      //   // color: "white",
      //   filter: iconColor,
      // }}
      bgColor={isInCart ? selectedBgColor : tileColor}
      // onClick={
      //   cartItems.map((a) => a.id).includes(item.id)
      //     ? removeFromCart(item)
      //     : onToggle
      // }
    >
      <VStack>
        <Image
          src={
            "/svg/certifications/padi_logo.svg" ||
            coverPhoto ||
            "https://stzgaygfnnszcvhmnbqy.supabase.co/storage/v1/object/public/cover-photos/certifications/open-water-diver.png"
          }
          width="150px"
          height="50px"
          // borderRadius="15px"
          style={{
            filter: isInCart ? selectedIconColor : iconColor,
          }}
        />
        <Text mb={0} color={isInCart && "white"} fontWeight="bold">
          {item.certName}
        </Text>
        <Flex align="center">
          <DatePicker
            onChange={setDate}
            value={selectedDate}
            format="dd MMM y"
            minDate={new Date()}
            clearIcon={null}
            calendarIcon={null}
            // tileClassName={({ date, view }) =>
            //   getTileColor({ date, view }, tripRules)
            // }
            // tileDisabled={({ date }) => getDisabledTiles({ date }, tripRules)}
            isOpen={isOpen}
          />
          {/* <Text
            ml="5px"
            color={isInCart && "white"}
            fontSize="md"
            me="6px"
            fontWeight="500"
          >{`@ ${startTime?.split(":")[0]}:${startTime?.split(":")[1]}`}</Text> */}
        </Flex>
        <Text
          fontSize="2xl"
          fontWeight="900"
          mt="0px"
          color={isInCart ? "green.200" : priceColor}
        >
          {item.price === 0 ? "FREE" : `€${item.price / 100}`}
        </Text>
      </VStack>
    </Box>
  );
}

export default CentreCertTile;
