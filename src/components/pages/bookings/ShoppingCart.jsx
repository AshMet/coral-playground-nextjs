/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import {
  Text,
  Box,
  useColorModeValue,
  Avatar,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  IconButton,
  AvatarBadge,
  Spacer,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { IoMdTrash } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";

import Card from "components/card/Card";
import TimelineItem from "components/dataDisplay/TimelineItem";
import { DivingContext } from "contexts/DivingContext";
import * as gtag from "lib/data/gtag";

function CartList(props) {
  const { ...rest } = props;
  const { cartItems } = useContext(DivingContext);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const purpleColor = useColorModeValue("purple.800", "purple.300");

  return (
    <Card {...rest}>
      <Box>
        <Text fontSize="2xl" fontWeight="700" color={textColor} mb="15px">
          Selected Dives
        </Text>
      </Box>
      {cartItems.length > 0 ? (
        cartItems.map((dive) => (
          <TimelineItem
            key={dive.id}
            id={dive.id}
            mb="16px"
            title={dive.title}
            diveCentre={dive.centreName}
            day={new Date(dive.diveDate).toLocaleDateString("en-US", {
              day: "numeric",
            })}
            weekday={new Date(dive.diveDate).toLocaleDateString("en-US", {
              month: "short",
            })}
            hours={new Date(dive.diveTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            confirmed
          />
        ))
      ) : (
        <Text fontSize="md" fontWeight="500" color={purpleColor} my="30px">
          No dives selected. Please add at least one dive to continue
        </Text>
      )}
    </Card>
  );
}

export default function ShoppingCart() {
  const menuBg = useColorModeValue("white", "navy.800");
  const { cartItems } = useContext(DivingContext);
  const router = useRouter();
  // console.log("navbar cartItems", cartItems);
  const { clearCart } = useContext(DivingContext);

  const cartCheckout = () => {
    gtag.event({
      action: "start-cart-checkout",
      category: "button",
      label: "Start Cart Checkout",
      // value:
    });
    router.push("/diving/booking");
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
              size="sm"
              variant="unstyled"
              aria-label="open menu"
              mr="10px"
              icon={
                <Avatar
                  icon={<MdOutlineShoppingCart />}
                  size="sm"
                  color="white"
                  bg="green.600"
                >
                  <AvatarBadge boxSize="1em" bg="green.500" />
                </Avatar>
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
      >
        <Flex flexDirection="column" maxW={{ sm: "sm", md: "lg" }} p="10px">
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
