/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/prop-types */
import { Button, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import { useContext } from "react";

import { CartContext } from "contexts/CartContext";

function CentreEquipTile({ item }) {
  const { addToCart, removeFromCart, cartItems } = useContext(CartContext);
  const priceColor = useColorModeValue("green.300", "green.500");
  const iconColor = useColorModeValue(
    "",
    "invert(100%) sepia(0%) saturate(2%) hue-rotate(142deg) brightness(105%) contrast(101%)"
  );
  const selectedBgColor = useColorModeValue("brand.400", "brand.400");

  function toggleCartItem(cartItem) {
    cartItems.map((a) => a.id).includes(cartItem.id)
      ? removeFromCart(cartItem) // remove item
      : addToCart(cartItem); // add item
  }
  return (
    <Button
      key={item.id}
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
      bgColor={cartItems.map((a) => a.id).includes(item.id) && selectedBgColor}
      onClick={() =>
        toggleCartItem({
          id: item.id,
          title: item.equipName,
          itemType: "equipment",
          centreName: item.centreName,
          price: item.price,
          priceId: item.stripePriceId,
          deposit: item.price * 0.15,
        })
      }
    >
      <VStack>
        <Image
          src={item?.icon}
          width="100%"
          height="40px"
          borderRadius="15px"
          filter={iconColor}
        />
        <Text mb={0}>{item.equipName}</Text>
        <Text mt="0px" color={priceColor}>
          {item.price === 0 ? "FREE" : `+€${item.price / 100}`}
        </Text>
      </VStack>
    </Button>
  );
}

export default CentreEquipTile;
