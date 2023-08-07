/* eslint-disable func-names */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import {
  Box,
  // Button,
  Flex,
  // Icon,
  Text,
  useColorModeValue,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
} from "@chakra-ui/react";
// Custom components
import md from "markdown-it";
import { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";

import Card from "components/card/Card";

import DetailsTab from "./DetailsTab";
import SpeciesTab from "./SpeciesTab";
// import Instructor from "./Instructor";
// import Rating from "./Rating";

export default function SiteInfo({
  name,
  description,
  city,
  country,
  species,
  minDepth,
  maxDepth,
  minVisibility,
  maxVisibility,
  minCurrent,
  maxCurrent,
  access,
  certLevel,
  diveTypes,
  ...rest
}) {
  const [tabState, setTabState] = useState("description");

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.700", "white");
  const textColorTertiary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.500"
  );
  const descTab = () => (
    <SimpleGrid
      columns="1"
      gap="40px"
      {...rest}
      maxW="100%"
      w={{ base: "100%", md: "unset" }}
    >
      <Box
        fontSize="lg"
        color={textColorSecondary}
        fontWeight="400"
        className="site_description"
        dangerouslySetInnerHTML={{ __html: md().render(description) }}
      />
    </SimpleGrid>
  );

  return (
    <Card mt="20px" p={{ base: "20px", md: "20px 40px" }}>
      <Flex align="center" w="100%">
        <Text as="h1" color={textColor} fontSize="3xl" fontWeight="bold">
          {name}
        </Text>
      </Flex>
      <Flex mb="15px" alignSelf="start" cursor="pointer">
        <Icon
          as={HiOutlineLocationMarker}
          ms="auto"
          h="22px"
          w="22px"
          mr="10px"
          color={textColorTertiary}
        />
        <Text color={textColorTertiary} fontWeight="500" fontSize="md" me="5px">
          {`${city}, ${country}`}
        </Text>
      </Flex>
      <Box w="100%" mb="40px">
        <Flex direction={{ base: "column", "3xl": "row" }}>
          <Box me={{ md: "40px", "3xl": "40px" }}>
            <Tabs variant="soft-rounded" colorScheme="brandTabs" mb="60px">
              <TabList overflowX={{ sm: "scroll", lg: "unset" }}>
                <Flex>
                  <Tab
                    onClick={function () {
                      setTabState("description");
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
                          tabState === "description"
                            ? textColor
                            : textColorTertiary
                        }
                        fontSize="lg"
                        fontWeight="500"
                      >
                        Description
                      </Text>
                    </Flex>
                    <Box
                      height="4px"
                      w="100%"
                      transition="0.1s linear"
                      bg={
                        tabState === "description" ? "brand.400" : "transparent"
                      }
                      mt="15px"
                      borderRadius="30px"
                    />
                  </Tab>
                  <Tab
                    pb="0px"
                    flexDirection="column"
                    onClick={function () {
                      setTabState("info");
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
                        color={
                          tabState === "info" ? textColor : textColorTertiary
                        }
                        fontSize="lg"
                        fontWeight="500"
                      >
                        Details
                      </Text>
                    </Flex>
                    <Box
                      height="4px"
                      w="100%"
                      transition="0.1s linear"
                      bg={tabState === "info" ? "brand.400" : "transparent"}
                      mt="15px"
                      borderRadius="30px"
                    />
                  </Tab>
                  <Tab
                    pb="0px"
                    flexDirection="column"
                    onClick={function () {
                      setTabState("species");
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
                          tabState === "species" ? textColor : textColorTertiary
                        }
                        fontSize="lg"
                        fontWeight="500"
                      >
                        Species
                      </Text>
                    </Flex>
                    <Box
                      height="4px"
                      w="100%"
                      transition="0.1s linear"
                      bg={tabState === "species" ? "brand.400" : "transparent"}
                      mt="15px"
                      borderRadius="30px"
                    />
                  </Tab>
                </Flex>
              </TabList>
              <TabPanels pt="30px">
                <TabPanel px="0px">{descTab()}</TabPanel>
                <TabPanel px="0px">
                  <DetailsTab
                    minDepth={minDepth}
                    maxDepth={maxDepth}
                    minVisibility={minVisibility}
                    maxVisibility={maxVisibility}
                    minCurrent={minCurrent}
                    maxCurrent={maxCurrent}
                    access={access}
                    certLevel={certLevel}
                    diveTypes={diveTypes}
                  />
                </TabPanel>
                <TabPanel px="0px">
                  <SpeciesTab collection={species} />
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
