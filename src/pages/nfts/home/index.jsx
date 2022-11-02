import { Box } from "@chakra-ui/react";
// import { useMoralis } from "react-moralis";
// import { useNavigate } from "react-router-dom";
import { NextSeo } from "next-seo";
import { ParallaxProvider } from "react-scroll-parallax";

// import gradientBg from "../../assets/svg/gradient-bg.svg";
import HomeBenefits from "components/pages/home/HomeBenefits";
import HomeCollectibles from "components/pages/home/HomeCollectibles";
import HomeFAQ from "components/pages/home/HomeFAQ";
import HomeFooter from "components/pages/home/HomeFooter";
import HomeHero from "components/pages/home/HomeHero";
import HomeJellyfish from "components/pages/home/HomeJellyfish";
import HomeTimeline from "components/pages/home/HomeTimeline";
import LandingLayout from "layouts/home/Landing";

export default function Home() {
  // const { authenticate, isAuthenticated, isAuthenticating, Moralis, user } =
  //   useMoralis();
  // const getFiat = async function () {
  //   Moralis.initPlugins();
  //   await Moralis.Plugins.fiat.buy();
  // };
  // const navigate = useNavigate();

  return (
    <>
      <NextSeo title="Home" description="Coral Playground Home Page" />
      <ParallaxProvider>
        <Box
        // bgImage={gradientBg}
        // bgRepeat="no-repeat"
        // bgSize="cover"
        >
          <HomeHero />
          <HomeBenefits />
          <HomeJellyfish />
          <HomeCollectibles />
          <HomeTimeline />
          <HomeFAQ />
          <HomeFooter />
        </Box>
      </ParallaxProvider>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <LandingLayout>{page}</LandingLayout>;
};
