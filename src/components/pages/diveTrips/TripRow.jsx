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
import { PiClockAfternoon, PiCertificate } from "react-icons/pi";
import { TbScubaMask } from "react-icons/tb";

import DateTile from "components/dataDisplay/DateTile";
import { CartContext } from "contexts/CartContext";

export default function TripRow({ trip, checked = false }) {
  const colorTextLight = checked ? "white" : "purple.600";
  const bgColorLight = checked ? "purple.400" : "gray.300";

  const colorTextDark = checked ? "white" : "purple.500";
  const bgColorDark = checked ? "purple.400" : "gray.300";
  const { addToCart } = useContext(CartContext);

  const {
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
    checkIn,
  } = trip;

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

  // console.log("trip", trip);

  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{
        base: "center",
        md: "space-around",
      }}
      direction={{
        base: "column",
        md: "row",
      }}
      alignItems={{ md: "center" }}
    >
      <Stack direction="row" justify="center" align="center">
        <DateTile date={new Date(startDate)} time={startTime} />
        <Spacer />
        <Text>to</Text>
        <Spacer />
        <DateTile date={new Date(endDate)} time={startTime} />
      </Stack>

      <Stack w={{ sm: "100%", lg: "55%" }} pl="20px">
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
          <ListIcon as={PiCertificate} />
          {minCert}
        </ListItem>
        <ListItem>
          <ListIcon as={PiClockAfternoon} />
          {checkIn}
        </ListItem>
      </List>
      <Heading size="xl" w={{ sm: "50%", lg: "10%" }} color="green.500">
        €{price / 100}
      </Heading>
      <Stack w={{ sm: "100%", lg: "15%" }}>
        <Button
          size="md"
          color={useColorModeValue(colorTextLight, colorTextDark)}
          bgColor={useColorModeValue(bgColorLight, bgColorDark)}
          onClick={() =>
            addToCart({
              id: trip.id,
              title: trip.name,
              itemType: "diveTrip",
              centreName: trip.diveCentreName,
              // diveDate: diveDate ? new Date(diveDate) : new Date(value),
              diveDate: combineDateAndTime(
                new Date(trip.startDate),
                trip.startTime
              ),
              diveTime: trip.startTime,
              price: trip.price,
              priceId: trip.stripePriceId,
              deposit: trip.depsit,
            })
          }
        >
          Reserve for €{deposit / 100}
        </Button>
      </Stack>
    </Stack>
  );
}
