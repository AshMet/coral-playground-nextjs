/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable sonarjs/no-duplicate-string */
import {
  chakra,
  Box,
  Button,
  Flex,
  Icon,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence, isValidMotionProp } from "framer-motion";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { MdApps, MdDashboard } from "react-icons/md";

// import { SearchBar } from "views/admin/nfts/profile/components/Search";
import { supabase } from "../../api/index";
import DiveSiteCard from "components/card/DiveSiteCard";
import DivingLayout from "layouts/DivingLayout";

// const Moralis = require("moralis/node");

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

export default function DiveSites({ diveCentres }) {
  // const { image, name, address } = props;
  // const name = "Dive Site";
  // const address = "Hurghada, Egypt";
  // const parsedData = JSON.parse(diveCentres);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const buttonBg = useColorModeValue("transparent", "navy.800");
  const hoverButton = useColorModeValue(
    { bg: "gray.100" },
    { bg: "whiteAlpha.100" }
  );
  const activeButton = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.200" }
  );

  const [country, setCountry] = useState();
  const [city, setCity] = useState(0);
  const [filtered, setFiltered] = useState();

  useEffect(() => {
    if (!diveCentres) return null;
    if (city === 0 || city === "All Cities") {
      setFiltered(diveCentres);
      return;
    }
    // console.log("centres", diveCentres);
    const cityFiltered = diveCentres.filter((centre) => centre.city === city);
    setFiltered(cityFiltered);
    // console.log("centres", diveCentres);
  }, [diveCentres, city, country]);

  return (
    <>
      <NextSeo
        title="Coral Playground | Scuba Diving Centres in Egypt"
        description={`Choose from ${diveCentres.length} scuba dive centres and book your perfect scuba diving adventure with Coral Playground to experience the wonders of the Red Sea!`}
        openGraph={{
          type: "website",
          title: "Coral Playground | Scuba Diving Centres in Egypt",
          description: `Choose from ${diveCentres.length} scuba dive centres and book your perfect scuba diving adventure with Coral Playground to experience the wonders of the Red Sea!`,
          url: "https://www.coralplayground.com/diving/dive_centres/",
          images: [
            {
              url: "https://www.coralplayground.com/img/diving/dive_centre_bg.jpg",
              width: 800,
              height: 600,
              alt: "Dive Centres Cover Photo",
            },
          ],
        }}
      />
      <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        {/* <Text>{JSON.stringify(diveCentres[0].diveMap)}</Text> */}
        <Flex w="100%">
          {/* <SearchBar /> */}
          <Select
            value={country}
            fontSize="sm"
            id="edit_product"
            variant="main"
            h="44px"
            maxh="44px"
            me="20px"
            // placeholder="Please select"
            defaultValue="egypt"
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="Egypt">Egypt</option>
          </Select>
          <Select
            value={city}
            fontSize="sm"
            variant="main"
            h="44px"
            maxh="44px"
            me="20px"
            // placeholder="All Cities"
            defaultValue="All Cities"
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="All Cities">All Cities</option>
            <option value="Hurghada">Hurghada</option>
            <option value="Marsa Alam">Marsa Alam</option>
            <option value="Sharm El Sheikh">Sharm El Sheikh</option>
            <option value="Dahab">Dahab</option>
          </Select>
          <Button
            me="20px"
            bg={buttonBg}
            border="1px solid"
            color="secondaryGray.600"
            borderColor={useColorModeValue(
              "secondaryGray.100",
              "whiteAlpha.100"
            )}
            borderRadius="16px"
            _placeholder={{ color: "secondaryGray.600" }}
            _hover={hoverButton}
            _active={activeButton}
            _focus={activeButton}
          >
            <Icon color={textColor} as={MdDashboard} />
          </Button>
          <Button
            bg={buttonBg}
            border="1px solid"
            color="secondaryGray.600"
            borderColor={useColorModeValue(
              "secondaryGray.100",
              "whiteAlpha.100"
            )}
            borderRadius="16px"
            _placeholder={{ color: "secondaryGray.600" }}
            _hover={hoverButton}
            _active={activeButton}
            _focus={activeButton}
          >
            <Icon color={textColor} as={MdApps} />
          </Button>
        </Flex>
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
                    <DiveSiteCard
                      key={centre.id}
                      id={centre.id}
                      image={
                        centre.coverPhotoUrl || "/img/diving/dive_centre_bg.jpg"
                      }
                      name={centre.name}
                      type="dive_centre"
                      // address={`${site.city}, ${site.country}`}
                    />
                  );
                })}
            </SimpleGrid>
          </AnimatePresence>
        </ChakraBox>
      </Box>
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
