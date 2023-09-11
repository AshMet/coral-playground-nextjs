// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react/prop-types */
// /*!
//   _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___
//  | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \
//  | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
//  |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
//  |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/

// =========================================================
// * Horizon UI Dashboard PRO - v1.0.0
// =========================================================

// * Product Page: https://www.horizon-ui.com/pro/
// * Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

// * Designed and Coded by Simmmple

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */

// // Chakra imports
// import { Box, Grid, Text, useColorModeValue } from "@chakra-ui/react";
// import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
// import { usePostHog } from "posthog-js/react";
// import { useEffect } from "react";

// import Card from "components/card/Card";
// import EventCalendar from "components/pages/diveCentreManage/EventCalendar";
// import Timeline from "components/pages/diveCentreManage/Timeline";
// import DivingLayout from "layouts/DivingLayout";
// import { getCalendarDives, getDailyDives } from "utils/dive_centre_helpers";
// // import { calendarData } from "utils/variables/calendar";

// export default function DiveCentreCalendar({ diveCentre, diveTrips }) {
//   const posthog = usePostHog();
//   const textColor = useColorModeValue("secondaryGray.900", "white");

//   useEffect(() => {
//     posthog.capture("$pageview");
//   }, []);

//   return (
//     <Grid
//       pt={{ base: "130px", md: "80px", xl: "80px" }}
//       gridTemplateColumns={{ base: "2.4fr 1fr", lg: "1fr 1.83fr" }}
//       gap={{ base: "20px", xl: "20px" }}
//       display={{ base: "block", lg: "grid" }}
//     >
//       <Box gridArea="1 / 1 / 2 / 2">
//         <Timeline dailyDives={getDailyDives(diveTrips)} mb="20px" />
//       </Box>
//       <Card gridArea="1 / 2 / 2 / 3" minH="680px">
//         <Text fontSize="2xl" fontWeight="700" color={textColor}>
//           {diveCentre.name} - Dive Calendar
//         </Text>
//         <Text
//           fontSize="md"
//           fontWeight="500"
//           color="secondaryGray.600"
//           mb="30px"
//         >
//           Add your non-daily trips to your calendar{" "}
//         </Text>
//         <EventCalendar
//           initialDate={new Date()}
//           calendarDives={getCalendarDives(diveTrips)}
//         />
//       </Card>
//     </Grid>
//   );
// }

// export const getServerSideProps = async (ctx) => {
//   const { slug } = ctx.params;
//   // get user id from supabase
//   const supabase = createServerSupabaseClient(ctx);
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();
//   const userId = session?.user.id;

//   const { data: diveCentre } = await supabase
//     .from("dive_centres_view")
//     .select(
//       `id, name, description, address, latitude, longitude, paymentMethods, equipment, services, languages, memberships,
//       coverPhotoUrl, city, country, slug, ownerId`
//     )
//     .match({ slug })
//     .single();

//   if (diveCentre.ownerId !== userId || diveCentre.ownerId === null) {
//     return {
//       redirect: {
//         destination: "/404",
//         permanent: false,
//       },
//     };
//   }

//   // Get dive trips with the current dive centre
//   const { data: diveTrips } = await supabase
//     .from("dive_trips")
//     .select(
//       `id, name, description, notes, min_cert, status, price, deposit,
//           stripe_price_id, start_date, start_time, check_in, created_at, updated_at,
//           dive_sites:trip_sites!dive_trip_id(
//             dive_site:dive_site_id(id, name, latitude, longitude))
//       `
//     )
//     .eq("dive_centre_id", diveCentre.id);
//   // .order("updated_at", { ascending: true });

//   return {
//     props: {
//       diveCentre,
//       diveTrips,
//     },
//   };
// };

// DiveCentreCalendar.getLayout = function getLayout(page) {
//   return <DivingLayout>{page}</DivingLayout>;
// };
