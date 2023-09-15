/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// Chakra imports
import { Flex, Text, Icon, useColorModeValue, Divider } from "@chakra-ui/react";
// Custom components
// import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";

import Card from "components/card/Card";
// import { getCalendarDives, getDailyDives } from "utils/dive_centre_helpers";
import TripLineItem from "components/dataDisplay/TripLineItem";
import TripSearchBar from "components/fields/TripSearchBar";
import { TripSearchContext } from "contexts/TripSearchContext";

import RegularTrips from "./components/RegularTrips";
import TripsMap from "./components/TripsMap";

export default function TripSidebar({ trips, diveSite, diveCentre, ...rest }) {
  const { dateRange, filterByDateRange } = useContext(TripSearchContext);
  const [filtered, setFiltered] = useState();

  // console.log("trips", trips);
  // console.log("filtered", filtered);
  // console.log("dateRange", dateRange);

  useEffect(() => {
    const dateFiltered = filterByDateRange(trips, dateRange);
    setFiltered(dateFiltered);
  }, [trips, dateRange]);

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
        <TripSearchBar mb="20" w="100%" mt="20px" mx="0px" />
        {filtered?.length > 0 ? (
          filtered?.map((trip) => (
            <Flex
              key={trip.id}
              direction="column"
              justify="space-between"
              align="center"
            >
              <TripLineItem
                trip={trip}
                icon={
                  <Icon as={MdAddCircle} color={textColor} w="20px" h="18px" />
                }
              />
              <Divider my="25px" />
            </Flex>
          ))
        ) : (
          <Text fontSize="md" fontWeight="500" color="textColor" mb="30px">
            No Dive Trips are scheduled for your selected dates. Please modify
            your dates or check back soon, new trips are added regularly
          </Text>
        )}
      </Card>
      <RegularTrips
        trips={trips?.filter((trip) => trip?.startDate === null)}
        diveSite={diveSite}
      />
    </Flex>
  );
}
