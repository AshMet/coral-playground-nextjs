/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { Box, Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { ParallaxProvider } from "react-scroll-parallax";

import Benefits from "components/pages/divingHome/Benefits";
import BookingBenefits from "components/pages/divingHome/BookingBenefits";
import DiveCentreBenefits from "components/pages/divingHome/DiveCentreBenefits";
import DiveSiteBenefits from "components/pages/divingHome/DiveSiteBenefits";
import HowItWorks from "components/pages/divingHome/HowItWorks";
import Intro from "components/pages/divingHome/Intro";
import MapHero from "components/pages/divingHome/MapHero";
import LandingLayout from "layouts/LandingLayout";
import { supabase } from "utils/supabase";

export default function Home({ diveSites, diveCentres }) {
  return (
    <Box>
      <>
        <NextSeo
          title="Coral Playground | Home Page"
          description="The best place to book your next Red Sea dive trip"
          canonical="https://www.coralplayground.com"
          openGraph={{
            type: "website",
            title: "Coral Playground | Home Page",
            description: "The best place to book your next Red Sea dive trip",
            url: "https://www.coralplayground.com/",
            images: [
              {
                url: "https://www.coralplayground.com/svg/coral-logo.svg",
                width: 1200,
                height: 630,
                alt: "Coral Playground Logo",
              },
            ],
          }}
        />
        <LandingLayout>
          <ParallaxProvider>
            <Flex direction={{ base: "column" }}>
              <MapHero diveSites={diveSites} diveCentres={diveCentres} />
              <Intro />
              {/* <Hero /> */}
              {/* <Mission sites={data} /> */}
              <HowItWorks />
              <Benefits />
              <DiveSiteBenefits />
              <DiveCentreBenefits />
              <BookingBenefits />
            </Flex>
          </ParallaxProvider>
        </LandingLayout>
      </>
    </Box>
  );
}

export async function getStaticProps() {
  const { data: diveSites } = await supabase
    .from("dive_site_view")
    .select(`id, name, latitude, longitude, diveMap`);
  const { data: diveCentres } = await supabase
    .from("active_dive_centres_view")
    .select(`id, name, latitude, longitude, coverPhotoUrl`);
  return { props: { diveSites, diveCentres }, revalidate: 86400 };
}

// export async function getStaticProps() {
//   const { data: siteResults } = await supabase.from("dive_sites").select(
//     `id, name, description, latitude, longitude, min_visibility, max_visibility, depth, current, cert_level,
//         tags, access, dive_map, city: cities (name), country: cities (countries (name))`
//   );
//   const { data: centreResults } = await supabase.from("dive_centres").select(
//     `id, name, description, address, latitude, longitude, payment_methods, equipment, services, languages, memberships,
//       cover_photo, city: cities (name), country: cities (countries (name))`
//   );
