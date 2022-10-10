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
import axios from "axios";
import { motion, AnimatePresence, isValidMotionProp } from "framer-motion";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { MdApps, MdDashboard } from "react-icons/md";
// import { useMoralisQuery } from "react-moralis";

// import { SearchBar } from "views/admin/nfts/profile/components/Search";
import DiveSiteCard from "components/card/DiveSiteCard";
import AdminLayout from "layouts/admin";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

export default function DiveSites({ data }) {
  // const { data: tripData } = useMoralisQuery("DiveTrips", (query) =>
  //   query.include("diveCentre")
  // );

  // useEffect(async () => {
  //   console.log("Moralis Trips", tripData);
  //   try {
  //     const results = [];
  //     for (const trip of tripData) {
  //       const tripSitesRelation = trip.relation("diveSites");
  //       const siteList = await tripSitesRelation.query().find();

  //       results.push({
  //         id: trip.id,
  //         diver_cert: trip.attributes.diverCert,
  //         price: trip.attributes.price,
  //         notes: trip.attributes.notes,
  //         start_time: trip.attributes.startTime,
  //         end_time: trip.attributes.endTime,
  //         dive_centre: trip.attributes.diveCentre.attributes.name,
  //         dive_sites: siteList.map((site) => site.attributes.name),
  //         stripe_price_id: "price_1LBLSVAvLPvC9h7xk0HEvL3f",
  //       });
  //     }
  //     console.log("Moralis Trip relations", results);
  //   } catch (error) {
  //     console.error("Error!", error);
  //     return false;
  //   }
  // }, [tripData]);

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
  const [city, setCity] = useState("Hurghada");
  const [filtered, setFiltered] = useState();

  useEffect(() => {
    if (!data) return null;
    if (city === 0 || city === "All Cities") {
      setFiltered(data);
      return;
    }
    const cityFiltered = data.filter((site) => site.city === city);
    setFiltered(cityFiltered);
    console.log("site data", data);
  }, [data, city, country]);

  return (
    <>
      <NextSeo
        title="Dive Sites"
        description="A list of all availble dive sites"
      />
      <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
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
                filtered.map((site) => {
                  return (
                    <DiveSiteCard
                      key={site.id}
                      id={site.id}
                      image={
                        site.dive_map_url || "/img/diving/dive_site_bg.png"
                      }
                      name={site.name}
                      tagList={site.tags}
                      depth={site.depth}
                      maxVisibility={site.max_visibility}
                      current={site.current}
                      type="dive_site"
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
  // const baseUrl =
  //   process.env.VERCEL_ENV === "production"
  //     ? "https://coral-playground-api.herokuapp.com/api/v1"
  //     : "http://localhost:5000/api/v1";
  try {
    const results = await axios.get(
      "https://coral-playground-api.herokuapp.com/api/v1/dive_sites"
    );
    const { data } = results;
    return {
      props: { data },
    };
  } catch (error) {
    console.error(error);
  }
}
DiveSites.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
