import { Box, Flex } from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import { NextSeo } from "next-seo";
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
import LandingLayout from "layouts/home/Landing";

export default function Home() {
  const session = useSession();

  // console.log(session);

  return (
    <Box>
      {session ? (
        <>
          <NextSeo
            title="User Account"
            description="View upcoming dives and bookings"
          />
          <DivingLayout>
            <Profile session={session} />
          </DivingLayout>
        </>
      ) : (
        <>
          <NextSeo
            title="Diving Landing"
            description="Coral Playground Diving Home Page"
          />
          <LandingLayout>
            <ParallaxProvider>
              <Flex direction={{ base: "column" }}>
                <Hero />
                <Mission />
                <HowItWorks />
                <Benefits />
                <DiveSiteBenefits />
                <DiveCentreBenefits />
                <BookingBenefits />
                {/* <Numbers />
                <Upgrade /> */}
              </Flex>
            </ParallaxProvider>
          </LandingLayout>
        </>
      )}
    </Box>
  );
}
