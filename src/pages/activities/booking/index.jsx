/* eslint-disable complexity */
/* eslint-disable import/no-cycle */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-undef */
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
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

// Custom components
import Card from "components/card/Card";
import DiveList from "components/pages/bookings/DiveList";
import DiverInfo from "components/pages/bookings/DiverInfo";
import DiveSelection from "components/pages/bookings/DiveSelection";
import EquipmentSelection from "components/pages/bookings/EquipmentSelection";
import AdminLayout from "layouts/admin";

export default function NewBooking() {
  const [diverName, setDiverName] = useState();
  const [diverEmail, setDiverEmail] = useState();
  const [diverCert, setDiverCert] = useState();
  const [lastDive, setLastDive] = useState();
  const [notes, setNotes] = useState();
  const [dives, setDives] = useState([]);
  const [activeBullets, setActiveBullets] = useState({
    product: true,
    media: false,
    pricing: false,
  });

  const productTab = useRef();
  const mediaTab = useRef();
  const pricingTab = useRef();
  // const brand = useColorModeValue("brand.500", "brand.400");

  return (
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
            ref={productTab}
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
                Select Dives
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
            ref={mediaTab}
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
                Diver Info
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
            ref={pricingTab}
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
                Equipment
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
            {/* Row 1: Map  & Calendar */}
            <DiveSelection dives={dives} setDives={setDives} />
            {/* Row 2: List of Dives */}
            <DiveList mb="20px" dives={dives} setDives={setDives} />
            <Flex justify="space-between" mt="24px">
              <Button
                variant="darkBrand"
                fontSize="sm"
                borderRadius="16px"
                w={{ base: "128px", md: "148px" }}
                h="46px"
                ms="auto"
                onClick={() => mediaTab.current.click()}
              >
                Next
              </Button>
            </Flex>
          </TabPanel>
          {/* Panel 2: Diver Info */}
          <TabPanel
            w={{ sm: "330px", md: "700px", lg: "850px" }}
            p="0px"
            mx="auto"
          >
            <Card p="30px">
              <DiverInfo
                mb="20px"
                setDiverName={setDiverName}
                setDiverEmail={setDiverEmail}
                setLastDive={setLastDive}
                setDiverCert={setDiverCert}
                setNotes={setNotes}
              />
              <Flex justify="space-between" mt="24px">
                <Button
                  variant="light"
                  fontSize="sm"
                  borderRadius="16px"
                  w={{ base: "128px", md: "148px" }}
                  h="46px"
                  onClick={() => productTab.current.click()}
                >
                  Prev
                </Button>
                <Button
                  variant="darkBrand"
                  fontSize="sm"
                  borderRadius="16px"
                  w={{ base: "128px", md: "148px" }}
                  h="46px"
                  isActive={dives.length > 0}
                  onClick={() => pricingTab.current.click()}
                >
                  Next
                </Button>
              </Flex>
            </Card>
          </TabPanel>
          {/* Panel 3: Pricing */}
          <TabPanel
            w={{ sm: "330px", md: "700px", lg: "850px" }}
            p="0px"
            mx="auto"
          >
            <EquipmentSelection
              mediaTab={mediaTab}
              dives={dives}
              diverName={diverName}
              diverEmail={diverEmail}
              diverCert={diverCert}
              lastDive={lastDive}
              notes={notes}
            />
            {/* <Card p="30px">
              <Text color={textColor} fontSize="2xl" fontWeight="700" mb="20px">
                Equipment
              </Text>
              <Flex direction="column" w="100%">
                <Flex wrap="wrap">
                  <SimpleGrid
                    columns={{ sm: 2, md: 4 }}
                    spacing="40px"
                    w="100%"
                  >
                    {equipment?.map((item) => (
                      <Button
                        colorScheme="purple"
                        borderRadius="15px"
                        display="flex"
                        p={3}
                        mb={3}
                        justifyContent="center"
                        minH="100px"
                      >
                        <VStack>
                          <Image
                            src={`/svg/equipment/${item

                              .toLowerCase()
                              .replaceAll(" ", "_")}.svg`}
                            width="100%"
                            height="40px"
                            borderRadius="15px"
                          />
                          <Text>{item}</Text>
                        </VStack>
                      </Button>
                    ))}
                  </SimpleGrid>
                </Flex>
                <Flex justify="space-between" mt="24px">
                  <Button
                    variant="light"
                    fontSize="sm"
                    borderRadius="16px"
                    w={{ base: "128px", md: "148px" }}
                    h="46px"
                    onClick={() => mediaTab.current.click()}
                  >
                    Prev
                  </Button>
                  <Button
                    variant="darkBrand"
                    fontSize="sm"
                    borderRadius="16px"
                    w={{ base: "128px", md: "148px" }}
                    h="46px"
                  >
                    Go to Payment
                  </Button>
                </Flex>
              </Flex>
            </Card> */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

NewBooking.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
