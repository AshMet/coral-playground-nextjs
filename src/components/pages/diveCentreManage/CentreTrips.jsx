/* eslint-disable react/prop-types */
import { Grid, Text, useColorModeValue } from "@chakra-ui/react";

import SearchTableDiveTrips from "../admin/dive_trips/SearchTableDiveTrips";
import Card from "components/card/Card";
import { getGenericDives } from "utils/dive_centre_helpers";

export default function DiveCentreCalendar({ diveCentre, diveTrips }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const columnsDataTrips = [
    {
      Header: "NAME",
      accessor: "name",
    },
    {
      Header: "DESC",
      accessor: "description",
    },
    {
      Header: "DIVES",
      accessor: "diveCount",
    },
    {
      Header: "START TIME",
      accessor: "startTime",
    },
    {
      Header: "DURATION",
      accessor: "duration",
    },
    {
      Header: "DEPOSIT",
      accessor: "deposit",
    },
    {
      Header: "PRICE",
      accessor: "price",
    },
    {
      Header: "ACTIVE",
      accessor: "active",
    },
    {
      Header: "SITE_ACTIONS",
      accessor: "actions",
    },
  ];

  return (
    <Grid
      pt={5}
      gridTemplateColumns={{ base: "2.4fr 1fr", lg: "0fr 1fr" }}
      display={{ base: "block", lg: "grid" }}
    >
      <Card gridArea="1 / 2 / 2 / 3" minH="680px">
        <Text fontSize="2xl" fontWeight="700" color={textColor}>
          {diveCentre.name} - Price List
        </Text>
        <Text
          fontSize="md"
          fontWeight="500"
          color="secondaryGray.600"
          mb="30px"
        >
          Add all your generic dive packages here.
        </Text>
        <SearchTableDiveTrips
          tableData={getGenericDives(diveTrips)}
          columnsData={columnsDataTrips}
        />
        {/* <EventCalendar
          initialDate={new Date()}
          calendarDives={getCalendarDives(diveTrips)}
        /> */}
      </Card>
    </Grid>
  );
}
