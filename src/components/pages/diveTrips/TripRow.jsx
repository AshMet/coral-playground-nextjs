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
import { useContext } from "react";
import { TbCertificate, TbScubaMask } from "react-icons/tb";

import TimeTile from "components/dataDisplay/TimeTile";
import { CartContext } from "contexts/CartContext";

function combineDateAndTime(date, time) {
  const year = date.getFullYear();
  const month = date.getMonth(); // Jan is 0, dec is 11
  const day = date.getDate();
  const hours = time.split(":")[0];
  const minutes = time.split(":")[1];
  return new Date(year, month, day, hours, minutes, 0);
  // const dateString = `${year}-${month}-${day}`;
  // return new Date(`${dateString} ${time}`);
}

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
    endDate,
    // duration,
    price,
    deposit,
    // stripePriceId,
    // checkIn,
  } = trip;

  const { addToCart } = useContext(CartContext);
  const selected = selectedTrip?.id === id;

  // color={useColorModeValue(colorTextLight, colorTextDark)}
  // bgColor={useColorModeValue(bgColorLight, bgColorDark)}
  const colorTextLight = selected ? "purple.600" : "white";
  const bgColorLight = selected ? "gray.300" : "brand.400";
  const colorTextDark = selected ? "purple.600" : "white";
  const bgColorDark = selected ? "gray.300" : "brand.400";
  const tileColor = selected ? "gray.800" : "brand.400";

  // console.log("trip", trip);
  // console.log("selectedTrip", selectedTrip);

  return (
    <Stack
      p={selected ? 6 : 3}
      bgColor={selected ? "purple.600" : "transparent"}
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
      color={selected && "white"}
    >
      <Stack direction="row" justify="center" align="center">
        <TimeTile
          date={new Date(startDate)}
          time={startTime}
          color="white"
          bg={tileColor}
        />
        <Spacer />
        <Text>to</Text>
        <Spacer />
        <TimeTile
          date={new Date(endDate)}
          time={startTime}
          color="white"
          bg={selected ? "gray.800" : "brand.400"}
        />
      </Stack>

      <Stack w={{ sm: "100%", lg: "45%" }} pl="20px">
        <Heading size="md">{name}</Heading>
        <Text color="gray.500" fontSize="xl">
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
            €{deposit / 100}
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
                  startDate: combineDateAndTime(
                    new Date(trip.startDate),
                    trip.startTime
                  ),
                  diveTime: trip.startTime,
                  price: trip.price,
                  priceId: trip.stripePriceId,
                  deposit: trip.depsit,
                })
              : setSelectedTrip(trip)
          }
        >
          {bookable && "Add to Cart"}
          {!bookable && (selected ? "Selected" : "Select this trip")}
        </Button>
      </Stack>
    </Stack>
  );
}
