/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import {
  Box,
  Divider,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

import TripRow from "./TripRow";

export default function Upcoming({ diveTrips, selectedTrip, setSelectedTrip }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Box py={6} px={5} width="full">
      <Stack spacing={4} width="100%" direction="column">
        <Stack
          p={5}
          alignItems="center"
          justifyContent={{
            base: "flex-start",
            md: "space-around",
          }}
          direction={{
            base: "column",
            md: "row",
          }}
        >
          <Stack
            width={{
              base: "100%",
              md: "40%",
            }}
            textAlign="center"
          >
            <Heading size="lg">
              <Text color="purple.400">
                Upcoming{" "}
                <Text as="span" color={textColor}>
                  Dive Trips
                </Text>
              </Text>
            </Heading>
          </Stack>
          <Stack
            width={{
              base: "100%",
              md: "60%",
            }}
          >
            <Text textAlign="center">
              Reserve your trip below. The remainder will be payable directly to
              the dive center.
            </Text>
          </Stack>
        </Stack>
        <Divider />
        {diveTrips && diveTrips.length > 0 ? (
          diveTrips
            ?.filter((trip) => trip?.startDate !== null)
            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
            .map((trip) => {
              return (
                <React.Fragment key={trip.id}>
                  <TripRow
                    trip={trip}
                    selectedTrip={selectedTrip}
                    setSelectedTrip={setSelectedTrip}
                    selected={selectedTrip === trip.id}
                  />
                  <Divider />
                </React.Fragment>
              );
            })
        ) : (
          <Text textAlign="center">No upcoming trips found.</Text>
        )}
      </Stack>
    </Box>
  );
}
