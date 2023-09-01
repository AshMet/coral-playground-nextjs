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
import { PiClockAfternoon, PiCertificate } from "react-icons/pi";
import { TbScubaMask } from "react-icons/tb";

import DateTile from "components/dataDisplay/DateTile";

export default function TripRow({ trip, selectedTrip, setSelectedTrip }) {
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
    checkIn,
  } = trip;

  const selected = selectedTrip.id === id;

  // color={useColorModeValue(colorTextLight, colorTextDark)}
  // bgColor={useColorModeValue(bgColorLight, bgColorDark)}
  const colorTextLight = selected ? "white" : "purple.600";
  const bgColorLight = selected ? "purple.400" : "gray.300";
  const colorTextDark = selected ? "white" : "purple.500";
  const bgColorDark = selected ? "purple.400" : "gray.300";

  // console.log("trip", trip);
  // console.log("selectedTrip", selectedTrip);

  return (
    <Stack
      p={3}
      py={3}
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
    >
      <Stack direction="row" justify="center" align="center">
        <DateTile date={new Date(startDate)} time={startTime} />
        <Spacer />
        <Text>to</Text>
        <Spacer />
        <DateTile date={new Date(endDate)} time={startTime} />
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
          <ListIcon as={PiCertificate} />
          {minCert}
        </ListItem>
        <ListItem>
          <ListIcon as={PiClockAfternoon} />
          {checkIn}
        </ListItem>
      </List>
      <Stack
        w={{ sm: "100%", lg: "20%" }}
        direction={{ sm: "row", lg: "column" }}
      >
        <Text fontSize="sm">
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
          onClick={() => setSelectedTrip(trip)}
        >
          {selected ? "Selected" : "Select this trip"}
        </Button>
      </Stack>
    </Stack>
  );
}
