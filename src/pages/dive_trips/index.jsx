/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
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
  Divider,
  Stack,
  Heading,
  List,
  ListIcon,
  ListItem,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import { motion, AnimatePresence, isValidMotionProp } from "framer-motion";
// import Link from "next/link";
import { NextSeo } from "next-seo";
import { useContext, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdApps, MdDashboard } from "react-icons/md";
import { PiClockAfternoon, PiCertificate } from "react-icons/pi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbScubaMask } from "react-icons/tb";

import { supabase } from "../api/index";
import DiveTripCard from "components/card/DiveTripCard";
import DateTile from "components/dataDisplay/DateTile";
import Upcoming from "components/pages/diveTrips/Upcoming";
import { CartContext } from "contexts/CartContext";
import DivingLayout from "layouts/DivingLayout";
// import generateDiveSiteRSS from "utils/generateDiveSiteRSS";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

export default function DiveTrips({ diveTrips, cities }) {
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
  // const [filtered, setFiltered] = useState();

  // useEffect(() => {
  //   if (!diveTrips) return null;
  // if (city === 0 || city === "All Cities") {
  //   setFiltered(diveTrips);
  //   return;
  // }
  // const cityFiltered = diveTrips.filter((site) => site.city.name === city);
  // setFiltered(cityFiltered);
  // console.log("site data", data);
  // }, [diveTrips, city, country]);

  return (
    <>
      <NextSeo
        title="Scuba Diving Sites in Egypt"
        description={`With ${diveTrips?.length} dive trips, book your perfect scuba diving adventure with Coral Playground and experience the wonders of the Red Sea!`}
        openGraph={{
          type: "website",
          title: "Coral Playground | Scuba Diving Trips in Egypt",
          description: `With ${diveTrips?.length} dive trips, book your perfect scuba diving adventure with Coral Playground and experience the wonders of the Red Sea!`,
          url: "https://www.coralplayground.com/dive_trips/",
          images: [
            {
              url: "https://www.coralplayground.com/img/diving/dive_site_bg.jpg",
              width: 800,
              height: 600,
              alt: "Dive Trips Cover Photo",
            },
          ],
        }}
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
        <ChakraBox layout>
          {/* <motion.div display="grid" displayTemplateColumns="repeat(autoFit, minmax(250px, 1fr)" gridColumnGap="1rem" gridRowGap="2rem"> */}
          <SimpleGrid columns={{ base: 1, md: 2, xl: 5 }} gap="20px" mt="50px">
            {cities?.map((x) => {
              return (
                <DiveTripCard
                  key={x.id}
                  diveTrip={x}
                  coverPhoto={x.cover_photo}
                />
              );
            })}
          </SimpleGrid>
          <AnimatePresence>
            <Upcoming diveTrips={diveTrips} />
          </AnimatePresence>
        </ChakraBox>
      </Box>
    </>
  );
}

export async function getStaticProps() {
  const { data: diveTrips } = await supabase
    .from("dive_trips_view")
    .select("*")
    .order("name", { ascending: true });
  // await generateDiveSiteRSS(diveSites);

  const { data: cities } = await supabase
    .from("cities")
    .select("*")
    .order("name", { ascending: true });

  return {
    props: { diveTrips, cities },
    revalidate: 86400,
  };
}
DiveTrips.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
