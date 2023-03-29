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

export default function Home({ data }) {
  return (
    <Box>
      <>
        <NextSeo
          title="Coral Playground | Home Page"
          description="The best place to book your next Red Sea dive trip"
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
              <MapHero data={data} />
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
  const { data: siteResults } = await supabase.from("dive_sites").select(
    `id, name, description, latitude, longitude, min_visibility, max_visibility, depth, current, cert_level,
        tags, access, dive_map, city: cities (name), country: cities (countries (name))`
  );
  const { data: centreResults } = await supabase.from("dive_centres").select(
    `id, name, description, address, latitude, longitude, payment_methods, equipment, services, languages, memberships,
      cover_photo, city: cities (name), country: cities (countries (name))`
  );
  const data = [];

  for (let i = 0; i < siteResults.length; ++i) {
    data.push({
      location_id: siteResults[i].id,
      name: siteResults[i].name,
      lat: siteResults[i].latitude,
      lng: siteResults[i].longitude,
      itemImg: siteResults[i].dive_map,
      maxDepth: siteResults[i].depth,
      cert_level: siteResults[i].cert_level,
      access: siteResults[i].access,
      divingTypes: siteResults[i].tags,
      city: siteResults[i].city.name,
      country: siteResults[i].country.countries.name,
      locationType: "dive_site",
    });
  }

  for (let i = 0; i < centreResults.length; ++i) {
    data.push({
      location_id: centreResults[i].id,
      name: centreResults[i].name,
      lat: centreResults[i].latitude,
      lng: centreResults[i].longitude,
      itemImg: centreResults[i].cover_photo,
      memberships: centreResults[i].memberships,
      languages: centreResults[i].languages,
      city: centreResults[i].city.name,
      country: centreResults[i].country.countries.name,
      locationType: "dive_centre",
    });
  }

  // const data = JSON.stringify(results);

  return { props: { data }, revalidate: 86400 };
}
