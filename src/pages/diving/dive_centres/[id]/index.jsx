/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
// Chakra imports
import { AspectRatio, Box, Button, Grid } from "@chakra-ui/react";
// Custom components
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { useMoralisCloudFunction } from "react-moralis";

import { supabase } from "../../../api/index";
import Card from "components/card/Card";
import CentreInfo from "components/pages/diveCentre/CentreInfo";
import TripsSidebar from "components/sidebar/TripsSidebar";
import DivingLayout from "layouts/DivingLayout";

// const Moralis = require("moralis/node");

export default function DiveCentre({ diveCentre }) {
  // const parsedCentre = JSON.parse(data);
  const router = useRouter();
  const { id } = router.query;

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // const diveCentre = {
  //   id: parsedCentre.objectId,
  //   name: parsedCentre.name,
  //   address: parsedCentre.address,
  //   description: parsedCentre.description,
  //   longitude: parsedCentre.longitude,
  //   latitude: parsedCentre.latitude,
  //   imageUrl: parsedCentre.coverPhoto
  //     ? parsedCentre.coverPhoto.url
  //     : "/img/diving/dive_centre_bg.jpg",
  //   languages: parsedCentre.languages,
  //   memberships: parsedCentre.memberships,
  //   services: parsedCentre.services,
  //   equipment: parsedCentre.equipment,
  //   paymentMethods: parsedCentre.paymentMethods,
  //   country: parsedCentre.country,
  //   city: parsedCentre.city,
  // };

  // const {
  //   data: tripData,
  //   error: tripDataError,
  //   isLoading: tripDataIsLoading,
  // } = useMoralisCloudFunction("getCentreTrips", { id });

  // id, name, latitude, longitude, dive_trips:dive_trips(*, diveSites:trip_sites!diveSiteId(diveSiteId(*)))

  async function fetchCentreTrips() {
    const { data } = await supabase
      .from("dive_centres")
      .select(
        `
          id,
          dive_trips:dive_trips(id, name, description, notes, min_cert, status, price, pay_now,
            stripe_price_id, fixed_start_date, fixed_start_time, check_in,
            dive_sites:trip_sites!dive_trip_id(
              dive_site:dive_site_id(id, name, latitude, longitude)),
            dive_centre: dive_centres(id, name, latitude, longitude)
          )
        `
      )
      .eq("id", id)
      .single();
    setTrips(data.dive_trips);
    setLoading(false);
    // console.log("centreTripData", data);
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
            <AspectRatio w="100%" maxW="100%" ratio={1130 / 636}>
              {/* <iframe
              style={{ borderRadius: "30px" }}
              src="https://www.youtube.com/embed/VNChunf5RKQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            /> */}
              <Card
                bgSize="cover"
                w=""
                minH={{ base: "200px", md: "100%" }}
                bgImage={
                  diveCentre.cover_photo || "/img/diving/dive_centre_bg.jpg"
                }
              >
                <Button
                  variant="no-hover"
                  w="max-content"
                  backdropFilter="blur(11px)"
                  borderRadius="70px"
                  mt="auto"
                  fontSize="sm"
                  bg="linear-gradient(112.83deg, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0) 110.84%)"
                  color="white"
                  fontWeight="bold"
                >
                  More photos
                </Button>
              </Card>
            </AspectRatio>
            <CentreInfo
              name={diveCentre.name}
              description={diveCentre.description}
              address={diveCentre.address}
              city={diveCentre.city.name}
              country={diveCentre.country.countries.name}
              equipment={diveCentre.equipment}
              services={diveCentre.services}
              payment_methods={diveCentre.payment_methods}
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

export const getStaticPaths = async () => {
  const { data: diveCentres } = await supabase
    .from("dive_centres")
    .select("id");

  const paths = diveCentres.map(({ id }) => ({
    params: {
      id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const { data: diveCentre } = await supabase
    .from("dive_centres")
    .select(
      `id, name, description, address, latitude, longitude, payment_methods, equipment, services, languages, memberships,
      cover_photo, city: cities (name), country: cities (countries (name))`
    )
    .match({ id })
    .single();

  return {
    props: {
      diveCentre,
    },
    revalidate: 86400,
  };
};

DiveCentre.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
