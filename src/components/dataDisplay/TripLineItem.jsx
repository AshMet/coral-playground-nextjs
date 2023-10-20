/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// Chakra imports
import {
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
// Custom components
import { useContext, useMemo, useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoMdTime } from "react-icons/io";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";

import { CartContext } from "contexts/CartContext";
import {
  combineDateAndTime,
  getTileColor,
  getDisabledTiles,
} from "utils/helpers/diveCentresHelper";

import TimeTile from "./TimeTile";

export default function TripLineItem(props) {
  const { trip, tripRules, type, icon, ...rest } = props;
  const { id, name, price, stripePriceId, deposit, startTime, centreName } =
    trip || {};

  const priceColor = useColorModeValue("green.500", "green.200");
  const selectedBgColor = useColorModeValue("brand.400", "brand.400");

  const [selectedDate, onChange] = useState();
  const { isOpen, onToggle } = useDisclosure();
  const { cartItems, addToCart } = useContext(CartContext);

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

  const siteNames =
    name || trip.diveSites?.map((site) => site.name).join(" + ");

  // console.log("selectedDate", selectedDate);
  // console.log("selectedDate", selectedDate);
  // console.log("SiteTripLineItem trip", trip);

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
      <Box onClick={onToggle}>
        <TimeTile
          date={new Date(selectedDate)}
          time={startTime}
          color={isInCart ? "brand.400" : "white"}
          bg={isInCart ? "white" : "brand.400"}
        />
      </Box>
      <Flex direction="column" align="start" me="auto" w="100%" ml="10px">
        <Flex direction="row" align="stretch" me="auto">
          <Flex align="center">
            <Icon
              me="8px"
              as={HiOutlineLocationMarker}
              w="16px"
              h="16px"
              color={isInCart && "white"}
            />
            <Text
              color={isInCart && "white"}
              fontSize="md"
              me="6px"
              fontWeight="700"
            >
              {siteNames}
            </Text>
          </Flex>
        </Flex>

        <Flex align="center">
          <Icon
            me="8px"
            as={IoStorefrontOutline}
            w="16px"
            h="16px"
            color={isInCart && "white"}
          />
          <Text
            color={isInCart && "white"}
            fontSize="md"
            me="6px"
            fontWeight="500"
          >
            {type === "diveSite" && centreName}
            <Badge colorScheme="green" size="sm" padding={1} ml={2}>
              {tripRules?.length} Dates
            </Badge>
          </Text>
        </Flex>

        <Flex align="center">
          <Icon
            me="8px"
            as={IoMdTime}
            w="16px"
            h="16px"
            color={isInCart && "white"}
          />
          <Flex align="center">
            <DatePicker
              onChange={setDate}
              value={selectedDate}
              format="dd MMM y"
              minDate={new Date()}
              clearIcon={null}
              calendarIcon={null}
              tileClassName={({ date, view }) =>
                getTileColor({ date, view }, tripRules)
              }
              tileDisabled={({ date }) => getDisabledTiles({ date }, tripRules)}
              isOpen={isOpen}
            />
          </Flex>
          <Text
            ml="5px"
            color={isInCart && "white"}
            fontSize="md"
            me="6px"
            fontWeight="500"
          >{`@ ${startTime?.split(":")[0]}:${startTime?.split(":")[1]}`}</Text>
        </Flex>
      </Flex>

      <Flex direction="column">
        <Text
          fontSize="2xl"
          fontWeight="900"
          mt="0px"
          color={isInCart ? "green.200" : priceColor}
        >
          {trip.price === 0 ? "FREE" : `€${trip.price / 100}`}
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
                title: name,
                itemType: "diveTrip",
                centreName,
                startDate: combineDateAndTime(selectedDate, startTime),
                diveTime: startTime,
                price,
                priceId: stripePriceId,
                deposit,
              })
            }
            {...rest}
          >
            <Icon as={MdAddCircle} color="white" w="24px" h="24px" />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
