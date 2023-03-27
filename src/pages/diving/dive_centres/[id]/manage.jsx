/* eslint-disable react/prop-types */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___  
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \ 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/ 
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, Grid, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { supabase } from "../../../api/index";
import EventCalendar from "components/calendar/EventCalendar";
import Timeline from "components/calendar/Timeline";
import Card from "components/card/Card";
import DivingLayout from "layouts/DivingLayout";
// import { calendarData } from "utils/variables/calendar";

export default function DiveCentreCalendar({ diveCentre, diveTrips }) {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  function combineDateAndTime(date, time, duration = 0) {
    const formattedDate = new Date(date);
    // console.log("date", formattedDate);
    const year = formattedDate.getFullYear();
    const month = formattedDate.getMonth(); // Jan is 0, dec is 11
    const day = formattedDate.getDate();
    const hours = Number(time.split(":")[0]) + duration;
    const minutes = time.split(":")[1];
    return new Date(year, month, day, hours, minutes, 0);
  }

  const dailyDives = diveTrips
    .filter((trip) => trip.start_date === null)
    .map((trip) => ({
      id: trip.id,
      name: trip.name,
      visible: trip.visible,
      start_time: trip.start_time,
      borderColor: "transparent",
      backgroundColor: "#7551FF",
      className: "info",
    }));
  const calendarDives = diveTrips
    .filter((trip) => trip.start_date !== null)
    .map((trip) => ({
      title: trip.name,
      borderColor: "transparent",
      start: combineDateAndTime(trip.start_date, trip.start_time, 0),
      // start_time: trip.start_time,
      end: combineDateAndTime(trip.start_date, trip.start_time, trip.duration),
      // endTime: combineDateAndTime(trip.start_date, trip.start_time, 8),
      allDay: false,
      backgroundColor: "#7551FF",
      className: "info",
    }));
  // console.log("trip: ", diveTrips[1].start_date);
  // console.log("trip: ", combineDateAndTime(diveTrips[1].start_date, diveTrips[1].start_time, 12));
  // console.log("diveCentre", diveCentre);
  // console.log("diveTrips", diveTrips);

  return (
    <Grid
      pt={{ base: "130px", md: "80px", xl: "80px" }}
      gridTemplateColumns={{ base: "2.4fr 1fr", lg: "1fr 1.83fr" }}
      gap={{ base: "20px", xl: "20px" }}
      display={{ base: "block", lg: "grid" }}
    >
      <Box gridArea="1 / 1 / 2 / 2">
        <Timeline dailyDives={dailyDives} mb="20px" />
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
        <EventCalendar initialDate={new Date()} calendarDives={calendarDives} />
      </Card>
    </Grid>
  );
}

export const getServerSideProps = async ({ params: { id } }) => {
  const { data: diveCentre } = await supabase
    .from("dive_centres_view")
    .select(
      `id, name, description, address, latitude, longitude, paymentMethods, equipment, services, languages, memberships,
      coverPhotoUrl, city, country`
    )
    .match({ id })
    .single();

  // Get dive trips with the current dive centre
  const { data: diveTrips } = await supabase
    .from("dive_trips")
    .select(
      `id, name, description, notes, min_cert, status, price, pay_now,
          stripe_price_id, start_date, start_time, check_in, created_at, updated_at,
          dive_sites:trip_sites!dive_trip_id(
            dive_site:dive_site_id(id, name, latitude, longitude))
      `
    )
    .eq("dive_centre_id", id);
  // .order("updated_at", { ascending: true });

  return {
    props: {
      diveCentre,
      diveTrips,
    },
  };
};

DiveCentreCalendar.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
