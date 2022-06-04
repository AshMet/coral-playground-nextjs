/* eslint-disable react/prop-types */
import { Card, Box, Table, Thead, Tbody, Th, Tr, Text } from "@chakra-ui/react";

import TripTableRow from "./TripTableRow";

function UpcomingTrips(props) {
  const { diveSiteName, diveSiteImg } = props;

  return (
    <Card mt="25px">
      <Box w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Text color="purple.400" fonSize="md" fontWeight="bold" mb="8px">
          Upcoming Dive Trips
        </Text>
        <Table variant="simple" w="100%">
          <Thead>
            <Tr>
              <Th color="gray.400" fontSize="xs">
                Dive Centre
              </Th>
              <Th color="gray.400" fontSize="xs">
                # of Dives
              </Th>
              <Th color="gray.400" fontSize="xs">
                Date
              </Th>
              <Th color="gray.400" fontSize="xs">
                Capacity
              </Th>
              <Th color="gray.400" fontSize="xs">
                Price
              </Th>
              <Th color="gray.400" fontSize="xs">
                Booking
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <TripTableRow
              diveSiteName={diveSiteName}
              diveSiteImg={diveSiteImg}
              diveCentreName="Sinai Divers"
              numberOfDives="3"
              diveDays="Every Day"
              divePrice="200"
            />
            <TripTableRow
              diveSiteName={diveSiteName}
              diveSiteImg={diveSiteImg}
              diveCentreName="Hurghada Dive Club"
              numberOfDives="1"
              diveDays="Weekdays"
              divePrice="300"
            />
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}

export default UpcomingTrips;
