/* eslint-disable react/prop-types */
/* eslint-disable complexity */
/* eslint-disable import/no-cycle */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-nested-ternary */
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useRef, useState } from "react";

// Custom components
import DiverInfo from "components/pages/bookings/DiverInfo";
// import DiveSelection from "components/pages/bookings/DiveSelection";
import EquipmentSelection from "components/pages/bookings/EquipmentSelection";
import SummaryTable from "components/pages/bookings/SummaryTable";
import DivingLayout from "layouts/DivingLayout";
import { supabase } from "utils/supabase";

export default function NewBooking({ equipment }) {
  const [activeBullets, setActiveBullets] = useState({
    product: true,
    media: false,
    pricing: false,
  });

  const equipmentTab = useRef();
  const summaryTab = useRef();
  const diverInfoTab = useRef();
  // const brand = useColorModeValue("brand.500", "brand.400");

  return (
    <>
      <NextSeo
        title="Dive Booking"
        description="Complete your booking details and proceed to payment"
      />
      <Flex
        direction="column"
        minH="100vh"
        align="center"
        pt={{ sm: "125px", lg: "75px" }}
        position="relative"
      >
        <Box
          h="25vh"
          bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
          position="absolute"
          w="100%"
          borderRadius="30px"
        />

        <Tabs
          variant="unstyled"
          mt={{ base: "60px", md: "65px" }}
          zIndex="0"
          display="flex"
          flexDirection="column"
        >
          {/* Tab Selection */}
          <TabList
            display="flex"
            align="center"
            alignSelf="center"
            justifySelf="center"
          >
            <Tab
              ref={equipmentTab}
              _focus="none"
              w={{ sm: "120px", md: "250px", lg: "300px" }}
              onClick={() =>
                setActiveBullets({
                  product: true,
                  media: false,
                  pricing: false,
                })
              }
            >
              <Flex
                direction="column"
                justify="center"
                align="center"
                position="relative"
                _before={{
                  content: "''",
                  width: { sm: "120px", md: "250px", lg: "300px" },
                  height: "3px",
                  bg: activeBullets.media ? "white" : "#8476FF",
                  left: { sm: "12px", md: "40px" },
                  top: {
                    sm: activeBullets.product ? "6px" : "4px",
                    md: null,
                  },
                  position: "absolute",
                  bottom: activeBullets.product ? "40px" : "38px",

                  transition: "all .3s ease",
                }}
              >
                <Box
                  zIndex="1"
                  border="2px solid"
                  borderColor={activeBullets.product ? "white" : "#8476FF"}
                  bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
                  w="16px"
                  h="16px"
                  mb="8px"
                  borderRadius="50%"
                />
                <Text
                  color={activeBullets.product ? "white" : "gray.300"}
                  fontWeight={activeBullets.product ? "bold" : "normal"}
                  display={{ sm: "none", md: "block" }}
                >
                  Equipment
                </Text>
                <Text
                  color={activeBullets.product ? "white" : "gray.300"}
                  fontWeight={activeBullets.product ? "bold" : "normal"}
                  display={{ sm: "block", md: "none" }}
                >
                  Step 1
                </Text>
              </Flex>
            </Tab>
            <Tab
              ref={summaryTab}
              _focus="none"
              w={{ sm: "120px", md: "250px", lg: "300px" }}
              onClick={() =>
                setActiveBullets({
                  product: true,
                  media: true,
                  pricing: false,
                })
              }
            >
              <Flex
                direction="column"
                justify="center"
                align="center"
                position="relative"
                _before={{
                  content: "''",
                  width: { sm: "120px", md: "250px", lg: "300px" },
                  height: "3px",
                  bg: activeBullets.pricing ? "white" : "#8476FF",
                  left: { sm: "12px", md: "28px" },
                  top: "6px",
                  position: "absolute",
                  bottom: activeBullets.media ? "40px" : "38px",

                  transition: "all .3s ease",
                }}
              >
                <Box
                  zIndex="1"
                  border="2px solid"
                  borderColor={activeBullets.media ? "white" : "#8476FF"}
                  bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
                  w="16px"
                  h="16px"
                  mb="8px"
                  borderRadius="50%"
                />
                <Text
                  color={activeBullets.media ? "white" : "gray.300"}
                  fontWeight={activeBullets.media ? "bold" : "normal"}
                  display={{ sm: "none", md: "block" }}
                >
                  Summary
                </Text>
                <Text
                  color={activeBullets.product ? "white" : "gray.300"}
                  fontWeight={activeBullets.product ? "bold" : "normal"}
                  display={{ sm: "block", md: "none" }}
                >
                  Step 2
                </Text>
              </Flex>
            </Tab>
            <Tab
              ref={diverInfoTab}
              _focus="none"
              w={{ sm: "120px", md: "250px", lg: "300px" }}
              onClick={() =>
                setActiveBullets({
                  product: true,
                  media: true,
                  pricing: true,
                })
              }
            >
              <Flex
                direction="column"
                justify="center"
                align="center"
                position="relative"
              >
                <Box
                  zIndex="1"
                  border="2px solid"
                  borderColor={activeBullets.pricing ? "white" : "#8476FF"}
                  bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
                  w="16px"
                  h="16px"
                  mb="8px"
                  borderRadius="50%"
                />
                <Text
                  color={activeBullets.pricing ? "white" : "gray.300"}
                  fontWeight={activeBullets.pricing ? "bold" : "normal"}
                  display={{ sm: "none", md: "block" }}
                >
                  Diver Info
                </Text>
                <Text
                  color={activeBullets.product ? "white" : "gray.300"}
                  fontWeight={activeBullets.product ? "bold" : "normal"}
                  display={{ sm: "block", md: "none" }}
                >
                  Step 3
                </Text>
              </Flex>
            </Tab>
          </TabList>
          <TabPanels mt="24px" maxW={{ md: "90%", lg: "100%" }} mx="auto">
            {/* Panel 1: Dive Selection */}
            <TabPanel
              w={{ sm: "330px", md: "700px", lg: "850px" }}
              p="0px"
              mx="auto"
            >
              <EquipmentSelection
                summaryTab={summaryTab}
                equipment={equipment}
              />
            </TabPanel>
            {/* Panel 2: Price Breakdown Summary */}
            <TabPanel
              w={{ sm: "330px", md: "700px", lg: "850px" }}
              p="0px"
              mx="auto"
            >
              <SummaryTable
                equipmentTab={equipmentTab}
                diverInfoTab={diverInfoTab}
              />
            </TabPanel>
            {/* Panel 3: Pricing */}
            <TabPanel
              w={{ sm: "330px", md: "700px", lg: "850px" }}
              p="0px"
              mx="auto"
            >
              <DiverInfo mb="20px" summaryTab={summaryTab} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
}

export async function getStaticProps() {
  const { data: equipment } = await supabase
    .from("equipment")
    .select("id, name, price, pay_now, stripe_price_id");
  return {
    props: { equipment },
    revalidate: 86400,
  };
}

NewBooking.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
