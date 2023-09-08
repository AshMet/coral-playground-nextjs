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
import LandingCard from "components/card/LandingCard";
import Benefits from "components/pages/diveCentresHome/Benefits";
import Hero from "components/pages/diveCentresHome/Hero";
import HowItWorks from "components/pages/diveCentresHome/HowItWorks";
import Mission from "components/pages/diveCentresHome/Mission";
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
          <LandingCard
            header="PROMOTE"
            title="Get a FREE Dive Center Page"
            description="Reach more customers and increase your revenue with your own free business page. Show off all your dive centre 
            has to offer including images, services, languages, equipment, and more. "
            image="/img/home/dive_centre/centre-page.webp"
            btnText="Claim your FREE page"
            btnLink="/business/signup"
            leftImg
          />
          <LandingCard
            header="ONBOARD"
            title="More Loyal Customers"
            description="Reach a growing community of scuba divers looking for their
                  next adventure. As a trusted member of our network of
                  high-quality dive centers, you'll gain instant
                  visibility, making it easier to market and grow your business."
            image="/img/home/dive_centre/yaught.png"
            btnText="Join Today"
            btnLink="/business/signup"
          />
          <LandingCard
            header="MANAGE"
            title="Streamline Operations"
            description="Manage your dive center with ease and focus on the diving
                  experience. Customers pre-pay a small deposit to reserve their
                  spot, with the remainder payable directly to your dive center.
                  Our system handles automatic payments, email confirmations,
                  and check-ins, ensuring a seamless experience for both you and
                  your customers."
            image="/img/home/dive_centre/laptop.png"
            btnText="Get Started"
            btnLink="/business/signup"
            leftImg
          />
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
