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
  const selectedIconColor =
    "invert(100%) sepia(0%) saturate(2%) hue-rotate(142deg) brightness(105%) contrast(101%)";
  const selectedBgColor = useColorModeValue("brand.400", "brand.400");
  const isInCart = cartItems.map((a) => a.id).includes(item.id);

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
        boxShadow: "0.1em 0.1em 3em rgba(0,0,0,0.3)",
        zIndex: 10,
        transform: "scale(1.05)",
      }}
      bgColor={isInCart && selectedBgColor}
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
          width="100px"
          height="40px"
          borderRadius="15px"
          style={{
            filter: isInCart ? selectedIconColor : iconColor,
          }}
        />
        <Text mb={0}>{item.equipName}</Text>
        <Text
          fontSize="2xl"
          fontWeight="900"
          mt="0px"
          color={isInCart ? "green.200" : priceColor}
        >
          {item.price === 0 ? "FREE" : `+€${item.price / 100}`}
        </Text>
      </VStack>
    </Button>
  );
}

export default CentreEquipTile;
