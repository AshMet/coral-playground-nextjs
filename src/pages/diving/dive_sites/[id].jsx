/* eslint-disable react/prop-types */
// Chakra imports
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Grid,
  Spinner,
  Text,
} from "@chakra-ui/react";
// Custom components
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralisCloudFunction } from "react-moralis";

import Card from "components/card/Card";
import SiteInfo from "components/pages/diveSite/SiteInfo";
import TripsSidebar from "components/sidebar/TripsSidebar";
import AdminLayout from "layouts/admin";

const Moralis = require("moralis/node");
// import getDiveSites from "lib/data/getDiveSites";
export default function DiveSitePage({ siteData }) {
  const parsedSite = JSON.parse(siteData);

  const router = useRouter();
  const { id } = router.query;

  const [trips, setTrips] = useState([]);

  const diveSite = {
    id: parsedSite.objectId,
    name: parsedSite.name,
    depth: parsedSite.maxDepth,
    description: parsedSite.description,
    longitude: parsedSite.longitude,
    latitude: parsedSite.latitude,
    imageUrl: parsedSite.diveMap
      ? parsedSite.diveMap.url
      : "/img/diving/dive_site_bg.png",
    access: parsedSite.access,
    certLevel: parsedSite.certLevel,
    diveTypes: parsedSite.divingTypes,
    country: parsedSite.country,
    city: parsedSite.city,
    minVisibility: parsedSite.minVisibility,
    maxVisibility: parsedSite.maxVisibility,
    current: parsedSite.current,
    species: parsedSite.species,
  };

  const {
    data: tripData,
    error: tripDataError,
    isLoading: tripDataIsLoading,
  } = useMoralisCloudFunction("getSiteTrips", { id });

  useEffect(() => {
    setTrips(tripData);
  }, [tripData]);

  return (
    <>
      <NextSeo
        title={`Dive Site - ${diveSite.name}`}
        description={`Dive Site - ${diveSite.name}, ${diveSite.city}, ${diveSite.country}`}
      />
      <Box maxW="100%">
        <Grid
          maxW="100%"
          display={{ base: "block", lg: "grid" }}
          pt={{ base: "130px", md: "80px", xl: "80px" }}
          gridTemplateColumns="2.3fr 1fr"
        >
          <Box
            gridArea="1 / 1 / 2 / 2"
            me={{ lg: "20px" }}
            mb={{ base: "20px", lg: "0px" }}
          >
            <AspectRatio w="100%" maxW="100%" ratio={1130 / 636}>
              <Card
                bgSize="100% 100%"
                minH={{ base: "200px", md: "100%" }}
                bgImage={diveSite.imageUrl}
              >
                <Button
                  variant="no-hover"
                  w="max-content"
                  backdropFilter="blur(11px)"
                  borderRadius="70px"
                  mt="auto"
                  fontSize="sm"
                  bg="linear-gradient(112.83deg, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0) 110.84%)"
                  color="white"
                  fontWeight="bold"
                >
                  More photos
                </Button>
              </Card>
            </AspectRatio>
            <SiteInfo
              name={diveSite.name}
              description={diveSite.description}
              city={diveSite.city}
              country={diveSite.country}
              depth={diveSite.depth}
              minVisibility={diveSite.minVisibility}
              maxVisibility={diveSite.maxVisibility}
              current={diveSite.current}
              access={diveSite.access}
              certLevel={diveSite.certLevel}
              diveTypes={diveSite.diveTypes}
              species={diveSite.species}
            />
          </Box>
          {/* Trip sidebar Load states */}
          <Center>
            {tripDataError && (
              <Text fontSize="md" fontWeight="500" color="purple.500" mb="30px">
                Sorry, there was a problem loading our trips. Please reload the
                page or try again later.
              </Text>
            )}
            {tripDataIsLoading && (
              <Box>
                <Spinner />
              </Box>
            )}
          </Center>
          {tripData && (
            <Box gridArea="1 / 2 / 2 / 3">
              <TripsSidebar trips={trips} />
            </Box>
          )}
        </Grid>
      </Box>
    </>
  );
}

export async function getStaticPaths() {
  const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
  const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
  Moralis.initialize(appId);
  Moralis.serverURL = serverUrl;
  const DiveSites = Moralis.Object.extend("DiveSites");
  const query = new Moralis.Query(DiveSites);
  const results = await query.find();
  const paths = results.map((site) => ({
    params: { id: site.id },
  }));

  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
  const siteId = params.id;
  const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
  const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
  Moralis.initialize(appId);
  Moralis.serverURL = serverUrl;
  // Get dive site details
  const DiveSites = Moralis.Object.extend("DiveSites");
  const query = new Moralis.Query(DiveSites);
  query.equalTo("objectId", siteId);
  const results = await query.find();
  const siteData = JSON.stringify(results[0]);

  return {
    props: { siteData },
  };
};

DiveSitePage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
