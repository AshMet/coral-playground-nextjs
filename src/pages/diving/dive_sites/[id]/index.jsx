/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
// Chakra imports
import { AspectRatio, Box, Button, Grid } from "@chakra-ui/react";
// Custom components
import axios from "axios";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Card from "components/card/Card";
import SiteInfo from "components/pages/diveSite/SiteInfo";
import TripsSidebar from "components/sidebar/TripsSidebar";
import AdminLayout from "layouts/admin";

export default function DiveSitePage({ data }) {
  console.log("siteData", data);

  const router = useRouter();
  const { id } = router.query;

  const [trips, setTrips] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        `https://coral-playground-api.herokuapp.com/api/v1/dive_sites/${id}/site_trips`
      );
      setTrips(result.data);
      console.log("trips", trips);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NextSeo
        title={`Dive Site - ${data.name}`}
        description={`Dive Site - ${data.name}, ${data.city}, ${data.country}`}
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
                bgImage={data.dive_map_url || "/img/diving/dive_site_bg.png"}
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
              name={data.name}
              description={data.description}
              city={data.city}
              country={data.country}
              depth={data.depth}
              minVisibility={data.min_visibility}
              maxVisibility={data.max_visibility}
              current={data.current}
              access={data.access}
              certLevel={data.cert_level}
              diveTypes={data.tags}
              // species={data.species}
            />
          </Box>
          {/* Trip sidebar Load states */}
          {/* <Center>
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
          </Center> */}
          {trips && (
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
  try {
    const result = await axios.get(
      "https://coral-playground-api.herokuapp.com/api/v1/dive_sites"
    );
    const { data } = result;

    const paths = data.map((site) => ({
      params: { id: site.id.toString() },
    }));
    return { paths, fallback: false };
  } catch (error) {
    console.error(error);
  }
}

export const getStaticProps = async ({ params }) => {
  const siteId = params.id;
  try {
    const result = await axios.get(
      `https://coral-playground-api.herokuapp.com/api/v1/dive_sites/${siteId}`
    );
    const { data } = result;
    return {
      props: { data },
    };
  } catch (error) {
    console.error(error);
  }
};

DiveSitePage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
