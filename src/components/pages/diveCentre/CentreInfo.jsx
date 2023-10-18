/* eslint-disable func-names */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
  chakra,
} from "@chakra-ui/react";
// Custom components
import { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";

import Card from "components/card/Card";

import CertsTab from "./CertsTab";
import CollectionTab from "./CollectionTab";
import DetailsTab from "./DetailsTab";
import EquipmentTab from "./EquipmentTab";

// import DetailsTab from "./DetailsTab";
// import Instructor from "./Instructor";
// import Rating from "./Rating";

export default function CentreInfo(props) {
  const { diveCentre, equipment, centreCerts } = props;
  const {
    name,
    description,
    address,
    city,
    country,
    services,
    paymentMethods,
    languages,
    memberships,
  } = diveCentre;

  const [tabState, setTabState] = useState("about");

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorTertiary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.500"
  );

  return (
    <Card mt="20px" p={{ base: "20px", md: "20px 40px" }}>
      <Flex align="center" w="100%">
        <Text as="h1" color={textColor} fontSize="3xl" fontWeight="bold">
          {name}
        </Text>
      </Flex>
      <Flex mb="30px" alignSelf="start" cursor="pointer">
        <Icon
          as={HiOutlineLocationMarker}
          ms="auto"
          h="22px"
          w="22px"
          mr="10px"
          color={textColorTertiary}
        />
        <Text color={textColorTertiary} fontWeight="500" fontSize="md" me="5px">
          {address} - {`${city}, ${country}`}
        </Text>
      </Flex>
      <Box w="100%" mb="40px">
        <Flex direction={{ base: "column", "3xl": "row" }}>
          <Box me={{ md: "40px", "3xl": "40px" }}>
            <Tabs variant="soft-rounded" colorScheme="brandTabs" mb="10px">
              <TabList overflowX={{ sm: "scroll", lg: "unset" }} pt="10px">
                <Flex>
                  <Tab
                    pb="0px"
                    flexDirection="column"
                    onClick={function () {
                      setTabState("about");
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
                        color={
                          tabState === "about" ? textColor : textColorTertiary
                        }
                        fontSize="lg"
                        fontWeight="500"
                      >
                        About Us
                      </Text>
                    </Flex>
                    <Box
                      height="4px"
                      w="100%"
                      transition="0.1s linear"
                      bg={tabState === "about" ? "brand.400" : "transparent"}
                      mt="15px"
                      borderRadius="30px"
                    />
                  </Tab>
                  <Tab
                    pb="0px"
                    flexDirection="column"
                    onClick={function () {
                      setTabState("equip");
                    }}
                    bg="unset"
                    _selected={{
                      bg: "none",
                    }}
                    _focus={{ border: "none" }}
                    minW="max-content"
                  >
                    <chakra.span pos="relative" display="inline-block">
                      <Flex align="center">
                        <Text
                          color={
                            tabState === "equip" ? textColor : textColorTertiary
                          }
                          fontSize="lg"
                          fontWeight="500"
                        >
                          Rentals
                        </Text>
                      </Flex>
                      <Box
                        height="4px"
                        w="100%"
                        transition="0.1s linear"
                        bg={tabState === "equip" ? "brand.400" : "transparent"}
                        mt="15px"
                        borderRadius="30px"
                      />
                      {equipment.length > 0 && (
                        <chakra.span
                          pos="absolute"
                          top="-4px"
                          right="-1px"
                          px={2}
                          py={1}
                          fontSize="xs"
                          fontWeight="bold"
                          lineHeight="none"
                          color="red.100"
                          transform="translate(50%,-50%)"
                          bg="red.600"
                          rounded="full"
                        >
                          {equipment.length}
                        </chakra.span>
                      )}
                    </chakra.span>
                  </Tab>
                  <Tab
                    pb="0px"
                    flexDirection="column"
                    onClick={() => setTabState("certs")}
                    bg="unset"
                    _selected={{
                      bg: "none",
                    }}
                    _focus={{ border: "none" }}
                    minW="max-content"
                  >
                    <chakra.span pos="relative" display="inline-block">
                      <Flex align="center">
                        <Text
                          color={
                            tabState === "certs" ? textColor : textColorTertiary
                          }
                          fontSize="lg"
                          fontWeight="500"
                        >
                          Courses
                        </Text>
                      </Flex>
                      <Box
                        height="4px"
                        w="100%"
                        transition="0.1s linear"
                        bg={tabState === "certs" ? "brand.400" : "transparent"}
                        mt="15px"
                        borderRadius="30px"
                      />
                      {centreCerts.length > 0 && (
                        <chakra.span
                          pos="absolute"
                          top="-4px"
                          right="-1px"
                          px={2}
                          py={1}
                          fontSize="xs"
                          fontWeight="bold"
                          lineHeight="none"
                          color="red.100"
                          transform="translate(50%,-50%)"
                          bg="red.600"
                          rounded="full"
                        >
                          {centreCerts.length}
                        </chakra.span>
                      )}
                    </chakra.span>
                  </Tab>
                  <Tab
                    onClick={function () {
                      setTabState("services");
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
                        color={
                          tabState === "services"
                            ? textColor
                            : textColorTertiary
                        }
                        fontSize="lg"
                        fontWeight="500"
                      >
                        Services
                      </Text>
                    </Flex>
                    <Box
                      height="4px"
                      w="100%"
                      transition="0.1s linear"
                      bg={tabState === "services" ? "brand.400" : "transparent"}
                      mt="15px"
                      borderRadius="30px"
                    />
                  </Tab>
                </Flex>
              </TabList>
              <TabPanels pt="30px">
                <TabPanel px="0px">
                  <DetailsTab
                    description={description}
                    paymentMethods={paymentMethods}
                    languages={languages}
                    memberships={memberships}
                  />
                </TabPanel>
                <TabPanel px="0px">
                  <EquipmentTab
                    // summaryTab={summaryTab}
                    equipment={equipment}
                  />
                </TabPanel>
                <TabPanel px="0px">
                  <CertsTab
                    // summaryTab={summaryTab}
                    centreCerts={centreCerts}
                  />
                </TabPanel>
                <TabPanel px="0px">
                  <CollectionTab
                    collection={services}
                    folderUrl="/svg/services"
                    extension="svg"
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
            {/* <Flex direction={{ base: "column", md: "row" }} align="center">
              <Box
                w={{ base: "unset", md: "30%", "3xl": "50%" }}
                ms={{ base: "auto", md: "unset" }}
                me={{ base: "auto", "3xl": "50px" }}
              >
                <Text
                  fontSize={{ base: "70px", "3xl": "80px" }}
                  color="orange.500"
                  fontWeight="700"
                  lineHeight="105%"
                  maxW="max-content"
                >
                  4.8
                </Text>
                <Flex mb="8px" maxW="max-content">
                  <Icon color="orange.500" h="24px" w="24px" as={IoMdStar} />
                  <Icon color="orange.500" h="24px" w="24px" as={IoMdStar} />
                  <Icon color="orange.500" h="24px" w="24px" as={IoMdStar} />
                  <Icon color="orange.500" h="24px" w="24px" as={IoMdStar} />
                  <Icon
                    color="orange.500"
                    h="24px"
                    w="24px"
                    as={IoMdStarHalf}
                  />
                </Flex>
                <Text
                  fontSize="lg"
                  color={textColorTertiary}
                  fontWeight="500"
                  maxW="max-content"
                  mb={{ base: "20px", md: "0px" }}
                >
                  Course Rating
                </Text>
              </Box>
              <Box>
                <Rating value="78" mb="5px" stars={5} />
                <Rating value="24" mb="5px" stars={4} />
                <Rating value="12" mb="5px" stars={3} />
                <Rating value="8" mb="5px" stars={2} />
                <Rating value="4" stars={1} />
              </Box>
            </Flex> */}
          </Box>

          <Box
            mx={{ base: "auto", xl: "unset" }}
            maxW={{
              sm: "100%",
              md: "550px",
              lg: "500px",
              "2xl": "800px",
              "3xl": "300px",
            }}
          >
            {/* <Instructor /> */}
          </Box>
        </Flex>
      </Box>
    </Card>
  );
}
