/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// Chakra imports
import { Flex, Text, Icon, useColorModeValue } from "@chakra-ui/react";
// Custom components
// import Link from "next/link";
import { MdAddCircle } from "react-icons/md";

import Card from "components/card/Card";
// import { getCalendarDives, getDailyDives } from "utils/dive_centre_helpers";

import RegularTrips from "./components/RegularTrips";
import SpecialTrips from "./components/SpecialTrips";
import TripsMap from "./components/TripsMap";

export default function TripSidebar({ trips, diveSite, diveCentre, ...rest }) {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorTertiary = useColorModeValue(
    "secondaryGray.700",
    "secondaryGray.500"
  );

  // console.log("sidebar trips", trips);

  return (
    <Flex direction="column">
      <Card {...rest} maxH="max-content">
        <Text color={textColor} fontSize="xl" fontWeight="700" mb="5px">
          Upcoming Dive Trips
        </Text>
        <Text color={textColorTertiary} fontSize="md" mb="16px">
          Add a dive to your cart by selecting your preferred date and clicking
          the <Icon as={MdAddCircle} color="brand.400" w="16px" h="16px" />{" "}
          button
        </Text>
        <TripsMap trips={trips} diveSite={diveSite} diveCentre={diveCentre} />
      </Card>
      <SpecialTrips
        trips={trips?.filter((trip) => trip?.start_date === null)}
        diveSite={diveSite}
      />
      <RegularTrips
        trips={trips?.filter((trip) => trip?.start_date !== null)}
        diveSite={diveSite}
      />
    </Flex>
  );
}
