/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */

import { chakra, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { motion, AnimatePresence, isValidMotionProp } from "framer-motion";
import { NextSeo } from "next-seo";
import { useContext, useEffect, useState } from "react";

import { supabase } from "../api";
import DiveSiteCard from "components/card/DiveSiteCard";
import TripSearchBar from "components/fields/TripSearchBar";
import { TripSearchContext } from "contexts/TripSearchContext";
import DivingLayout from "layouts/DivingLayout";
import generateDiveSiteRSS from "utils/helpers/generateDiveSiteRSS";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

export default function DiveSites({ diveSites }) {
  const { filterByCity } = useContext(TripSearchContext);
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [city, setCity] = useState(0);
  const [filtered, setFiltered] = useState();
  const [userLikes, setUserLikes] = useState([]);

  const supabaseClient = useSupabaseClient();
  const user = useUser();

  async function getUserLikes() {
    const { data: likes } = await supabaseClient
      .from("site_likes")
      .select("*")
      .eq("user_id", user.id);
    const siteIds = likes.map((like) => like.dive_site_id);
    setUserLikes(siteIds);
  }

  useEffect(() => {
    if (!user) return null;
    getUserLikes();
  }, [user]);

  // console.log("user", user);
  // console.log("userLikes", userLikes);

  useEffect(() => {
    const cityFiltered = filterByCity(diveSites, city);
    setFiltered(cityFiltered);
  }, [diveSites, city]);

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
      <TripSearchBar city={city} setCity={setCity} cityFilter viewButtons />
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
                  <DiveSiteCard
                    key={site.id}
                    id={site.id}
                    image={site.diveMap || "/img/diving/dive_site_bg.jpg"}
                    name={site.name}
                    linkHref={`/dive_sites/${site.slug}`}
                    tagList={site.tags}
                    minDepth={site.minDepth}
                    maxDepth={site.maxDepth}
                    minVis={site.maxVis}
                    maxVis={site.maxVis}
                    minCurrent={site.minCurrent}
                    maxCurrent={site.maxCurrent}
                    userId={user?.id}
                    isLiked={!!userLikes?.includes(site.id)}
                    type="diveSite"
                    // address={`${site.city}, ${site.country}`}
                  />
                );
              })}
          </SimpleGrid>
        </AnimatePresence>
      </ChakraBox>
    </>
  );
}

export async function getStaticProps() {
  // Create authenticated Supabase Client
  // const supabase = createPagesServerClient(ctx);

  const { data: diveSites } = await supabase
    .from("dive_sites_view")
    .select(
      ` id, slug, name, description, latitude, longitude, minVis, maxVis, minDepth, maxDepth,
        minCurrent, maxCurrent, certLevel, tags, access, diveMap, city`
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
