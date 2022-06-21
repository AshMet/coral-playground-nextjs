/* eslint-disable react/prop-types */
// Chakra imports
import { AspectRatio, Box, Button, Grid } from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";
import DiveCentreSidebar from "components/pages/diveCentre/DiveCentreSidebar";
import SiteInfo from "components/pages/diveCentre/SiteInfo";
import AdminLayout from "layouts/admin";

// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import Image from "components/actions/NextChakraImg";

export default function DiveCentre({
  name,
  address,
  description,
  // latitude,
  // longitude,
  imageUrl,
  languages,
  memberships,
  services,
  equipment,
  paymentMethods,
  city,
  country,
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
            equipment={equipment}
            services={services}
            city={city}
            country={country}
          />
        </Box>
        <Box gridArea="1 / 2 / 2 / 3">
          <DiveCentreSidebar
            address={address}
            paymentMethods={paymentMethods}
            languages={languages}
            memberships={memberships}
          />
        </Box>
      </Grid>
    </Box>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/dive_centres`
  );
  const diveCentres = await res.json();
  // Get the paths we want to pre-render based on posts
  const paths = diveCentres.data.map((site) => ({
    params: { id: site.objectId },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
  // const { id } = context.params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/dive_centres/${params.id}`
  );
  const diveCentre = await res.json();

  return {
    props: {
      name: diveCentre.data.name,
      address: diveCentre.data.address,
      description: diveCentre.data.description,
      longitude: diveCentre.data.longitude,
      latitude: diveCentre.data.latitude,
      imageUrl: diveCentre.data.photo.url,
      languages: diveCentre.data.languages,
      memberships: diveCentre.data.memberships,
      services: diveCentre.data.services,
      equipment: diveCentre.data.equipment,
      city: diveCentre.data.city,
      country: diveCentre.data.country,
      paymentMethods: diveCentre.data.paymentMethods,
    },
  };
};

DiveCentre.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
