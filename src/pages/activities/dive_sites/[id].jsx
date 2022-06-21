/* eslint-disable react/prop-types */
// Chakra imports
import { AspectRatio, Box, Button, Grid } from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";
import DiveSiteSidebar from "components/pages/diveSite/DiveSiteSidebar";
import SiteInfo from "components/pages/diveSite/SiteInfo";
import AdminLayout from "layouts/admin";

// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import Image from "components/actions/NextChakraImg";

export default function DiveSitePage({
  name,
  depth,
  description,
  imageUrl,
  access,
  certLevel,
  diveTypes,
  country,
  city,
  species,
  // latitude,
  // longitude,
}) {
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
              bgImage={`url(${imageUrl})`}
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
            name={name}
            description={description}
            species={species}
            city={city}
            country={country}
          />
        </Box>
        <Box gridArea="1 / 2 / 2 / 3">
          <DiveSiteSidebar
            depth={depth}
            access={access}
            certLevel={certLevel}
            diveTypes={diveTypes}
          />
        </Box>
      </Grid>
    </Box>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const siteUrl = process.env.VERCEL_URL || "http://localhost:3000";
  const res = await fetch(`${siteUrl}/api/dive_sites`);
  const diveSites = await res.json();
  // Get the paths we want to pre-render based on posts
  const paths = diveSites.data.map((site) => ({
    params: { id: site.objectId },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
  // const { id } = context.params;
  const siteUrl = process.env.VERCEL_URL || "http://localhost:3000";
  const res = await fetch(`${siteUrl}/api/dive_sites/${params.id}`);
  const diveSite = await res.json();

  return {
    props: {
      name: diveSite.data.name,
      depth: diveSite.data.maxDepth,
      description: diveSite.data.description,
      longitude: diveSite.data.longitude,
      latitude: diveSite.data.latitude,
      imageUrl: diveSite.data.diveMap.url,
      access: diveSite.data.access,
      certLevel: diveSite.data.certLevel,
      diveTypes: diveSite.data.divingTypes,
      country: diveSite.data.country,
      city: diveSite.data.city,
      species: diveSite.data.species,
    },
  };
};

DiveSitePage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
