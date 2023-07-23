/* eslint-disable react-hooks/rules-of-hooks */
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

// Core imports
import { Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { ParallaxProvider } from "react-scroll-parallax";

// Components
import Benefits from "components/pages/diveCentresHome/Benefits";
import Hero from "components/pages/diveCentresHome/Hero";
import HowItWorks from "components/pages/diveCentresHome/HowItWorks";
import ManageBenefits from "components/pages/diveCentresHome/ManageBenefits";
import Mission from "components/pages/diveCentresHome/Mission";
import PromoteBenefits from "components/pages/diveCentresHome/PromoteBenefits";
import LandingLayout from "layouts/LandingLayout";

export default function diveCentresHome() {
  return (
    <>
      <NextSeo
        title="Dive Centres Landing Page"
        description="Dive Centres Landing Page"
        canonical="https://www.coralplayground.com/business/home"
        openGraph={{
          type: "website",
          title: "Coral Playground | Dive Centres Landing Page",
          description: "Dive Centres Landing Page",
          url: "https://www.coralplayground.com/business/home",
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
      <ParallaxProvider>
        <Flex direction={{ base: "column" }}>
          <Hero />
          <Mission />
          <HowItWorks />
          <Benefits />
          <PromoteBenefits />
          <ManageBenefits />
          {/* <Numbers />
        <Upgrade /> */}
        </Flex>
      </ParallaxProvider>
    </>
  );
}

diveCentresHome.getLayout = function getLayout(page) {
  return <LandingLayout>{page}</LandingLayout>;
};
