/* eslint-disable react/prop-types */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___  
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \ 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/ 
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Badge,
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { LuFuel } from "react-icons/lu";
import { MdOutlineWaterDrop, MdStar, MdStarHalf } from "react-icons/md";
import {
  PiArrowsHorizontalLight,
  PiArrowsVerticalThin,
  PiCalendar,
} from "react-icons/pi";
import { RiSpeedUpLine } from "react-icons/ri";

import Card from "components/card/Card";
import DataIconTile from "components/dataDisplay/DataIconTile";
import Upcoming from "components/pages/diveTrips/Upcoming";
import Cabins from "components/pages/liveaboard/Cabins";
import DivingLayout from "layouts/DivingLayout";
// import { supabase } from "pages/api";

export default function Liveaboards({ diveTrips }) {
  const [currentImage, setCurrentImage] = useState(
    "/img/liveaboards/boat_interior1.webp"
  );
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const Chair1 = "/img/liveaboards/boat_interior2.webp";
  const Chair2 = "/img/liveaboards/boat_interior3.webp";
  const Chair3 = "/img/liveaboards/boat_interior4.webp";
  const Chair4 = "/img/liveaboards/boat_interior5.webp";
  // const Chair5 = "/img/liveaboards/boat_interior6.webp";

  const router = useRouter();

  return (
    <Card mt={{ sm: "75px", md: "75px" }} me={{ lg: "60px" }}>
      <Flex direction="column" w="100%">
        <Flex direction={{ sm: "column", lg: "column", xl: "row" }}>
          <Flex
            direction="column"
            me={{ lg: "40px", xl: "60px" }}
            mb={{ sm: "24px", lg: "0px" }}
          >
            <Box
              w={{
                sm: "fit",
                md: "fit",
                lg: "800px",
                xl: "555px",
                "2xl": "745px",
              }}
              h={{
                sm: "100%",
                md: "100%",
                lg: "300px",
                xl: "250px",
                "2xl": "745px",
              }}
              align
              mx={{ sm: "auto", lg: "auto", xl: "0px" }}
              mt="50px"
              mb={{ sm: "50px", md: "0px" }}
            >
              <Image
                src="/img/liveaboards/boat2.webp"
                width="600px"
                height="200px"
                objectFit="contain"
              />
            </Box>
            <SimpleGrid columns={3} spacing={10}>
              <DataIconTile
                title="Length"
                value="23"
                unit="m"
                icon={<Icon as={PiArrowsVerticalThin} w="20px" h="20px" />}
              />
              <DataIconTile
                title="Width"
                value="14"
                unit="m"
                icon={<Icon as={PiArrowsHorizontalLight} w="20px" h="20px" />}
              />
              <DataIconTile
                title="Speed"
                value="27"
                unit="knots"
                icon={<Icon as={RiSpeedUpLine} w="20px" h="20px" />}
              />
              <DataIconTile
                title="Fuel"
                value="2715"
                unit="L"
                icon={<Icon as={LuFuel} w="20px" h="20px" />}
              />
              <DataIconTile
                title="Water"
                value="13k"
                unit="tons"
                icon={<Icon as={MdOutlineWaterDrop} w="20px" h="20px" />}
              />
              <DataIconTile
                title="Year"
                value="2015"
                unit=""
                icon={<Icon as={PiCalendar} w="20px" h="20px" />}
              />
            </SimpleGrid>
            <Box
              w={{
                sm: "fit",
                md: "fit",
                lg: "800px",
                xl: "555px",
                "2xl": "745px",
              }}
              h={{
                sm: "100%",
                md: "100%",
                lg: "300px",
                xl: "300px",
                "2xl": "745px",
              }}
              mb="26px"
              align
              mx={{ sm: "auto", lg: "auto", xl: "0px" }}
              mt="50px"
              borderRadius="10px"
              overflow="hidden"
            >
              <Image
                src={currentImage}
                width="600px"
                height="350px"
                objectFit="contain"
              />
            </Box>
            <Stack
              direction="row"
              spacing={{ sm: "20px", md: "35px", lg: "20px" }}
              mx="auto"
            >
              <Box borderRadius="10px" overflow="hidden">
                <Image
                  src={Chair1}
                  width="90px"
                  height="90px"
                  cursor="pointer"
                  onClick={(e) => setCurrentImage(e.target.src)}
                />
              </Box>
              <Box borderRadius="10px" overflow="hidden">
                <Image
                  src={Chair2}
                  width="90px"
                  height="90px"
                  cursor="pointer"
                  onClick={(e) => setCurrentImage(e.target.src)}
                />
              </Box>
              <Box borderRadius="10px" overflow="hidden">
                <Image
                  src={Chair3}
                  width="90px"
                  height="90px"
                  cursor="pointer"
                  onClick={(e) => setCurrentImage(e.target.src)}
                />
              </Box>
              <Box borderRadius="10px" overflow="hidden">
                <Image
                  src={Chair4}
                  width="90px"
                  height="90px"
                  cursor="pointer"
                  onClick={(e) => setCurrentImage(e.target.src)}
                />
              </Box>
              <Button
                borderRadius="10px"
                overflow="hidden"
                width="90px"
                height="90px"
                bgColor="blue"
                onClick={() => router.push("/dive_sites/banana_reef/gallery")}
              >
                <Text>View More</Text>
              </Button>
            </Stack>
          </Flex>
          <Flex direction="column">
            <Text
              color={textColor}
              fontSize="3xl"
              fontWeight="bold"
              mb="12px"
              mt={{ sm: "20px", md: "50px", "2xl": "20px", "3xl": "50px" }}
            >
              Ocean Dreams
            </Text>
            <Flex w="min-content">
              <Stack
                direction="row"
                spacing="4px"
                me="6px"
                color="orange.300"
                mb="30px"
              >
                <Icon as={MdStar} w="23px" h="23px" />
                <Icon as={MdStar} w="23px" h="23px" />
                <Icon as={MdStar} w="23px" h="23px" />
                <Icon as={MdStar} w="23px" h="23px" />
                <Icon as={MdStarHalf} w="23px" h="23px" />
              </Stack>
              <Text fontWeight="500" color={textColor}>
                28
              </Text>
            </Flex>
            <Text
              fontColor="secondaryGray.600"
              pe={{ base: "0px", "3xl": "200px" }}
              mb="40px"
            >
              The Ocean Dreams is a diving liveaboard with 5-Star character in
              the Red Sea. 12 modern and spacious, fully air conditioned cabins,
              Each cabin has an en-suite bathroom with separated shower and high
              class fittings, a fridge, safe and either a king size bed or two
              twin beds. 8 lower deck cabins and 4 upper deck cabins await their
              guests.
            </Text>
            <Text
              textDecoration="line-through"
              color="secondaryGray.600"
              fontWeight="500"
              fontSize="md"
              lineHeight="100%"
            >
              $2,999
            </Text>
            <Flex mb="40px" alignItems="center">
              <Text
                color={textColor}
                fontWeight="bold"
                fontSize="38px"
                me="10px"
              >
                $2,599
              </Text>
              <Badge
                colorScheme="green"
                color="green.500"
                h="28px"
                borderRadius="8px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                2 Beds Remaining
              </Badge>
            </Flex>
            <Flex
              mb="50px"
              direction="column"
              w={{ base: "fit", "2xl": "400px" }}
            >
              <SimpleGrid
                columns={{ md: "1", lg: "2" }}
                spacing="20px"
                w={{ base: "fit", "2xl": "400px" }}
                mb="20px"
              >
                <Flex direction="column" mb="14px">
                  <FormLabel
                    ms="10px"
                    htmlFor="color"
                    fontSize="sm"
                    color={textColor}
                    fontWeight="bold"
                    _hover={{ cursor: "pointer" }}
                  >
                    Cabin
                  </FormLabel>
                  <Select
                    fontSize="sm"
                    id="color"
                    variant="main"
                    h="44px"
                    maxh="44px"
                    fontWeight="400"
                    me="20px"
                    defaultValue="dark_grey"
                  >
                    <option value="dark_grey">Master Suite</option>
                    <option value="black">Left</option>
                    <option value="white">Right</option>
                  </Select>
                </Flex>
                <Flex direction="column">
                  <FormLabel
                    ms="10px"
                    htmlFor="quantity"
                    fontSize="sm"
                    color={textColor}
                    fontWeight="bold"
                    _hover={{ cursor: "pointer" }}
                  >
                    Passengers
                  </FormLabel>
                  <Select
                    fontSize="sm"
                    id="quantity"
                    variant="main"
                    h="44px"
                    maxh="44px"
                    fontWeight="400"
                    me="20px"
                    mb="14px"
                    defaultValue="2"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </Select>
                </Flex>
              </SimpleGrid>
              <Button
                variant="brand"
                minW="183px"
                fontSize="sm"
                fontWeight="500"
              >
                Add to cart
              </Button>
            </Flex>
            <Cabins />
          </Flex>
        </Flex>
      </Flex>
      <Upcoming diveTrips={diveTrips} />
    </Card>
  );
}

