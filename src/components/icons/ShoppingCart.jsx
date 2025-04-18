/* eslint-disable react/prop-types */
import {
  Text,
  Box,
  useColorModeValue,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { usePostHog } from "posthog-js/react";
import { useContext } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";

import Card from "components/card/Card";
import CartRow from "components/shoppingCart/CartRow";
import { CartContext } from "contexts/CartContext";
// import * as gtag from "lib/data/gtag";

function CartList(props) {
  const { ...rest } = props;
  const { cartItems } = useContext(CartContext);
  const menuBg = useColorModeValue("gray.100", "gray.800");

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Card
      {...rest}
      overflowY="auto"
      minW={{ md: "400px" }}
      maxH="350px"
      scrollBehavior="auto"
      bg={menuBg}
      w="100%"
    >
      <Box>
        <Text fontSize="lg" fontWeight="700" color={textColor} mb="15px">
          Shopping Cart
        </Text>
      </Box>
      {cartItems.length > 0 ? (
        cartItems.map((dive) => <CartRow key={dive.id} item={dive} />)
      ) : (
        <Flex align="center">
          <Icon
            color="brand.100"
            me="8px"
            as={BsExclamationCircle}
            w="20px"
            h="20px"
          />
          <Text color="brand.100" fontSize="lg" me="6px" fontWeight="500">
            No dives selected. <br /> Please add at least one dive or course to
            continue
          </Text>
        </Flex>
      )}
    </Card>
  );
}

export default function ShoppingCart() {
  const menuBg = useColorModeValue("gray.100", "gray.800");
  const { cartItems } = useContext(CartContext);
  const router = useRouter();
  const posthog = usePostHog();
  // console.log("navbar cartItems", cartItems);
  const { clearCart } = useContext(CartContext);
  const iconBgColor = useColorModeValue("purple.200", "brand.400");

  const cartCheckout = () => {
    // gtag.event({
    //   action: "start-cart-checkout",
    //   category: "button",
    //   label: "Start Cart Checkout",
    //   // value:
    // });
    posthog.capture("Cart Checkout");
    router.push("/booking");
  };

  return (
    <Menu>
      <Tooltip label="Shopping Cart">
        <MenuButton display="flex" alignItems="center" p="0px">
          {cartItems.length === 0 ? (
            <Icon
              mt="6px"
              as={MdOutlineShoppingCart}
              w="18px"
              h="18px"
              me="10px"
            />
          ) : (
            <IconButton
              aria-label="label"
              isRound
              size="md"
              mr={3}
              bg={iconBgColor}
              icon={
                <>
                  <MdOutlineShoppingCart />
                  <Box
                    as="span"
                    pos="absolute"
                    top="5px"
                    right="5px"
                    px={2}
                    py={1}
                    fontSize="xs"
                    fontWeight="bold"
                    lineHeight="none"
                    color="red.100"
                    transform="translate(50%,-50%)"
                    bg="brand.100"
                    rounded="full"
                  >
                    {cartItems.length}
                  </Box>
                </>
              }
            />
          )}
        </MenuButton>
      </Tooltip>
      <MenuList
        boxShadow="dark-lg"
        p="0px"
        mt="10px"
        borderRadius="20px"
        bg={menuBg}
        border="none"
        mr="10px"
      >
        <Flex flexDirection="column" p="10px">
          <CartList />
        </Flex>
        {cartItems.length !== 0 && (
          <Flex w="100%" p="10px" mb="0px" borderTop="1px solid gray">
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              borderRadius="8px"
              alignItems="end"
              px="14px"
            >
              <Button
                onClick={() => clearCart()}
                variant="link"
                colorScheme="red"
                size="sm"
                mr={4}
                leftIcon={<IoMdTrash w="22px" h="22px" me="0px" ml="5" />}
              >
                Clear Cart
              </Button>
              <Spacer />
              <Button
                onClick={() => cartCheckout()}
                variant="link"
                colorScheme="green"
                size="sm"
                mr={4}
                leftIcon={
                  <MdOutlineShoppingCart w="22px" h="22px" me="0px" ml="5" />
                }
              >
                Checkout
              </Button>
            </MenuItem>
          </Flex>
        )}
      </MenuList>
    </Menu>
  );
}
