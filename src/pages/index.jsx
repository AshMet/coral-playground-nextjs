/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { Box, Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { ParallaxProvider } from "react-scroll-parallax";

import LandingCard from "components/card/LandingCard";
import Benefits from "components/pages/divingHome/Benefits";
import Contact from "components/pages/divingHome/Contact";
import HowItWorks from "components/pages/divingHome/HowItWorks";
import Intro from "components/pages/divingHome/Intro";
import Loyalty from "components/pages/divingHome/Loyalty";
import MapHero from "components/pages/divingHome/MapHero";
import Mission from "components/pages/divingHome/Mission";
import LandingLayout from "layouts/LandingLayout";
import { supabase } from "utils/initializers/supabase";

export default function Home({ diveSites, diveCentres }) {
  return (
    <Box>
      <>
        <NextSeo
          title="Home Page"
          description="The best place to book your next Red Sea dive trip"
          canonical="https://www.coralplayground.com"
          openGraph={{
            type: "website",
            title: "Coral Playground | The best place to book your next dive",
            description:
              "Explore the largest collection of dives in the Red Sea and book your next dive trip with Coral Playground",
            url: "https://www.coralplayground.com/",
            images: [
              {
                url: "https://www.coralplayground.com/img/home/og-home-page.jpg",
                width: 1200,
                height: 630,
                alt: "Coral Playground cover photo with logo",
              },
            ],
          }}
        />
        <LandingLayout>
          <ParallaxProvider>
            <Flex direction={{ base: "column" }}>
              <MapHero diveSites={diveSites} diveCentres={diveCentres} />
              <Intro />
              <Loyalty />
              <Mission />
              <HowItWorks />
              <Benefits />
              <LandingCard
                header="DIVE SITES"
                title="Explore the Best Dive Sites with Confidence"
                description="Get all the Information You Need with Coral Playground!
                  Discover maps, descriptions, conditions and species
                  information to help you select dive sites that align with your
                  interests and expertise."
                image="/img/diving/coral_reef_3d.png"
                btnText="View Dive Sites"
                btnLink="/dive_sites"
              />
              <LandingCard
                header="DIVE CENTRES"
                title="Find Your Perfect Dive Centre - No Guesswork Required!"
                description="Say goodbye to the hassle of searching for a dive centre that
                  fits your needs. Whether you want to compare prices, find a
                  dive centre with staff who speak your language, or seek
                  additional services, we've got you covered. Plus, you can
                  trust that all of our partners maintain the highest standards
                  in safety and environmental practices."
                image="/img/diving/dive_centre_3d.png"
                btnText="View Dive Centres"
                btnLink="/dive_centres"
                leftImg
              />
              <LandingCard
                header="CERTIFICATIONS"
                title="Dive into Adventure - All Levels Welcome!"
                description="Take the leap into a new world of diving. Whether you're
                  a beginner ready for your first dive, looking to advance your
                  skills, or pursuing a career as a professional, we've got
                  you covered. Simply choose your preferred date and dive
                  centre, and we'll handle the rest."
                image="/img/diving/diver_falling.png"
                btnText="Book a Course"
                btnLink="/certifications"
              />
              <Contact />
            </Flex>
          </ParallaxProvider>
        </LandingLayout>
      </>
    </Box>
  );
}

export async function getStaticProps() {
  const { data: diveSites } = await supabase
    .from("dive_sites_view")
    .select(`id, name, latitude, longitude, diveMap, slug`);
  const { data: diveCentres } = await supabase
    .from("active_dive_centres_view")
    .select(`id, name, latitude, longitude, coverPhotoUrl, slug`);
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
