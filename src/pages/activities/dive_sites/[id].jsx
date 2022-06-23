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
export default function DiveSitePage({ data }) {
  const parsedData = JSON.parse(data);

  const diveSite = {
    name: parsedData.name,
    depth: parsedData.maxDepth,
    description: parsedData.description,
    longitude: parsedData.longitude,
    latitude: parsedData.latitude,
    imageUrl: parsedData.diveMap.url,
    access: parsedData.access,
    certLevel: parsedData.certLevel,
    diveTypes: parsedData.divingTypes,
    country: parsedData.country,
    city: parsedData.city,
    species: parsedData.species,
  };

  return (
    <Box maxW="100%">
      <Grid
        maxW="100%"
        display={{ base: "block", lg: "grid" }}
        pt={{ base: "130px", md: "80px", xl: "80px" }}
        gridTemplateColumns="2.95fr 1fr"
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
              bgSize="cover"
              w=""
              minH={{ base: "310px", md: "100%" }}
              bgImage={`url(${diveSite.imageUrl})`}
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
            species={diveSite.species}
            city={diveSite.city}
            country={diveSite.country}
          />
        </Box>
        <Box gridArea="1 / 2 / 2 / 3">
          <DiveSiteSidebar
            depth={diveSite.depth}
            access={diveSite.access}
            certLevel={diveSite.certLevel}
            diveTypes={diveSite.diveTypes}
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

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
  const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
  Moralis.initialize(appId);
  Moralis.serverURL = serverUrl;
  const DiveSites = Moralis.Object.extend("DiveSite");
  const query = new Moralis.Query(DiveSites);
  query.equalTo("objectId", id);
  const results = await query.find();
  const data = JSON.stringify(results[0]);

  return {
    props: { data },
  };
};
DiveSitePage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
