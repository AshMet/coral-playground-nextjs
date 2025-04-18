/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
// Chakra imports
import { AspectRatio, Box, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";

import { supabase } from "../../api/index";
import Card from "components/card/Card";
import LikeButton from "components/icons/LikeButton";
import CentreInfo from "components/pages/diveCentre/CentreInfo";
import TripsSidebar from "components/sidebar/TripsSidebar";
import DivingLayout from "layouts/DivingLayout";

export default function DiveCentre(props) {
  const { diveCentre, centreEquipment, centreCerts } = props;
  const router = useRouter();
  const { slug } = router.query;
  const posthog = usePostHog();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    posthog.capture("$pageview", {
      "Dive Centre": diveCentre.name,
      City: diveCentre.city,
      Country: diveCentre.country,
    });
  }, []);

  async function fetchCentreTrips() {
    // const { data } = await supabase
    //   .from("dive_centres")
    //   .select(
    //     `
    //       id, slug,
    //       diveTrips:dive_trips(id, name, description, minCert: min_cert, active,
    //         frequency, duration, timezone, price, deposit, generic,
    //         recurDays: recur_days, recurEndDate: recur_end_date,
    //         stripePriceId: stripe_price_id, startDate: start_date, startTime: start_time, checkin,
    //         diveSites:trip_sites!dive_trip_id(
    //           diveSite:dive_site_id(id, name, latitude, longitude)),
    //         diveCentre: dive_centres(id, name, latitude, longitude)
    //       )
    //     `
    //   )
    //   .eq("slug", slug)
    //   .single();

    const { data } = await supabase
      .from("site_centre_trips_view")
      .select("*")
      .eq("centreSlug", slug)
      .order("name", { ascending: true });

    const uniqueTrips = [...new Map(data.map((v) => [v.id, v])).values()];

    setTrips(uniqueTrips || []);
    setLoading(false);
    // console.log("centreTripData", data);
  }

  useEffect(() => {
    fetchCentreTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("trips", trips);
  // console.log("centreEquip", centreEquipment);

  return (
    <>
      <NextSeo
        title={`Dive with ${diveCentre.name} in ${diveCentre.city}`}
        description={`Book your next dive trip with ${diveCentre.name} and explore the wonders of the underwater world near ${diveCentre.city} and beyond!`}
        canonical={`https://www.coralplayground.com/dive_centres/${diveCentre.slug}`}
        openGraph={{
          type: "website",
          title: `Dive with ${diveCentre.name} in ${diveCentre.country}`,
          description: `Book your next dive trip with ${diveCentre.name} and explore the wonders of the underwater world near ${diveCentre.city} and beyond!`,
          url: `https://www.coralplayground.com/dive_centres/${diveCentre.slug}`,
          images: [
            {
              url: diveCentre.coverPhotoUrl,
              width: 1200,
              height: 630,
              alt: `Dive Centre Cover Photo - ${diveCentre.name}`,
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
                bgSize="cover"
                w=""
                minH={{ base: "200px", md: "100%" }}
                h="400px"
                bgImage={
                  diveCentre?.coverPhotoUrl || "/img/diving/dive_centre_bg.jpg"
                }
              >
                <LikeButton diveCentreId={diveCentre.id} />
              </Card>
            </AspectRatio>

            <CentreInfo
              diveCentre={diveCentre}
              equipment={centreEquipment}
              centreCerts={centreCerts}
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
                trips={trips.filter((trip) => trip.active === true)}
                diveCentre={diveCentre}
                centreEquipment={centreEquipment}
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
  const { slug } = context.query;
  const { data: diveCentre } = await supabase
    .from("dive_centres_view")
    .select(
      `id, name, description, address, latitude, longitude, paymentMethods, equipment, services, languages, memberships,
      coverPhotoUrl, city, country, slug`
      // `id, name, description, address, latitude, longitude, payment_methods, equipment, services, languages, memberships, cover_photo, city: cities (name), country: cities (countries (name))`
    )
    .match({ slug })
    .single();

  // console.log("diveCentre", diveCentre);

  const { data: centreEquipment } = await supabase
    .from("centre_equipment_view")
    .select("*")
    .eq("centreId", diveCentre.id)
    .order("equipName", { ascending: true });

  const { data: centreCerts } = await supabase
    .from("centre_certs_view")
    .select("*")
    .eq("centreId", diveCentre.id)
    .order("certName", { ascending: true });

  return {
    props: {
      diveCentre,
      centreEquipment,
      centreCerts,
    },
  };
}

DiveCentre.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
