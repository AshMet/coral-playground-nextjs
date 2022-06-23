/* eslint-disable react/prop-types */
// Chakra imports
import { AspectRatio, Box, Button, Grid } from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";
import DiveCentreSidebar from "components/pages/diveCentre/DiveCentreSidebar";
import SiteInfo from "components/pages/diveCentre/SiteInfo";
import AdminLayout from "layouts/admin";

const Moralis = require("moralis/node");

export default function DiveCentre({ data }) {
  const parsedData = JSON.parse(data);

  const diveCentre = {
    name: parsedData.name,
    address: parsedData.address,
    description: parsedData.description,
    longitude: parsedData.longitude,
    latitude: parsedData.latitude,
    imageUrl: parsedData.photo.url,
    languages: parsedData.languages,
    memberships: parsedData.memberships,
    services: parsedData.services,
    equipment: parsedData.equipment,
    paymentMethods: parsedData.paymentMethods,
    country: parsedData.country,
    city: parsedData.city,
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
              bgImage={`url(${diveCentre.imageUrl})`}
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
            name={diveCentre.name}
            description={diveCentre.description}
            equipment={diveCentre.equipment}
            services={diveCentre.services}
            city={diveCentre.city}
            country={diveCentre.country}
          />
        </Box>
        <Box gridArea="1 / 2 / 2 / 3">
          <DiveCentreSidebar
            address={diveCentre.address}
            paymentMethods={diveCentre.paymentMethods}
            languages={diveCentre.languages}
            memberships={diveCentre.memberships}
          />
        </Box>
      </Grid>
    </Box>
  );
}

// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_SITE_URL}/api/dive_centres`
//   );
//   const diveCentres = await res.json();
//   // Get the paths we want to pre-render based on posts
//   const paths = diveCentres.data.map((site) => ({
//     params: { id: site.objectId },
//   }));
//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

// export const getStaticProps = async ({ params }) => {
//   // const { id } = context.params;
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_SITE_URL}/api/dive_centres/${params.id}`
//   );
//   const diveCentre = await res.json();

//   return {
//     props: {
//       name: diveCentre.data.name,
//       address: diveCentre.data.address,
//       description: diveCentre.data.description,
//       longitude: diveCentre.data.longitude,
//       latitude: diveCentre.data.latitude,
//       imageUrl: diveCentre.data.photo.url,
//       languages: diveCentre.data.languages,
//       memberships: diveCentre.data.memberships,
//       services: diveCentre.data.services,
//       equipment: diveCentre.data.equipment,
//       city: diveCentre.data.city,
//       country: diveCentre.data.country,
//       paymentMethods: diveCentre.data.paymentMethods,
//     },
//   };
// };

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
  const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
  Moralis.initialize(appId);
  Moralis.serverURL = serverUrl;
  const DiveCentres = Moralis.Object.extend("DiveCentres");
  const query = new Moralis.Query(DiveCentres);
  query.equalTo("objectId", id);
  const results = await query.find();
  const data = JSON.stringify(results[0]);

  return {
    props: { data },
  };
};

DiveCentre.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
