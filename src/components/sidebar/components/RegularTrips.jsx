/* eslint-disable react/prop-types */
import { Divider, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { MdAddCircle } from "react-icons/md";

import Card from "components/card/Card";
import TripLineItem from "components/dataDisplay/TripLineItem";

export default function RegularTrips(props) {
  const { trips, diveSite } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card mt={5}>
      <Text color={textColor} fontSize="2xl" fontWeight="700" mb="20px">
        Regular Trips
      </Text>
      {trips.length > 0 ? (
        trips
          .filter((trip) => trip.start_date === null)
          .map((trip) => (
            <Flex
              key={trip.id}
              direction="column"
              justify="space-between"
              align="center"
            >
              <TripLineItem
                trip={diveSite ? trip.dive_trip : trip}
                icon={
                  <Icon as={MdAddCircle} color={textColor} w="20px" h="18px" />
                }
              />
              <Divider my="25px" />
            </Flex>
          ))
      ) : (
        <Text fontSize="md" fontWeight="500" color="brand.400" mb="30px">
          No Dives scheduled. Check back soon, new dives are added regularly
        </Text>
      )}
    </Card>
  );
}
