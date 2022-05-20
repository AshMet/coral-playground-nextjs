import { Box } from "@chakra-ui/react";
// import { useMoralis } from "react-moralis";
// import { useNavigate } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";

// import gradientBg from "../../assets/svg/gradient-bg.svg";
import HomeBenefits from "components/pages/home/HomeBenefits";
import HomeCollectibles from "components/pages/home/HomeCollectibles";
import HomeFAQ from "components/pages/home/HomeFAQ";
import HomeFooter from "components/pages/home/HomeFooter";
import HomeHero from "components/pages/home/HomeHero";
import HomeJellyfish from "components/pages/home/HomeJellyfish";
import HomeTimeline from "components/pages/home/HomeTimeline";
import CenteredAuth from "layouts/auth/types/Centered";

export default function Home() {
  // const { authenticate, isAuthenticated, isAuthenticating, Moralis, user } =
  //   useMoralis();
  // const getFiat = async function () {
  //   Moralis.initPlugins();
  //   await Moralis.Plugins.fiat.buy();
  // };
  // const navigate = useNavigate();

  return (
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
  );
}

Home.getLayout = function getLayout(page) {
  return <CenteredAuth>{page}</CenteredAuth>;
};
