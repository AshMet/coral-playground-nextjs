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
import { CartContext } from "contexts/CartContext";
import DivingLayout from "layouts/DivingLayout";
// import generateDiveSiteRSS from "utils/generateDiveSiteRSS";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const DateTile = ({ date, time }) => {
  return (
    <Stack>
      <Flex
        // me="20px"
        direction="column"
        align="center"
        justify="center"
        w="77px"
        h="77px"
        borderRadius="15px"
        bg="purple.400"
      >
        <Text mb="2px" fontSize="md" fontWeight="500" color="black">
          {date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          })}
        </Text>
        <Text lineHeight="100%" fontSize="25px" fontWeight="700" color="black">
          {time?.split(":")[0]}:{time?.split(":")[1]}
        </Text>
      </Flex>
    </Stack>
  );
};

const TripLineItem = ({ trip, checked = false }) => {
  const colorTextLight = checked ? "white" : "purple.600";
  const bgColorLight = checked ? "purple.400" : "gray.300";

  const colorTextDark = checked ? "white" : "purple.500";
  const bgColorDark = checked ? "purple.400" : "gray.300";
  const { addToCart } = useContext(CartContext);

  const {
    name,
    diveCentreName,
    minCert,
    diveCount,
    startDate,
    startTime,
    endDate,
    duration,
    price,
    deposit,
    stripePriceId,
    checkIn,
  } = trip;

  function combineDateAndTime(date, time) {
    const year = date.getFullYear();
    const month = date.getMonth(); // Jan is 0, dec is 11
    const day = date.getDate();
    const hours = time.split(":")[0];
    const minutes = time.split(":")[1];
    return new Date(year, month, day, hours, minutes, 0);
    // const dateString = `${year}-${month}-${day}`;
    // return new Date(`${dateString} ${time}`);
  }

  console.log("trip", trip);

  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{
        base: "center",
        md: "space-around",
      }}
      direction={{
        base: "column",
        md: "row",
      }}
      alignItems={{ md: "center" }}
    >
      <Stack direction="row" justify="center" align="center">
        <DateTile date={new Date(startDate)} time={startTime} />
        <Spacer />
        <Text>to</Text>
        <Spacer />
        <DateTile date={new Date(endDate)} time={startTime} />
      </Stack>

      <Stack w={{ sm: "100%", lg: "55%" }} pl="20px">
        <Heading size="md">{name}</Heading>
        <Text color="gray.500" fontSize="xl">
          {diveCentreName}
        </Text>
      </Stack>
      <List spacing={3} textAlign="start" w={{ sm: "50%", lg: "20%" }}>
        <ListItem>
          <ListIcon as={TbScubaMask} />
          {diveCount} Dives
        </ListItem>
        <ListItem>
          <ListIcon as={PiCertificate} />
          {minCert}
        </ListItem>
        <ListItem>
          <ListIcon as={PiClockAfternoon} />
          {checkIn}
        </ListItem>
      </List>
      <Heading size="xl" w={{ sm: "50%", lg: "10%" }} color="green.500">
        €{price / 100}
      </Heading>
      <Stack w={{ sm: "100%", lg: "15%" }}>
        <Button
          size="md"
          color={useColorModeValue(colorTextLight, colorTextDark)}
          bgColor={useColorModeValue(bgColorLight, bgColorDark)}
          onClick={() =>
            addToCart({
              id: trip.id,
              title: trip.name,
              itemType: "diveTrip",
              centreName: trip.diveCentreName,
              // diveDate: diveDate ? new Date(diveDate) : new Date(value),
              diveDate: combineDateAndTime(
                new Date(trip.startDate),
                trip.startTime
              ),
              diveTime: trip.startTime,
              price: trip.price,
              priceId: trip.stripePriceId,
              deposit: trip.depsit,
            })
          }
        >
          Reserve for €{deposit / 100}
        </Button>
      </Stack>
    </Stack>
  );
};

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
            <Box py={6} px={5} width="full">
              <Stack spacing={4} width="100%" direction="column">
                <Stack
                  p={5}
                  alignItems="center"
                  justifyContent={{
                    base: "flex-start",
                    md: "space-around",
                  }}
                  direction={{
                    base: "column",
                    md: "row",
                  }}
                >
                  <Stack
                    width={{
                      base: "100%",
                      md: "40%",
                    }}
                    textAlign="center"
                  >
                    <Heading size="lg">
                      <Text color="purple.400">
                        Upcoming{" "}
                        <Text as="span" color={textColor}>
                          Dive Trips
                        </Text>
                      </Text>
                    </Heading>
                  </Stack>
                  <Stack
                    width={{
                      base: "100%",
                      md: "60%",
                    }}
                  >
                    <Text textAlign="center">
                      Reserve your trip below. The remainder will be payable
                      directly to the dive center.
                    </Text>
                  </Stack>
                </Stack>
                <Divider />
                {diveTrips
                  ?.filter((trip) => trip?.startDate !== null)
                  .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                  .map((trip) => {
                    return (
                      <>
                        <TripLineItem key={trip.id} trip={trip} />
                        <Divider />
                      </>
                    );
                  })}
              </Stack>
            </Box>
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
