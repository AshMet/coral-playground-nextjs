/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable complexity */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable react/prop-types */
import {
  Button,
  Text,
  useColorModeValue,
  Stack,
  Heading,
  List,
  ListIcon,
  ListItem,
  Spacer,
} from "@chakra-ui/react";
// import dayjs from "dayjs";
import { useContext } from "react";
import { TbCertificate, TbScubaMask } from "react-icons/tb";

import TimeTilePicker from "components/dataDisplay/TimeTilePicker";
import { CartContext } from "contexts/CartContext";
import { createDateTimeFromPicker } from "utils/helpers/diveCentresHelper";
// import { createDateTimeFromPicker } from "utils/helpers/diveCentresHelper";

export default function TripRow({
  trip,
  selectedTrip,
  setSelectedTrip,
  bookable,
}) {
  const {
    id,
    name,
    diveCentreName,
    minCert,
    diveCount,
    startDate,
    startTime,
    timezone,
    // endDate,
    duration,
    price,
    // deposit,
    // stripePriceId,
    // checkIn,
  } = trip;

  const { cartItems, addToCart } = useContext(CartContext);
  const selected = selectedTrip?.id === id;
  const isInCart = cartItems.map((a) => a.id).includes(trip.id);

  // color={useColorModeValue(colorTextLight, colorTextDark)}
  // bgColor={useColorModeValue(bgColorLight, bgColorDark)}
  const colorTextLight = selected || isInCart ? "purple.600" : "white";
  const bgColorLight = selected || isInCart ? "gray.300" : "brand.400";
  const colorTextDark = selected || isInCart ? "purple.600" : "white";
  const bgColorDark = selected || isInCart ? "gray.300" : "brand.400";
  const tileColor = selected || isInCart ? "gray.800" : "brand.400";

  // const tripStartDate = createDateTimeFromPicker(
  //   startDate,
  //   startTime,
  //   "Africa/Cairo",
  //   { hours: 0 }
  // );
  // const tripEndDate = createDateTimeFromPicker(
  //   startDate,
  //   startTime,
  //   "Africa/Cairo",
  //   duration
  // );
  // dayjs(startDate).add(dayjs.duration(duration));

  // console.log("trip", trip);
  // console.log("selectedTrip", selectedTrip);

  return (
    <Stack
      p={selected || isInCart ? 6 : 3}
      bgColor={selected || isInCart ? "brand.400" : "transparent"}
      justifyContent={{
        base: "center",
        md: "space-around",
      }}
      direction={{
        base: "column",
        md: "row",
      }}
      alignItems={{ md: "center" }}
      mt={0}
      borderRadius={10}
      color={selected || isInCart ? "white" : ""}
    >
      <Stack direction="row" justify="center" align="center">
        <TimeTilePicker
          date={startDate}
          time={startTime}
          timezone={timezone}
          duration={{ hours: 0 }}
          color="white"
          bg={tileColor}
        />
        <Spacer />
        <Text>to</Text>
        <Spacer />
        <TimeTilePicker
          date={startDate}
          time={startTime}
          timezone={timezone}
          duration={duration}
          color="white"
          bg={selected || isInCart ? "gray.800" : "brand.400"}
        />
      </Stack>

      <Stack w={{ sm: "100%", lg: "45%" }} pl="20px">
        <Heading size="md">{name}</Heading>
        <Text
          color={selected || isInCart ? "gray.300" : "gray.500"}
          fontSize="xl"
        >
          {diveCentreName}
        </Text>
      </Stack>
      <List spacing={3} textAlign="start" w={{ sm: "50%", lg: "20%" }}>
        <ListItem>
          <ListIcon as={TbScubaMask} />
          {diveCount} Dives
        </ListItem>
        <ListItem>
          <ListIcon as={TbCertificate} />
          {minCert}
        </ListItem>
        {/* <ListItem>
          <ListIcon as={PiClockAfternoon} />
          {checkIn}
        </ListItem> */}
      </List>
      <Stack
        w={{ sm: "100%", lg: "20%" }}
        direction={{ sm: "row", lg: "column" }}
      >
        <Text fontSize="sm" color={useColorModeValue("green.400", "green.200")}>
          Deposit:{" "}
          <Text as="span" fontSize="xl" fontWeight="black">
            €{((price * 0.15) / 100).toFixed(2)}
          </Text>
        </Text>
        <Text fontSize="sm">
          Total:{" "}
          <Text as="span" fontSize="xl" fontWeight="black">
            €{price / 100}
          </Text>
        </Text>
      </Stack>
      <Stack w={{ sm: "100%", lg: "15%" }}>
        <Button
          size="md"
          color={useColorModeValue(colorTextLight, colorTextDark)}
          bgColor={useColorModeValue(bgColorLight, bgColorDark)}
          onClick={() =>
            bookable
              ? addToCart({
                  id: trip.id,
                  title: trip.name,
                  itemType: "diveTrip",
                  centreName: trip.diveCentreName,
                  // diveDate: diveDate ? new Date(startDate) : new Date(value),
                  startDate: createDateTimeFromPicker(
                    trip.startDate,
                    trip.startTime
                  ),
                  startTime: trip.startTime,
                  price: trip.price,
                  priceId: trip.stripePriceId,
                  deposit: trip.depsit,
                })
              : setSelectedTrip(trip)
          }
        >
          {bookable && isInCart ? "Added to Cart" : "Add to Cart"}
          {!bookable && (selected ? "Selected" : "Select this trip")}
        </Button>
      </Stack>
    </Stack>
  );
}
