/* eslint-disable react/prop-types */
// Chakra imports
import { AspectRatio, Box, Button, Grid } from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";
import DiveCentreSidebar from "components/pages/diveCentre/DiveCentreSidebar";
import SiteInfo from "components/pages/diveCentre/SiteInfo";
import AdminLayout from "layouts/admin";

const Moralis = require("moralis/node");

export default function DiveCentre({ centreData, tripData }) {
  const parsedCentre = JSON.parse(centreData);
  const parsedTrips = JSON.parse(tripData);

  const diveCentre = {
    id: parsedCentre.objectId,
    name: parsedCentre.name,
    address: parsedCentre.address,
    description: parsedCentre.description,
    longitude: parsedCentre.longitude,
    latitude: parsedCentre.latitude,
    imageUrl: parsedCentre.coverPhoto
      ? parsedCentre.coverPhoto.url
      : "/img/diving/dive_centre_bg.jpg",
    languages: parsedCentre.languages,
    memberships: parsedCentre.memberships,
    services: parsedCentre.services,
    equipment: parsedCentre.equipment,
    paymentMethods: parsedCentre.paymentMethods,
    country: parsedCentre.country,
    city: parsedCentre.city,
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
              minH={{ base: "200px", md: "100%" }}
              bgImage={diveCentre.imageUrl}
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
            paymentMethods={diveCentre.paymentMethods}
            languages={diveCentre.languages}
            memberships={diveCentre.memberships}
          />
        </Box>
        <Box gridArea="1 / 2 / 2 / 3">
          <DiveCentreSidebar
            centreId={diveCentre.id}
            centreName={diveCentre.name}
            address={diveCentre.address}
            city={diveCentre.city}
            country={diveCentre.country}
            trips={parsedTrips}
          />
        </Box>
      </Grid>
    </Box>
  );
}

export async function getStaticPaths() {
  const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
  const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
  Moralis.initialize(appId);
  Moralis.serverURL = serverUrl;
  const DiveCentres = Moralis.Object.extend("DiveCentres");
  const query = new Moralis.Query(DiveCentres);
  const results = await query.find();
  const paths = results.map((centre) => ({
    params: { id: centre.id },
  }));

  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
  const centreId = params.id;
  const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
  const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
  Moralis.initialize(appId);
  Moralis.serverURL = serverUrl;
  // Get dive site details
  const DiveCentres = Moralis.Object.extend("DiveCentres");
  const query = new Moralis.Query(DiveCentres);
  query.equalTo("objectId", centreId);
  const results = await query.find();
  const centreData = JSON.stringify(results[0]);
  // Get upcoming dive trips
  const tripQuery = await Moralis.Cloud.run("getCentreTrips", { id: centreId });
  const tripData = JSON.stringify(tripQuery);

  return {
    props: { centreData, tripData },
  };
};

// export const getServerSideProps = async (context) => {
//   const { id } = context.query;
//   const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
//   const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
//   Moralis.initialize(appId);
//   Moralis.serverURL = serverUrl;
//   const DiveCentres = Moralis.Object.extend("DiveCentres");
//   const query = new Moralis.Query(DiveCentres);
//   query.equalTo("objectId", id);
//   const results = await query.find();
//   const centreData = JSON.stringify(results[0]);
//   // Get upcoming dive trips
//   const params = { id };
//   const tripQuery = await Moralis.Cloud.run("getCentreTrips", params);
//   const tripData = JSON.stringify(tripQuery);

//   return {
//     props: { centreData, tripData },
//   };
// };

DiveCentre.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
