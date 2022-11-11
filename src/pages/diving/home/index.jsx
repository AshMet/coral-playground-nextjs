/* eslint-disable import/no-cycle */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___  
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \ 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/ 
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { ParallaxProvider } from "react-scroll-parallax";

import BookingBenefits from "../../../components/pages/divingHome/BookingBenefits";
import LandingLayout from "../../../layouts/home/Landing";
// Custom components
import Benefits from "components/pages/divingHome/Benefits";
import DiveCentreBenefits from "components/pages/divingHome/DiveCentreBenefits";
import DiveSiteBenefits from "components/pages/divingHome/DiveSiteBenefits";
import Hero from "components/pages/divingHome/Hero";
import HowItWorks from "components/pages/divingHome/HowItWorks";
import Mission from "components/pages/divingHome/Mission";
// import Numbers from "components/pages/divingHome/Numbers";
// import Upgrade from "components/pages/divingHome/Upgrade";

// import HomeHero from "components/pages/divingHome/VideoHero";

export default function DivingHome() {
  return (
    <>
      <NextSeo
        title="Diving Landing"
        description="Coral Playground Diving Home Page"
      />
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
    </>
  );
}

DivingHome.getLayout = function getLayout(page) {
  return <LandingLayout>{page}</LandingLayout>;
};
