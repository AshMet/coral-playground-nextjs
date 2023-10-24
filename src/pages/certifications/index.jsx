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
// Custom components
import { NextSeo } from "next-seo";
import { useState } from "react";

import { supabase } from "../api";
import Course from "components/card/Course";
import CertSidebar from "components/dataDisplay/CertSidebar";
import { VSeparator } from "components/separator/Separator";
import DivingLayout from "layouts/DivingLayout";

export default function Courses({ certs, certCentres }) {
  const [tabState, setTabState] = useState("all");
  const [selectedCertId, setSelectedCertId] = useState();
  const [selectedCentreCert, setSelectedCentreCert] = useState();

  const textColor = useColorModeValue("secondaryGray.900", "white");

  // console.log("certCentres", certCentres);

  const CourseTab = (props) => {
    const { category } = props;
    const categoryCerts = certs?.filter((cert) => cert.category === category);
    return (
      <SimpleGrid column="1" gap="20px">
        {categoryCerts?.map((cert) => {
          return (
            <Course
              key={cert.id}
              cert={cert}
              selectedCertId={selectedCertId}
              setSelectedCertId={setSelectedCertId}
              selected={selectedCertId === cert.id}
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
        gridTemplateColumns={{ md: "2.15fr 1fr", xl: "2.2fr 1fr" }}
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
          <VSeparator mx="15px" h="100%" />
        </Flex>
        {/* <Calendar
          onChange={setStartDate}
          value={startDate}
          // selectRange={selectRange}
          view="month"
          tileContent={<Text color="brand.500" />}
          prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
          nextLabel={
            <Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />
          }
        /> */}
        <CertSidebar
          selectedCertId={selectedCertId}
          selectedCentreCert={selectedCentreCert}
          setSelectedCentreCert={setSelectedCentreCert}
          certCentres={certCentres.filter(
            (cert) => cert.certId === selectedCertId
          )}
        />
      </Grid>
    </>
  );
}

export async function getStaticProps() {
  const { data: certs } = await supabase
    .from("certifications")
    .select(
      "id, name, description, agency, duration, category, price, deposit, stripe_price_id, cover_photo"
    );

  const { data: certCentres } = await supabase
    .from("centre_certs_view")
    .select("*");

  // const { data: certifications } = await supabase.from("certifications").select(
  //   `id, name, description, agency, duration, category, price, deposit, stripe_price_id, cover_photo,
  //     diveCentres: centre_certifications!certification_id (
  //       diveCentre: dive_centre_id (id, name))`
  // );

  return {
    props: { certs, certCentres },
    revalidate: 86400,
  };
}

Courses.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
