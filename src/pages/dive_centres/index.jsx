/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable sonarjs/no-duplicate-string */
import { chakra, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { motion, AnimatePresence, isValidMotionProp } from "framer-motion";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { useContext, useEffect, useState } from "react";

// import { SearchBar } from "views/admin/nfts/profile/components/Search";
import { supabase } from "../api/index";
import DiveSiteCard from "components/card/DiveSiteCard";
import TripSearchBar from "components/fields/TripSearchBar";
import { TripSearchContext } from "contexts/TripSearchContext";
import DivingLayout from "layouts/DivingLayout";

// const Moralis = require("moralis/node");

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

export default function DiveSites({ diveCentres }) {
  const { filterByCity } = useContext(TripSearchContext);
  const [city, setCity] = useState(0);
  const [filtered, setFiltered] = useState();
  const [userLikes, setUserLikes] = useState([]);
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const supabaseClient = useSupabaseClient();
  const user = useUser();

  async function getUserLikes() {
    const { data: likes } = await supabaseClient
      .from("centre_likes")
      .select("*")
      .eq("user_id", user.id);
    const centreIds = likes.map((like) => like.dive_centre_id);
    setUserLikes(centreIds);
  }

  useEffect(() => {
    if (!user) return null;
    getUserLikes();
  }, [user]);

  useEffect(() => {
    const cityFiltered = filterByCity(diveCentres, city);
    setFiltered(cityFiltered);
  }, [diveCentres, city]);

  // console.log("userLikes", userLikes);

  return (
    <>
      <NextSeo
        title="Scuba Diving Centres in Egypt"
        description={`Choose from ${diveCentres.length} scuba dive centres and book your perfect scuba diving adventure with Coral Playground to experience the wonders of the Red Sea!`}
        openGraph={{
          type: "website",
          title: "Coral Playground | Scuba Diving Centres in Egypt",
          description: `Choose from ${diveCentres.length} scuba dive centres and book your perfect scuba diving adventure with Coral Playground to experience the wonders of the Red Sea!`,
          url: "https://www.coralplayground.com/dive_centres/",
          images: [
            {
              url: "https://www.coralplayground.com/img/diving/og_dive_centres.jpg",
              width: 1200,
              height: 630,
              alt: "Dive Centres Cover Photo with Logo",
            },
          ],
        }}
      />
      <TripSearchBar city={city} setCity={setCity} viewButtons />
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
              filtered.map((centre) => {
                return (
                  <Link href={`/dive_centres/${centre.slug}`} passHref>
                    <a>
                      <DiveSiteCard
                        key={centre.id}
                        id={centre.id}
                        image={
                          centre.coverPhotoUrl ||
                          "/img/diving/dive_centre_bg.jpg"
                        }
                        name={centre.name}
                        isLiked={!!userLikes?.includes(centre.id)}
                        type="diveCentre"
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
  const { data: diveCentres } = await supabase
    .from("active_dive_centres_view")
    .select(
      `
      id, name, description, address, coverPhotoUrl, city, country, slug
    `
    )
    .order("name", { ascending: true });
  return {
    props: { diveCentres },
    revalidate: 86400,
  };
}
DiveSites.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
