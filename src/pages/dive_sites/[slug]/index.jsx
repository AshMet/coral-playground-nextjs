/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
// Chakra imports
import { AspectRatio, Box, Button, Grid } from "@chakra-ui/react";
// Custom components
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";
// import slugify from "slugify";

import Card from "components/card/Card";
import LikeButton from "components/icons/LikeButton";
import SiteInfo from "components/pages/diveSite/SiteInfo";
import TripsSidebar from "components/sidebar/TripsSidebar";
import DivingLayout from "layouts/DivingLayout";
import { supabase } from "pages/api/index";

export default function DiveSitePage({ diveSite, species }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const posthog = usePostHog();
  const router = useRouter();
  const { slug } = router.query;

  // console.log("siteData", diveSite);
  useEffect(() => {
    posthog.capture("$pageview", {
      "Dive Site": diveSite.name,
      City: diveSite.city,
      Country: diveSite.country,
    });
  }, []);

  async function fetchSiteTrips() {
    // const { data } = await supabase
    //   .from("dive_sites")
    //   .select(
    //     `
    //       id, slug,
    //       diveTrips: trip_sites!dive_site_id(
    //         diveTrip: dive_trip_id (id, name, description, minCert: min_cert, active, price, deposit,
    //           stripePriceId: stripe_price_id, startDate: start_date, startTime: start_time, checkin,
    //           diveSites: trip_sites!dive_trip_id(
    //             diveSite:dive_site_id(id, name, latitude, longitude)),
    //           diveCentre: dive_centres (id, name, latitude, longitude))
    //         )
    //       )
    //     `
    //   )
    //   .eq("slug", slug)
    //   .single();
    const { data } = await supabase
      .from("site_centre_trips_view")
      .select("*")
      .eq("siteSlug", slug);
    // console.log("siteTripData", data);
    setTrips(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchSiteTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("site_trips", trips);
  // console.log("site_species", species);

  return (
    <>
      <NextSeo
        title={`${diveSite.name} Dive Site in ${diveSite.city}`}
        description={`Book your next scuba diving trip in ${diveSite.city}, ${diveSite.country} with Coral Playground today for an unforgattable trip`}
        canonical={`https://www.coralplayground.com/dive_sites/${diveSite.slug}`}
        openGraph={{
          type: "website",
          title: `Experience diving at ${diveSite.name}`,
          description: `Book your next scuba diving trip in ${diveSite.city}, ${diveSite.country} with Coral Playground today for an unforgattable trip`,
          url: `https://www.coralplayground.com/dive_sites/${diveSite.slug}`,
          images: [
            {
              url: diveSite.diveMap,
              width: 1200,
              height: 630,
              alt: `Dive Site Cover Photo - ${diveSite.name}`,
            },
          ],
        }}
      />
      <Box maxW="100%">
        <Grid
          maxW="100%"
          display={{ base: "block", lg: "grid" }}
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
                bgImage={diveSite.diveMap || "/img/diving/dive_site_bg.jpg"}
              >
                <LikeButton diveSiteId={diveSite.id} />
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
              city={diveSite.city}
              country={diveSite.country}
              minDepth={diveSite.minDepth}
              maxDepth={diveSite.maxDepth}
              minVis={diveSite.minVis}
              maxVis={diveSite.maxVis}
              minCurrent={diveSite.minCurrent}
              maxCurrent={diveSite.maxCurrent}
              access={diveSite.access}
              cert_level={diveSite.certLevel}
              diveTypes={diveSite.tags}
              species={species}
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
  const { data: diveSites } = await supabase.from("dive_sites").select("slug");

  const paths = diveSites.map(({ slug }) => ({
    params: {
      slug,
      // slug: slugify(name.replace("&", ""), {
      //   lower: true,
      //   remove: /[*+~.()&'"!:@]/g,
      // }),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  // const { data: diveSite } = await supabase
  //   .from("dive_sites")
  //   .select(
  //     `id, slug, name, description, latitude, longitude, minVis: min_visibility, maxVis: max_visibility,
  //       minDepth: min_depth, maxDepth: max_depth, minCurrent: min_current, maxCurrent: max_current, certLevel: cert_level, tags, access, diveMap: dive_map,
  //       city: cities (name),
  //       country: cities (countries (name)),
  //       species: site_species!dive_site_id (
  //         specie: species_id (id, name, coverPhoto: cover_photo))`
  //   )
  //   .match({ slug })
  //   .single();

  const { data: diveSite } = await supabase
    .from("dive_sites_view")
    .select("*")
    .match({ slug })
    .single();

  const { data: species } = await supabase
    .from("site_species_view")
    .select("*")
    .eq("siteId", diveSite.id);

  return {
    props: {
      diveSite,
      species,
    },
    revalidate: 60,
  };
};

DiveSitePage.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
