/* eslint-disable react/prop-types */
// Chakra imports
import { AspectRatio, Box, Button, Grid } from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";
import DiveSiteSidebar from "components/pages/diveSite/DiveSiteSidebar";
import SiteInfo from "components/pages/diveSite/SiteInfo";
import AdminLayout from "layouts/admin";

const Moralis = require("moralis/node");
// import getDiveSites from "lib/data/getDiveSites";
export default function DiveSitePage({ siteData, tripData }) {
  const parsedSite = JSON.parse(siteData);
  const parsedTrips = JSON.parse(tripData);

  const diveSite = {
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
    visibility: parsedSite.visibility,
    current: parsedSite.current,
    species: parsedSite.species,
  };

  return (
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
            {/* <iframe
              style={{ borderRadius: "30px" }}
              src="https://www.youtube.com/embed/VNChunf5RKQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            /> */}
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
            depth={diveSite.depth}
            visibility={diveSite.visibility}
            current={diveSite.current}
            access={diveSite.access}
            certLevel={diveSite.certLevel}
            diveTypes={diveSite.diveTypes}
            species={diveSite.species}
          />
        </Box>
        <Box gridArea="1 / 2 / 2 / 3">
          <DiveSiteSidebar
            city={diveSite.city}
            country={diveSite.country}
            trips={parsedTrips}
          />
        </Box>
      </Grid>
    </Box>
  );
}

// export async function getStaticPaths() {
//   // Call an external API endpoint to get sites
//   const { data, status } = await getDiveSites();
//   console.log(data);
//   const diveSites = JSON.stringify(data);
//   // Get the paths we want to pre-render based on posts
//   const diveSiteIds = diveSites.data.map((site) => site.objectId);
//   const paths = diveSiteIds.map((id) => ({
//     params: { id },
//   }));
//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

// export const getStaticProps = async ({ params: { id } }) => {
//   // const { id } = context.params;
//   const { data } = (await getDiveSites()).default;
//   const diveSites = JSON.stringify(data);
//   const diveSite = diveSites.find((site) => site.id === id);

//   return {
//     props: {
//       name: diveSite.data.name,
//       depth: diveSite.data.maxDepth,
//       description: diveSite.data.description,
//       longitude: diveSite.data.longitude,
//       latitude: diveSite.data.latitude,
//       imageUrl: diveSite.data.diveMap.url,
//       access: diveSite.data.access,
//       certLevel: diveSite.data.certLevel,
//       diveTypes: diveSite.data.divingTypes,
//       country: diveSite.data.country,
//       city: diveSite.data.city,
//       species: diveSite.data.species,
//     },
//   };
// };

// export async function getStaticPaths() {
//   const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
//   const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
//   Moralis.initialize(appId);
//   Moralis.serverURL = serverUrl;
//   const DiveSites = Moralis.Object.extend("DiveSites");
//   const query = new Moralis.Query(DiveSites);
//   const results = await query.find();
//   const diveSiteIds = results.map((site) => site.objectId);
//   const data = JSON.stringify(diveSiteIds);
//   const paths = data.map((id) => ({
//     params: { id },
//   }));

//   return { paths, fallback: false };
// }

// export async function getStaticProps(context) {
//   const { id } = context.query;
//   const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
//   const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
//   Moralis.initialize(appId);
//   Moralis.serverURL = serverUrl;
//   const DiveSites = Moralis.Object.extend("DiveSites");
//   const query = new Moralis.Query(DiveSites);
//   query.equalTo("objectId", id);
//   const results = await query.find();
//   const data = JSON.stringify(results[0]);

//   return {
//     props: { data },
//   };
// }

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
  const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
  Moralis.initialize(appId);
  Moralis.serverURL = serverUrl;
  // Get dive site details
  const DiveSites = Moralis.Object.extend("DiveSites");
  const query = new Moralis.Query(DiveSites);
  query.equalTo("objectId", id);
  const results = await query.find();
  const siteData = JSON.stringify(results[0]);
  // Get upcoming dive trips
  // const DiveTrips = Moralis.Object.extend("DiveTrips");
  // const query2 = new Moralis.Query(DiveTrips);
  // query2.contains("diveSite", id);
  // query2.include(["diveCentre"]); // use query2.select
  // const results2 = await query2.find();
  // const tripData = JSON.stringify(results2);
  const tripQuery = await Moralis.Cloud.run("getSiteTrips");
  const tripData = JSON.stringify(tripQuery);

  return {
    props: { siteData, tripData },
  };
};

DiveSitePage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
