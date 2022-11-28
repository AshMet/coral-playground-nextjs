/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
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
import axios from "axios";
// Custom components
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import MiniCalendar from "components/calendar/MiniCalendar";
import Card from "components/card/Card";
// import Schedule from "views/admin/main/account/courses/components/Schedule";
import Course from "components/card/Course";
import BookingDetails from "components/pages/bookings/BookingDetails";
import { VSeparator } from "components/separator/Separator";
import NftLayout from "layouts/nft";
// import courses from "lib/constants/courses.json";

export default function Courses({ data }) {
  const [tabState, setTabState] = useState("all");
  const [courseId, setCourseId] = useState();
  const [price, setPrice] = useState();
  const [priceId, setPriceId] = useState();
  const [courseName, setCourseName] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [diveTime, setDiveTime] = useState();
  const [courses, setCourses] = useState();
  const [payNow, setPayNow] = useState();

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue(
    "secondaryGray.700",
    "secondaryGray.300"
  );

  useEffect(() => {
    if (!data) return null;
    setCourses(data);
  }, [data]);

  const CourseTab = (props) => {
    const { category } = props;
    const courseList = courses?.filter(
      (course) => course.category === category
    );
    // console.log(`${category}: ${JSON.stringify(courseList)}`)
    return (
      <SimpleGrid column="1" gap="20px">
        {courseList?.map((course) => {
          return (
            <Course
              key={course.id}
              id={course.id}
              imageUrl={course.cover_photo_url}
              title={course.name}
              description={course.description}
              agency={course.agency}
              duration={course.duration}
              category={course.category}
              price={course.price.toFixed(0)}
              priceId={course.stripe_price_id}
              payNow={course.pay_now}
              setCourseId={setCourseId}
              setCourseName={setCourseName}
              setPrice={setPrice}
              setPriceId={setPriceId}
              setPayNow={setPayNow}
              selected={courseName === course.name}
            />
          );
        })}
      </SimpleGrid>
    );
  };

  return (
    <>
      <NextSeo
        title="Dive Certifications"
        description="A list of all availble dive certifications"
      />
      <Grid
        pt={{ base: "130px", md: "80px", xl: "80px" }}
        gridTemplateColumns={{ md: "2.15fr 1fr", xl: "2.5fr 1fr" }}
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
                    bg={tabState === "all" ? "brand.400" : "transparent"}
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
                    bg={tabState === "upcoming" ? "brand.400" : "transparent"}
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
                    bg={tabState === "active" ? "brand.400" : "transparent"}
                    mt="15px"
                    borderRadius="30px"
                  />
                </Tab>
              </Flex>
            </TabList>
            <TabPanels>
              <TabPanel px="0px">
                <CourseTab category="recreational" />
              </TabPanel>
              <TabPanel px="0px">
                <CourseTab category="professional" />
              </TabPanel>
              <TabPanel px="0px">
                <CourseTab category="rescue" />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <VSeparator mx="30px" h="100%" />
        </Flex>
        <Card
          align="center"
          direction="column"
          gridArea="1 / 2 / 2 / 3"
          w="100%"
        >
          <Grid
            templateColumns={{ md: "repeat(2, 1fr)", lg: "1fr" }}
            display={{ base: "block", "3xl": "grid" }}
            gridColumnGap="20px"
          >
            <Flex direction="column" mb="20px">
              <Text
                color={textColor}
                fontSize="lg"
                fontWeight="700"
                lineHeight="100%"
              >
                Complete Your Booking
              </Text>
              <Text color={textColorSecondary} fontSize="sm" mt="10px">
                Select the certification, date and dive centre, then add to your
                cart for checkout
              </Text>
            </Flex>
            <MiniCalendar
              gridArea={{ md: "1 / 1 / 2 / 2;", lg: "1 / 1 / 2 / 2" }}
              selectRange={false}
              mb="20px"
              setSelectedDate={setSelectedDate}
              setDiveTime={setDiveTime}
            />
            <BookingDetails
              courseName={courseName}
              courseId={courseId}
              price={price}
              priceId={priceId}
              setSelectedDate={setSelectedDate}
              diveDate={selectedDate}
              diveTime={diveTime}
              payNow={payNow}
              gridArea={{ md: "1 / 2 / 2 / 3", lg: "2 / 1 / 3 / 2" }}
              mb="20px"
            />
          </Grid>
        </Card>
      </Grid>
    </>
  );
}

export async function getStaticProps() {
  try {
    const results = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/certifications`
    );
    const { data } = results;
    return {
      props: { data },
    };
  } catch (error) {
    // console.error(error);
  }
}

Courses.getLayout = function getLayout(page) {
  return <NftLayout>{page}</NftLayout>;
};