export async function getStaticProps() {
  // const { data: diveTrips } = await supabase
  //   .from("dive_trips_view")
  //   .select("*")
  //   .order("name", { ascending: true });

  const diveTrips = [
    {
      name: "Brothers, Daedalus & Fury Shoal",
      price: 150000,
      active: true,
      frequency: "One Time",
      deposit: 15000,
      diveCount: 10,
      checkIn: "1.5 hours before",
      startDate: "2023-10-30",
      startTime: "07:00:00",
      endDate: "2023-11-08",
      minCert: "Advanced OW",
    },
    {
      name: "North & Tiran",
      price: 230000,
      active: true,
      frequency: "One Time",
      deposit: 23000,
      diveCount: 12,
      checkIn: "1 hour before",
      startDate: "2023-11-13",
      startTime: "07:00:00",
      endDate: "2023-11-23",
      minCert: "Open Water",
    },
    {
      name: "Hurghada Reef and Wreck Dives",
      price: 110000,
      active: true,
      frequency: "One Time",
      deposit: 11000,
      diveCount: 8,
      checkIn: "2 hours before",
      startDate: "2023-09-26",
      startTime: "07:00:00",
      endDate: "2023-10-03",
      minCert: "Advanced OW",
    },
  ];

  return {
    props: { diveTrips },
    revalidate: 86400,
  };
}

Liveaboards.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
