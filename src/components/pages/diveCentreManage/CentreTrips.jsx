/* eslint-disable react/prop-types */
import { Box, Grid, Text, useColorModeValue } from "@chakra-ui/react";

import Card from "components/card/Card";
import EventCalendar from "components/pages/diveCentreManage/EventCalendar";
import Timeline from "components/pages/diveCentreManage/Timeline";
import { getCalendarDives, getDailyDives } from "utils/dive_centre_helpers";

export default function DiveCentreCalendar({ diveCentre, diveTrips }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Grid
      pt={5}
      gridTemplateColumns={{ base: "2.4fr 1fr", lg: "0fr 1fr" }}
      gap={{ base: "20px", xl: "20px" }}
      display={{ base: "block", lg: "grid" }}
    >
      <Box gridArea="1 / 1 / 2 / 2">
        <Timeline dailyDives={getDailyDives(diveTrips)} mb="20px" />
      </Box>
      <Card gridArea="1 / 2 / 2 / 3" minH="680px">
        <Text fontSize="2xl" fontWeight="700" color={textColor}>
          {diveCentre.name} - Dive Calendar
        </Text>
        <Text
          fontSize="md"
          fontWeight="500"
          color="secondaryGray.600"
          mb="30px"
        >
          Add your non-daily trips to your calendar{" "}
        </Text>
        <EventCalendar
          initialDate={new Date()}
          calendarDives={getCalendarDives(diveTrips)}
        />
      </Card>
    </Grid>
  );
}
