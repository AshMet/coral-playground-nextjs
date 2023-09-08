/* eslint-disable import/no-cycle */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */

import { chakra, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import { motion, AnimatePresence, isValidMotionProp } from "framer-motion";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import { supabase } from "../api/index";
import DiveSiteCard from "components/card/DiveSiteCard";
import CitySelectionField from "components/fields/CitySelectionField";
import DivingLayout from "layouts/DivingLayout";
import generateDiveSiteRSS from "utils/generateDiveSiteRSS";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

export default function DiveSites({ diveSites }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [country, setCountry] = useState();
  const [city, setCity] = useState(0);
  const [filtered, setFiltered] = useState();

  useEffect(() => {
    if (!diveSites) return null;
    if (city === 0 || city === "All Cities") {
      setFiltered(diveSites);
      return;
    }
    const cityFiltered = diveSites.filter((site) => site.city.name === city);
    setFiltered(cityFiltered);
    // console.log("site data", data);
  }, [diveSites, city, country]);

  return (
    <>
      <NextSeo
        title="Scuba Diving Sites in Egypt"
        description={`With ${diveSites?.length} dive sites, book your perfect scuba diving adventure with Coral Playground and experience the wonders of the Red Sea!`}
        openGraph={{
          type: "website",
          title: "Coral Playground | Scuba Diving Sites in Egypt",
          description: `With ${diveSites?.length} dive sites, book your perfect scuba diving adventure with Coral Playground and experience the wonders of the Red Sea!`,
          url: "https://www.coralplayground.com/dive_sites/",
          images: [
            {
              url: "https://www.coralplayground.com/img/diving/dive_site_bg.jpg",
              width: 800,
              height: 600,
              alt: "Dive Sites Cover Photo",
            },
          ],
        }}
      />
      <CitySelectionField
        city={city}
        country={country}
        setCity={setCity}
        setCountry={setCountry}
        pt={{ base: "180px", md: "80px", xl: "80px" }}
      />
      <Text
        mt="25px"
        mb="36px"
        color={textColor}
        fontSize="2xl"
        ms="24px"
        fontWeight="700"
      >
        {filtered?.length} Results
      </Text>
      <ChakraBox layout>
        {/* <motion.div display="grid" displayTemplateColumns="repeat(autoFit, minmax(250px, 1fr)" gridColumnGap="1rem" gridRowGap="2rem"> */}
        <AnimatePresence>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="20px">
            {filtered &&
              filtered.map((site) => {
                return (
                  <Link href={`/dive_sites/${site.slug}`} passHref>
                    <a>
                      <DiveSiteCard
                        key={site.id}
                        id={site.id}
                        image={site.dive_map || "/img/diving/dive_site_bg.jpg"}
                        name={site.name}
                        tagList={site.tags}
                        min_depth={site.min_depth}
                        max_depth={site.max_depth}
                        max_visibility={site.max_visibility}
                        minCurrent={site.min_current}
                        maxCurrent={site.max_current}
                        type="diveSite"
                        // address={`${site.city}, ${site.country}`}
                      />
                    </a>
                  </Link>
                );
              })}
          </SimpleGrid>
        </AnimatePresence>
      </ChakraBox>
    </>
  );
}

export async function getStaticProps() {
  const { data: diveSites } = await supabase
    .from("dive_sites")
    .select(
      ` id, slug, name, description, latitude, longitude, min_visibility, max_visibility, min_depth, max_depth,
        min_current, max_current, cert_level, tags, access, dive_map, updated_at, city: cities (name)`
    )
    .order("name", { ascending: true });
  await generateDiveSiteRSS(diveSites);

  return {
    props: { diveSites },
    revalidate: 86400,
  };
}
DiveSites.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
