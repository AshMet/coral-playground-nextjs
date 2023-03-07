/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
// Chakra imports
import { Box, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import { supabase } from "../../../api/index";
// import { useSupabaseClient } from "@supabase/auth-helpers-react";
import CentreInfo from "components/pages/diveCentre/CentreInfo";
import ImageUploader from "components/pages/diveCentre/ImageUploader";
import TripsSidebar from "components/sidebar/TripsSidebar";
import DivingLayout from "layouts/DivingLayout";

export default function DiveCentre({ diveCentreData }) {
  const router = useRouter();
  const { id } = router.query;

  const [trips, setTrips] = useState([]);
  const [diveCentre, setDiveCentre] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDiveCentre(diveCentreData);
    console.log("diveCentre", diveCentreData);
  }, [diveCentreData]);

  async function fetchCentreTrips() {
    const { data } = await supabase
      .from("dive_centres")
      .select(
        `
          id,
          dive_trips:dive_trips(id, name, description, notes, min_cert, status, price, pay_now,
            stripe_price_id, start_date, start_time, check_in,
            dive_sites:trip_sites!dive_trip_id(
              dive_site:dive_site_id(id, name, latitude, longitude)),
            dive_centre: dive_centres(id, name, latitude, longitude)
          )
        `
      )
      .eq("id", id)
      .single();
    setTrips(data?.dive_trips || []);
    setLoading(false);
    console.log("centreTripData", data);
  }

  useEffect(() => {
    fetchCentreTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NextSeo
        title={`Dive Centre - ${diveCentre.name}`}
        description={`Dive Centre - ${diveCentre.name}, ${diveCentre.city}, ${diveCentre.country}`}
        openGraph={{
          type: "website",
          title: `Dive Centre - ${diveCentre.name}`,
          description: `Dive Centre - ${diveCentre.name}, ${diveCentre.city}, ${diveCentre.country}`,
          url: `https://www.coralplayground.com/diving/dive_centres/${diveCentre.id}`,
          images: [
            {
              url: diveCentre.coverPhotoUrl,
              width: 800,
              height: 600,
              alt: `Dive Centre Cover Photo - ${diveCentre.name}`,
            },
          ],
        }}
      />
      <Box maxW="100%">
        <Grid
          maxW="100%"
          display={{ base: "block", lg: "grid" }}
          pt={{ base: "130px", md: "80px", xl: "80px" }}
          gridTemplateColumns="2.3fr 1fr"
        >
          <Box
            gridArea="1 / 1 / 2 / 2"
            me={{ lg: "20px" }}
            mb={{ base: "20px", lg: "0px" }}
          >
            <ImageUploader
              diveCentreId={diveCentre.id}
              diveCentreImg={diveCentre.coverPhotoUrl}
            />
            <CentreInfo
              name={diveCentre.name}
              description={diveCentre.description}
              address={diveCentre.address}
              city={diveCentre.city}
              country={diveCentre.country}
              equipment={diveCentre.equipment}
              services={diveCentre.services}
              paymentMethods={diveCentre.paymentMethods}
              languages={diveCentre.languages}
              memberships={diveCentre.memberships}
            />
          </Box>
          {/* Trip sidebar Load states */}
          {/* <Center>
            {tripDataError && (
              <Text fontSize="md" fontWeight="500" color="purple.500" mb="30px">
                Sorry, there was a problem loading our trips. Please reload the
                page or try again later.
              </Text>
            )}
            {tripDataIsLoading && (
              <Box>
                <Spinner />
              </Box>
            )}
          </Center> */}
          {trips && (
            <Box gridArea="1 / 2 / 2 / 3">
              <TripsSidebar
                trips={trips}
                diveCentre={diveCentre}
                loading={loading}
              />
            </Box>
          )}
        </Grid>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { data: diveCentreData } = await supabase
    .from("dive_centres_view")
    .select(
      `id, name, description, address, latitude, longitude, paymentMethods, equipment, services, languages, memberships,
      coverPhotoUrl, city, country`
      // `id, name, description, address, latitude, longitude, payment_methods, equipment, services, languages, memberships, cover_photo, city: cities (name), country: cities (countries (name))`
    )
    .match({ id })
    .single();

  return {
    props: {
      diveCentreData,
    },
  };
}

DiveCentre.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
