/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */

import { chakra } from "@chakra-ui/react";
import { motion, isValidMotionProp, AnimatePresence } from "framer-motion";
import { NextSeo } from "next-seo";
import { useContext, useEffect, useState } from "react";

import { supabase } from "../api/index";
import TripSearchBar from "components/fields/TripSearchBar";
import MapBase from "components/maps/MapBase";
import Destinations from "components/pages/diveTrips/Destinations";
import Upcoming from "components/pages/diveTrips/Upcoming";
import { TripSearchContext } from "contexts/TripSearchContext";
import DivingLayout from "layouts/DivingLayout";
// import generateDiveSiteRSS from "utils/generateDiveSiteRSS";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

export default function DiveTrips(props) {
  const { diveSites, diveCentres, diveTrips, cities } = props;
  const { dateRange, filterByDateRange, filterByCity } =
    useContext(TripSearchContext);

  const [city, setCity] = useState(0);
  const [filtered, setFiltered] = useState();

  useEffect(() => {
    const cityFiltered = filterByCity(diveTrips, city);
    setFiltered(cityFiltered);
  }, [diveTrips, city]);

  useEffect(() => {
    const dateFiltered = filterByDateRange(diveTrips, dateRange);
    setFiltered(dateFiltered);
  }, [diveTrips, dateRange]);

  return (
    <>
      <NextSeo
        title="Upcoming Scuba Diving Trips in Egypt"
        description={`With ${diveTrips?.length} dive trips, book your perfect scuba diving adventure with Coral Playground and experience the wonders of the Red Sea!`}
        openGraph={{
          type: "website",
          title: "Coral Playground | Scuba Diving Trips in Egypt",
          description: `With ${diveTrips?.length} dive trips, book your perfect scuba diving adventure with Coral Playground and experience the wonders of the Red Sea!`,
          url: "https://www.coralplayground.com/dive_trips/",
          images: [
            {
              url: "https://www.coralplayground.com/img/diving/dive_site_bg.jpg",
              width: 800,
              height: 600,
              alt: "Dive Trips Cover Photo",
            },
          ],
        }}
      />
      <MapBase
        diveSites={diveSites}
        diveCentres={diveCentres}
        h={{ sm: "calc(100vh - 110px)", md: "50vh" }}
        pt={{ sm: "50px", lg: "100px" }}
        gridArea="1 / 1 / 1 / 1"
        scrollZoom
      />
      <TripSearchBar
        city={city}
        setCity={setCity}
        viewButtons
        mt="40px"
        mb="20px"
      />
      <ChakraBox layout>
        <AnimatePresence>
          <Upcoming diveTrips={filtered} bookable />
        </AnimatePresence>
      </ChakraBox>
      <Destinations cities={cities} pt="20px" />
    </>
  );
}

export async function getStaticProps() {
  const { data: diveTrips } = await supabase
    .from("dive_trips_view")
    .select("*")
    .order("name", { ascending: true });

  const { data: cities } = await supabase
    .from("cities")
    .select("*")
    .order("name", { ascending: true });

  const { data: diveSites } = await supabase
    .from("dive_sites_view")
    .select(`id, slug, name, latitude, longitude, diveMap`);
  const { data: diveCentres } = await supabase
    .from("active_dive_centres_view")
    .select(`id, slug, name, latitude, longitude, coverPhotoUrl`);

  return {
    props: { diveSites, diveCentres, diveTrips, cities },
    revalidate: 60,
  };
}
DiveTrips.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
