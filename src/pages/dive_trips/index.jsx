/* eslint-disable consistent-return */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */

import { chakra } from "@chakra-ui/react";
import { motion, isValidMotionProp, AnimatePresence } from "framer-motion";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import { supabase } from "../api/index";
import CitySelectionField from "components/fields/CitySelectionField";
import Destinations from "components/pages/diveTrips/Destinations";
import Upcoming from "components/pages/diveTrips/Upcoming";
import DivingLayout from "layouts/DivingLayout";
import MapBase from "components/maps/MapBase";
// import generateDiveSiteRSS from "utils/generateDiveSiteRSS";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

export default function DiveTrips(props) {
  const { diveSites, diveCentres, diveTrips, cities } = props;
  const [country, setCountry] = useState();
  const [city, setCity] = useState(0);
  const [filtered, setFiltered] = useState();

  useEffect(() => {
    if (!diveTrips) return null;
    if (city === 0 || city === "All Cities") {
      setFiltered(diveTrips);
      return;
    }
    const cityFiltered = diveTrips.filter(
      (trip) => trip.diveCentreCity === city
    );
    setFiltered(cityFiltered);
    // console.log("site data", data);
  }, [diveTrips, city, country]);

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
      {/* <motion.div display="grid" displayTemplateColumns="repeat(autoFit, minmax(250px, 1fr)" gridColumnGap="1rem" gridRowGap="2rem"> */}
      <Destinations cities={cities} pt="80px" />
      <MapBase
        diveSites={diveSites}
        diveCentres={diveCentres}
        h={{ sm: "calc(100vh - 110px)", md: "50vh" }}
        pt={{ sm: "40px", lg: "60px" }}
        gridArea="1 / 1 / 1 / 1"
        scrollZoom
      />
      <CitySelectionField
        city={city}
        country={country}
        setCity={setCity}
        setCountry={setCountry}
        mt="80px"
      />
      <ChakraBox layout>
        <AnimatePresence>
          <Upcoming diveTrips={filtered} bookable />
        </AnimatePresence>
      </ChakraBox>
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
    .select(`id, name, latitude, longitude, diveMap`);
  const { data: diveCentres } = await supabase
    .from("active_dive_centres_view")
    .select(`id, name, latitude, longitude, coverPhotoUrl`);

  return {
    props: { diveSites, diveCentres, diveTrips, cities },
    revalidate: 60,
  };
}
DiveTrips.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
