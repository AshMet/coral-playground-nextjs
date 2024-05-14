/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
// Chakra imports
import { Button, Flex, Grid, Text } from "@chakra-ui/react";
// Custom components
// import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
// import { usePostHog } from "posthog-js/react";
// import { useEffect, useState } from "react";
// import slugify from "slugify";

import Card from "components/card/Card";
import Conditions from "components/pages/diveLog/Conditions";
import Equipment from "components/pages/diveLog/Equipment";
import LogDetails from "components/pages/diveLog/LogDetails";
import Usage from "components/pages/diveLog/Usage";
import SpeciesTab from "components/pages/diveSite/SpeciesTab";
import { VSeparator } from "components/separator/Separator";
import DivingLayout from "layouts/DivingLayout";
import { supabase } from "pages/api/index";

export default function DiveLogPage({ diveLog, equipment, species }) {
  // const posthog = usePostHog();

  // console.log("siteData", diveLog);
  // useEffect(() => {
  //   posthog.capture("$pageview", {
  //     "Dive Site": diveLog.name,
  //     City: diveLog.city,
  //     Country: diveLog.country,
  //   });
  // }, []);

  return (
    <>
      <NextSeo
        title={`Dive Log in ${diveLog.siteName}`}
        description={`Book your next scuba diving trip in ${diveLog.city}, ${diveLog.country} with Coral Playground today for an unforgattable trip`}
        canonical={`https://www.coralplayground.com/dive_logs/${diveLog.id}`}
        openGraph={{
          type: "website",
          title: `Experience diving at ${diveLog.name}`,
          description: `Book your next scuba diving trip in ${diveLog.city}, ${diveLog.country} with Coral Playground today for an unforgattable trip`,
          url: `https://www.coralplayground.com/dive_logs/${diveLog.id}`,
          // images: [
          //   {
          //     url: diveLog.diveMap,
          //     width: 1200,
          //     height: 630,
          //     alt: `Dive Site Cover Photo - ${diveLog.name}`,
          //   },
          // ],
        }}
      />
      <Flex
        direction={{ base: "column", xl: "row" }}
        // pt={{ base: "130px", md: "80px", xl: "80px" }}
      >
        <Flex direction="column" width={{ sm: "stretch", lg: "2xl" }}>
          <LogDetails diveLog={diveLog} />
          <Card
            bgSize="cover"
            mt="20px"
            w=""
            minH="310px"
            bgImage={diveLog.diveMap || "/img/diving/2-cuttlefish.webp"}
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
        </Flex>

        <VSeparator
          mx="20px"
          // bg={paleGray}
          display={{ base: "none", xl: "flex" }}
        />

        <Flex direction="column" width="stretch">
          <Grid
            mb="20px"
            gridTemplateColumns={{
              base: "repeat(1fr, 2)",
              "2xl": "350fr 720fr ",
            }}
            gap="20px"
            display={{ base: "block", lg: "grid" }}
          >
            <Flex
              gridArea={{ base: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
              mt={{ sm: "20px", lg: "0px" }}
            >
              <Usage diveLog={diveLog} />
            </Flex>
            <Flex
              gridArea={{ base: "2 / 1 / 3 / 3", "2xl": "1 / 2 / 2 / 2" }}
              mt={{ sm: "20px", lg: "0px" }}
            >
              <Conditions
                avgDepth={diveLog.avgDepth}
                maxDepth={diveLog.maxDepth}
                visibility={diveLog.visibility}
                current={diveLog.current}
                surfaceTemp={diveLog.surfaceTemp}
                bottomTemp={diveLog.bottomTemp}
              />
            </Flex>
          </Grid>
          <Equipment equipment={equipment} />
          <Card p="30px" mt="20px">
            <Text
              fontSize="lg"
              lineHeight="100%"
              // color={textColor}
              fontWeight="bold"
            >
              Species
            </Text>
            <SpeciesTab species={species} />
          </Card>
        </Flex>
      </Flex>
    </>
  );
}

export const getStaticPaths = async () => {
  const { data: diveLogs } = await supabase.from("dive_logs").select("id");

  const paths = diveLogs.map(({ id }) => ({
    params: {
      id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const { data: diveLog } = await supabase
    .from("dive_logs_view")
    .select("*")
    .match({ id })
    .single();

  const { data: equipment } = await supabase
    .from("log_equipment_view")
    .select("*")
    .eq("diveLogId", diveLog.id)
    .order("equipmentName", { ascending: true });

  const { data: species } = await supabase
    .from("log_species_view")
    .select("*")
    .eq("diveLogId", diveLog.id);

  return {
    props: {
      diveLog,
      equipment,
      species,
    },
    revalidate: 60,
  };
};

DiveLogPage.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
