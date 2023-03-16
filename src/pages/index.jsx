/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { Box, Flex } from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import { NextSeo } from "next-seo";
import { MessengerChat } from "react-messenger-chat-plugin";
import { ParallaxProvider } from "react-scroll-parallax";

import Benefits from "components/pages/divingHome/Benefits";
import BookingBenefits from "components/pages/divingHome/BookingBenefits";
import DiveCentreBenefits from "components/pages/divingHome/DiveCentreBenefits";
import DiveSiteBenefits from "components/pages/divingHome/DiveSiteBenefits";
import Hero from "components/pages/divingHome/Hero";
import HowItWorks from "components/pages/divingHome/HowItWorks";
import Mission from "components/pages/divingHome/Mission";
import Profile from "components/pages/profile/Profile";
import DivingLayout from "layouts/DivingLayout";
import LandingLayout from "layouts/LandingLayout";
import { supabase } from "utils/supabase";

export default function Home({ data }) {
  const session = useSession();
  // console.log("session", session);

  return (
    <Box>
      {session ? (
        // Profile Page
        <>
          <NextSeo
            title="Coral Playground | User Account"
            description="User Profile & Settings"
            openGraph={{
              type: "website",
              title: "Coral Playground | User Account",
              description: "User Profile & Settings",
              url: "https://www.coralplayground.com/",
              images: [
                {
                  url: "https://www.coralplayground.com/svg/coral-logo.svg",
                  width: 800,
                  height: 400,
                  alt: "Coral Playground Logo",
                },
              ],
            }}
          />
          <DivingLayout>
            <Profile session={session} />
          </DivingLayout>
        </>
      ) : (
        // Landing Page
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
                {/* <Numbers />
                <Upgrade /> */}
                <MessengerChat
                  pageId="105856435673294"
                  language="en_US"
                  themeColor="#000000"
                  bottomSpacing={300}
                  loggedInGreeting="loggedInGreeting"
                  loggedOutGreeting="loggedOutGreeting"
                  greetingDialogDisplay="show"
                  debugMode
                  onMessengerShow={() => {
                    console.log("onMessengerShow");
                  }}
                  onMessengerHide={() => {
                    console.log("onMessengerHide");
                  }}
                  onMessengerDialogShow={() => {
                    console.log("onMessengerDialogShow");
                  }}
                  onMessengerDialogHide={() => {
                    console.log("onMessengerDialogHide");
                  }}
                  onMessengerMounted={() => {
                    console.log("onMessengerMounted");
                  }}
                  onMessengerLoad={() => {
                    console.log("onMessengerLoad");
                  }}
                />
              </Flex>
            </ParallaxProvider>
          </LandingLayout>
        </>
      )}
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
