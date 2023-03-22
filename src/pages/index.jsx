/* eslint-disable react/prop-types */
import { Box, Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { ParallaxProvider } from "react-scroll-parallax";

import Benefits from "components/pages/divingHome/Benefits";
import BookingBenefits from "components/pages/divingHome/BookingBenefits";
import DiveCentreBenefits from "components/pages/divingHome/DiveCentreBenefits";
import DiveSiteBenefits from "components/pages/divingHome/DiveSiteBenefits";
import Hero from "components/pages/divingHome/Hero";
import HowItWorks from "components/pages/divingHome/HowItWorks";
import Mission from "components/pages/divingHome/Mission";
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
              <Hero />
              <Mission sites={data} />
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
  const { data } = await supabase
    .from("dive_sites")
    .select(`id, name, latitude, longitude, dive_map`)
    .neq("dive_map", null);
  return { props: { data }, revalidate: 86400 };
}
