// Not currently used

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// Chakra imports
import {
  Flex,
  Icon,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
// Custom components
import { useContext, useMemo, useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoMdTime } from "react-icons/io";

import { CartContext } from "contexts/CartContext";
import { combineDateAndTime } from "utils/helpers/diveCentresHelper";

export default function GenericTripLineItem(props) {
  const { trip, tripRules, type, icon, ...rest } = props;
  const { id, name, price, stripePriceId, startTime, centreName } = trip || {};
  const { addToCart, cartItems } = useContext(CartContext);

  const priceColor = useColorModeValue("green.500", "green.200");
  // const bgHover = useColorModeValue("brand.100", "brand.100");
  // const bgFocus = useColorModeValue("brand.200", "brand.200");

  const [selectedDate, onChange] = useState();
  const { isOpen } = useDisclosure();

  // const selectedIconColor =
  //   "invert(100%) sepia(0%) saturate(2%) hue-rotate(142deg) brightness(105%) contrast(101%)";
  // const tileColor = useColorModeValue("gray.100", "whiteAlpha.200");
  const selectedBgColor = useColorModeValue("brand.400", "brand.400");
  const isInCart = cartItems.map((a) => a.id).includes(trip.id);

  const setDate = useMemo(() => {
    return (newDate) => {
      // setStartDate(newDate[0]);
      // setEndDate(newDate[1]);
      onChange(newDate);
      addToCart({
        id,
        title: name,
        itemType: "diveTrip",
        centreName,
        startDate: combineDateAndTime(newDate, startTime),
        diveTime: startTime,
        price,
        priceId: stripePriceId,
        deposit: price * 0.15,
      });
    };
  }, []);
  // console.log("selectedDate", selectedDate);
  // console.log("selectedDate", selectedDate);
  // console.log("certLinetem", centreCert);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      w="100%"
      borderRadius={10}
      bgColor={isInCart ? selectedBgColor : ""}
      my={isInCart ? "-20px" : ""}
      py={isInCart ? "20px" : ""}
      px={isInCart ? "10px" : ""}
      _hover={{
        boxShadow: "0.1em 0.1em 3em rgba(0,0,0,0.3)",
        zIndex: 10,
        transform: "scale(1.05)",
        my: isInCart ? "" : "-20px",
        py: isInCart ? "" : "20px",
        px: isInCart ? "" : "10px",
      }}
      {...rest}
    >
      {/* <Box onClick={onToggle}>
        <TimeTile
          date={new Date(selectedDate)}
          time={startTime}
          color="white"
          bg="brand.400"
        />
      </Box>
      <Spacer /> */}
      <Flex direction="column" align="start" me="auto" w="100%" ml="10px">
        <Flex direction="row" align="stretch" me="auto">
          <Flex align="center">
            <Icon me="8px" as={HiOutlineLocationMarker} w="16px" h="16px" />
            <Text
              color={isInCart && "white"}
              fontSize="md"
              me="6px"
              fontWeight="700"
            >
              {name}
            </Text>
          </Flex>
        </Flex>

        <Flex align="center">
          <Icon me="8px" as={IoMdTime} w="16px" h="16px" />
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
          </Flex>
          <Text
            ml="5px"
            color={isInCart && "white"}
            fontSize="md"
            me="6px"
            fontWeight="500"
          >
            {startTime &&
              `@ ${startTime.split(":")[0]}:${startTime.split(":")[1]}`}
          </Text>
        </Flex>
      </Flex>
      <Spacer />
      <Flex direction="column">
        <Text
          fontSize="2xl"
          fontWeight="900"
          mt="0px"
          color={isInCart ? "green.200" : priceColor}
        >
          {trip.price === 0 ? "FREE" : `€${trip.price / 100}`}
        </Text>
        {/* <Tooltip label="Add to Cart">
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
                title: certName,
                itemType: "certification",
                centreName,
                startDate: combineDateAndTime(selectedDate, startTime),
                diveTime: startTime,
                price,
                priceId: stripePriceId,
                deposit: price * 0.15,
              })
            }
            {...rest}
          >
            <Icon as={MdAddCircle} color="white" w="24px" h="24px" />
          </Button>
        </Tooltip> */}
      </Flex>
    </Flex>
  );
}
