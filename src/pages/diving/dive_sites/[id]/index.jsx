/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
// Chakra imports
import { AspectRatio, Box, Button, Grid } from "@chakra-ui/react";
// Custom components
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import Card from "components/card/Card";
import SiteInfo from "components/pages/diveSite/SiteInfo";
import TripsSidebar from "components/sidebar/TripsSidebar";
import DivingLayout from "layouts/DivingLayout";
import { supabase } from "pages/api/index";

export default function DiveSitePage({ diveSite }) {
  // console.log("siteData", diveSite);

  const router = useRouter();
  const { id } = router.query;

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchSiteTrips() {
    const { data } = await supabase
      .from("dive_sites")
      .select(
        `
          id, 
          dive_trips: trip_sites!dive_site_id(
            dive_trip: dive_trip_id (id, name, description, notes, min_cert, status, price, pay_now,
              stripe_price_id, start_date, start_time, check_in, 
              dive_sites: trip_sites!dive_trip_id(
                dive_site:dive_site_id(id, name, latitude, longitude)),
              dive_centre: dive_centres (id, name, latitude, longitude))
            )
          )
        `
      )
      .eq("id", id)
      .single();
    // console.log("siteTripData", data);
    setTrips(data.dive_trips);
    setLoading(false);
  }

  useEffect(() => {
    fetchSiteTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NextSeo
        title={`Dive ${diveSite.name}, ${diveSite.country.countries.name}`}
        description={`Book your next scuba diving trip in ${diveSite.city.name}, ${diveSite.country.countries.name} with Coral Playground today for an unforgattable trip`}
        openGraph={{
          type: "website",
          title: `Experience diving at ${diveSite.name}`,
          description: `Book your next scuba diving trip in ${diveSite.city.name}, ${diveSite.country.countries.name} with Coral Playground today for an unforgattable trip`,
          url: `https://www.coralplayground.com/diving/dive_sites/${diveSite.id}`,
          images: [
            {
              url: diveSite.dive_map,
              width: 800,
              height: 600,
              alt: `Dive Site Cover Photo - ${diveSite.name}`,
            },
          ],
        }}
      />
      <Box maxW="100%">
        <Grid
          maxW="100%"
          display={{ base: "block", lg: "grid" }}
          pt={{ base: "130px", md: "80px", xl: "80px" }}
          gridTemplateColumns="1.7fr 1fr"
        >
          <Box
            gridArea="1 / 1 / 2 / 2"
            me={{ lg: "20px" }}
            mb={{ base: "20px", lg: "0px" }}
          >
            <AspectRatio w="100%" maxW="100%" ratio={1130 / 636}>
              <Card
                bgSize="100% 100%"
                minH={{ base: "200px", md: "100%" }}
                bgImage={diveSite.dive_map || "/img/diving/dive_site_bg.jpg"}
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
            <SiteInfo
              name={diveSite.name}
              description={diveSite.description}
              city={diveSite.city.name}
              country={diveSite.country.countries.name}
              depth={diveSite.depth}
              min_visibility={diveSite.min_visibility}
              max_visibility={diveSite.max_visibility}
              current={diveSite.current}
              access={diveSite.access}
              cert_level={diveSite.cert_level}
              diveTypes={diveSite.tags}
              species={diveSite.species}
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
                diveSite={diveSite}
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
  const { data: diveSites } = await supabase.from("dive_sites").select("id");

  const paths = diveSites.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const { data: diveSite } = await supabase
    .from("dive_sites")
    .select(
      `id, name, description, latitude, longitude, min_visibility, max_visibility, depth, 
      current, cert_level, tags, access, dive_map, 
        city: cities (name),
        country: cities (countries (name)),
        species: site_species!dive_site_id (
          specie: species_id (id, name, cover_photo))`
    )
    .match({ id })
    .single();

  return {
    props: {
      diveSite,
    },
    revalidate: 86400,
  };
};

DiveSitePage.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
