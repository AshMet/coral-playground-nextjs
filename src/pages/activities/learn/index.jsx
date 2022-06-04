/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable func-names */
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
  Box,
  Flex,
  Text,
  useColorModeValue,
  SimpleGrid,
  Grid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
// Custom components
import { useState } from "react";

import MiniCalendar from "components/calendar/MiniCalendar";
import Card from "components/card/Card";
// import Schedule from "views/admin/main/account/courses/components/Schedule";
import Course from "components/card/Course";
import { VSeparator } from "components/separator/Separator";
import AdminLayout from "layouts/admin";

export default function Courses() {
  const [tabState, setTabState] = useState("all");

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const beginnerCourses = (
    <SimpleGrid columns="1" gap="20px">
      <Course
        bgBox="linear-gradient(115.07deg, #29E9F5 -9.41%, #7A64FF 28.04%, #FF508B 71.85%, #FD6D53 112.49%, #FD6D53 112.49%)"
        imageUrl="/svg/certifications/open_water_cert.svg"
        title="Discover Scuba Diving"
        desc={`Have you always wondered what it's like to breathe underwater?
                If you want to try scuba diving, but aren't quite ready to take
                the plunge into a certification course, Discover Scuba Diving is
                for you. A quick and easy introduction into what it takes to
                explore the underwater world. Although this is not a scuba
                certification course, you'll learn all the steps it takes to be
                a PADI certified diver.`}
        agency="PADI®"
        duration="3-4 days"
        price="$150"
        priceId="price_1KuKzvAvLPvC9h7xv48NXNwx"
      />
      <Course
        bgBox="linear-gradient(292.37deg, #92FE9D 10.84%, #00C9FF 95.27%)"
        imageUrl="/svg/certifications/open_water_cert.svg"
        title="Open Water Diver"
        desc={`This is the first scuba certification level. A highly-trained
                PADI Instructor will teach you how to scuba dive in a relaxed,
                supportive learning environment. By the end of the course,
                you'll have the skills and knowledge to dive at home or abroad
                and be an ambassador for the underwater world.`}
        agency="PADI®"
        duration="3-4 days"
        price="$300"
        priceId="price_1Ku8SWAvLPvC9h7xzfnsF4fi"
      />
      <Course
        bgBox="linear-gradient(109.6deg, #FF9966 17.44%, #FF5E62 78.63%)"
        imageUrl="/svg/certifications/advanced_diver_cert.svg"
        title="Advanced Open Water Diver"
        desc={`You'll practice navigation and buoyancy, try deep diving and
                make three specialty dives of your choosing (it's like a
                specialty sampler platter). For every specialty dive you
                complete, you can earn credit toward PADI® specialty
                certifications. Here are a few of the many options: Deep,
                Digital Underwater Photography, Dive Against Debris, Dry Suit,
                Enriched Air Nitrox, Fish Identification, Night, Peak
                Performance Buoyancy, Search & Recovery, Underwater Naturalist,
                Underwater Navigation, and Wreck Diver.`}
        agency="PADI®"
        duration="3-4 days"
        price="$270"
        priceId="price_1KuL2sAvLPvC9h7xhpASS4NB"
      />
    </SimpleGrid>
  );
  const proCourses = (
    <SimpleGrid columns="1" gap="20px">
      <Course
        bgBox="linear-gradient(109.6deg, #FF9966 17.44%, #FF5E62 78.63%)"
        imageUrl="/svg/certifications/dive_master_cert.svg"
        title="Master Scuba Diver"
        desc={`Join the best of the best in recreational scuba diving and live
              the dive life as a PADI Master Scuba Diver. The Master Scuba
              Diver rating places you in an elite group of respected divers
              who have earned this rating through both significant experience
              and scuba training. Fewer than two percent of divers ever
              achieve this rating. When you flash your Master Scuba Diver
              card, people know that you've spent time underwater in a variety
              of environments and had your share of dive adventures.`}
        agency="PADI®"
        duration="3-4 days"
        price="$900"
        priceId="price_1KuL5bAvLPvC9h7xGzAUvk7Y"
      />
      <Course
        bgBox="linear-gradient(115.07deg, #29E9F5 -9.41%, #7A64FF 28.04%, #FF508B 71.85%, #FD6D53 112.49%, #FD6D53 112.49%)"
        imageUrl="/svg/certifications/advanced_diver_cert.svg"
        title="Nitrox Diver"
        desc={`Enriched air, also known as nitrox or EANx, contains less
              nitrogen than regular air. Breathing less nitrogen means you can
              enjoy longer dives and shorter surface intervals. No wonder
              Enriched Air Diver is the most popular PADI® specialty.`}
        agency="PADI®"
        duration="3-4 days"
        price="$120"
        priceId="price_1KuL8pAvLPvC9h7x68kesoC4"
      />
    </SimpleGrid>
  );
  const rescueCourses = (
    <Course
      bgBox="linear-gradient(109.6deg, #FF9966 17.44%, #FF5E62 78.63%)"
      imageUrl="/svg/certifications/advanced_diver_cert.svg"
      title="Rescue Diver"
      desc={`The PADI® Rescue Diver course will change the way you dive – in
              the best possible way. Learn to identify and fix minor issues
              before they become big problems, gain a lot of confidence and
              have serious fun along the way. Discover why countless divers
              say Rescue Diver is their favorite scuba course.`}
      agency="PADI®"
      duration="3-4 days"
      price="$160"
      priceId="price_1KuL7SAvLPvC9h7xvvM2KS3r"
    />
  );
  // Chakra Color Mode
  return (
    <Grid
      pt={{ base: "130px", md: "80px", xl: "80px" }}
      gridTemplateColumns={{ md: "2.15fr 1fr", xl: "2.95fr 1fr" }}
      display={{ base: "block", lg: "grid" }}
    >
      <Flex gridArea="1 / 1 / 2 / 2" display={{ base: "block", lg: "flex" }}>
        <Tabs variant="soft-rounded" colorScheme="brandTabs">
          <TabList
            mx={{ base: "10px", lg: "30px" }}
            overflowX={{ sm: "scroll", lg: "unset" }}
          >
            <Flex>
              <Tab
                pb="0px"
                flexDirection="column"
                onClick={function () {
                  setTabState("all");
                }}
                me="10px"
                bg="unset"
                _selected={{
                  bg: "none",
                }}
                _focus={{ border: "none" }}
                minW="max-content"
              >
                <Flex align="center">
                  <Text
                    color={textColor}
                    fontSize="lg"
                    fontWeight="500"
                    me="12px"
                  >
                    Recreational
                  </Text>
                  <Text
                    color="secondaryGray.600"
                    fontSize="md"
                    fontWeight="400"
                  >
                    3
                  </Text>
                </Flex>
                <Box
                  height="4px"
                  w="100%"
                  transition="0.1s linear"
                  bg={tabState === "all" ? "brand.500" : "transparent"}
                  mt="15px"
                  borderRadius="30px"
                />
              </Tab>
              <Tab
                onClick={function () {
                  setTabState("upcoming");
                }}
                pb="0px"
                me="10px"
                bg="unset"
                _selected={{
                  bg: "none",
                }}
                _focus={{ border: "none" }}
                minW="max-content"
                flexDirection="column"
              >
                <Flex align="center">
                  <Text
                    color={textColor}
                    fontSize="lg"
                    fontWeight="500"
                    me="12px"
                  >
                    Professional
                  </Text>
                  <Text
                    color="secondaryGray.600"
                    fontSize="md"
                    fontWeight="400"
                  >
                    2
                  </Text>
                </Flex>
                <Box
                  height="4px"
                  w="100%"
                  transition="0.1s linear"
                  bg={tabState === "upcoming" ? "brand.500" : "transparent"}
                  mt="15px"
                  borderRadius="30px"
                />
              </Tab>
              <Tab
                pb="0px"
                flexDirection="column"
                onClick={function () {
                  setTabState("active");
                }}
                bg="unset"
                _selected={{
                  bg: "none",
                }}
                _focus={{ border: "none" }}
                minW="max-content"
              >
                <Flex align="center">
                  <Text
                    color={textColor}
                    fontSize="lg"
                    fontWeight="500"
                    me="12px"
                  >
                    Rescue
                  </Text>
                  <Text
                    color="secondaryGray.600"
                    fontSize="md"
                    fontWeight="400"
                  >
                    1
                  </Text>
                </Flex>
                <Box
                  height="4px"
                  w="100%"
                  transition="0.1s linear"
                  bg={tabState === "active" ? "brand.500" : "transparent"}
                  mt="15px"
                  borderRadius="30px"
                />
              </Tab>
            </Flex>
          </TabList>
          <TabPanels>
            <TabPanel px="0px">{beginnerCourses}</TabPanel>
            <TabPanel px="0px">{proCourses}</TabPanel>
            <TabPanel px="0px">{rescueCourses}</TabPanel>
          </TabPanels>
        </Tabs>
        <VSeparator mx="30px" h="100%" />
      </Flex>
      <Card align="center" direction="column" gridArea="1 / 2 / 2 / 3" w="100%">
        <Grid
          templateColumns={{ md: "repeat(2, 1fr)", lg: "1fr" }}
          display={{ base: "block", "3xl": "grid" }}
          gridColumnGap="20px"
        >
          <MiniCalendar
            gridArea={{ md: "1 / 1 / 2 / 2;", lg: "1 / 1 / 2 / 2" }}
            selectRange={false}
            mb="20px"
          />
          {/* <Schedule
            gridArea={{ md: "1 / 2 / 2 / 3", lg: "2 / 1 / 3 / 2" }}
            mb="20px"
          /> */}
        </Grid>
      </Card>
    </Grid>
  );
}

Courses.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
