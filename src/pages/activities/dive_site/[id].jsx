/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
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
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Flex,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
// Custom components
import { useState, useEffect } from "react";
import { FaRegAddressCard } from "react-icons/fa";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { IoBoatOutline } from "react-icons/io5";
import { VscSymbolRuler } from "react-icons/vsc";
import { useMoralisQuery } from "react-moralis";

import Image from "components/actions/NextChakraImg";
import Card from "components/card/Card";
import IconBox from "components/icons/IconBox";
import Species from "components/pages/diveSite/Species";
// import UpcomingTrips from "components/pages/diveSite/UpcomingTrips";
import AdminLayout from "layouts/admin";

export default function DiveSiteDetails() {
  const [name, setname] = useState();
  const [description, setDescription] = useState();
  const [depth, setDepth] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [diveMap, setDiveMap] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [divingTypes, setDivingTypes] = useState();
  const [certLevel, setCertLevel] = useState();
  const [access, setAccess] = useState();
  // const [rating, setRating] = useState();
  const [species, setSpecies] = useState();
  // const [currentImage, setCurrentImage] = useState();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("secondaryGray.400", "whiteAlpha.100");
  const iconColor = useColorModeValue("purple", "white");
  const iconBoxBg = useColorModeValue("gray.300", "navy.700");

  const router = useRouter();
  const {
    isReady,
    query: { id },
  } = router;

  const {
    data: siteData,
    // error: siteError,
    // isLoading: siteIsLoading,
  } = useMoralisQuery(
    "DiveSite",
    (query) =>
      query
        .equalTo("objectId", id) // `${params.id}`
        .select(
          "objectId",
          "name",
          "maxDepth",
          "description",
          "latitude",
          "longitude",
          "diveMap",
          "city",
          "access",
          "certLevel",
          "divingTypes",
          "country",
          "rating",
          "species"
        ),
    [isReady],
    {
      live: true,
    }
  );

  useEffect(() => {
    if (!siteData) return null;
    async function getNFTurl() {
      try {
        const response = siteData[0]?.attributes;
        setname(response.name);
        setDescription(response.description);
        setDepth(response.maxDepth);
        setImageUrl(response.diveMap._url);
        setCity(response.city);
        setCountry(response.country);
        setDivingTypes(response.divingTypes);
        setCertLevel(response.certLevel);
        setAccess(response.access);
        // setRating(response.rating);
        setDiveMap(response.diveMap._url);
        setSpecies(response.species);
      } catch (error) {
        // console.error(error);
      }
    }
    getNFTurl();
  }, [siteData]);

  return (
    <>
      <Card mt={{ sm: "125px", md: "75px" }} me={{ lg: "60px" }}>
        <Flex direction="column" width="100%">
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
                  md: "670px",
                  lg: "600px",
                  xl: "555px",
                  "2xl": "745px",
                }}
                mb="26px"
                align
                mx={{ sm: "auto", lg: "auto", xl: "0px" }}
                width="100%"
                height="100%"
                position="relative"
              >
                {imageUrl && (
                  <Image src={imageUrl} borderRadius="15px" layout="fill" />
                )}
              </Box>
              <Stack
                direction="row"
                spacing={{ sm: "20px", md: "35px", lg: "20px" }}
                mx="auto"
              >
                <Box
                  w={{
                    sm: "42px",
                    md: "104px",
                    lg: "70px",
                    xl: "90px",
                    "2xl": "130px",
                  }}
                  h={{
                    sm: "42px",
                    md: "104px",
                    lg: "70px",
                    xl: "90px",
                    "2xl": "130px",
                  }}
                  onClick={(e) => setImageUrl(e.target.src)}
                >
                  {diveMap && (
                    <Image
                      src={diveMap}
                      width="100%"
                      height="100%"
                      borderRadius="15px"
                      cursor="pointer"
                      layout="responsive"
                    />
                  )}
                </Box>
                <Box
                  w={{
                    sm: "42px",
                    md: "104px",
                    lg: "70px",
                    xl: "90px",
                    "2xl": "130px",
                  }}
                  h={{
                    sm: "42px",
                    md: "104px",
                    lg: "70px",
                    xl: "90px",
                    "2xl": "130px",
                  }}
                  onClick={(e) => setImageUrl(e.target.src)}
                >
                  <Image
                    src="/img/activities/1-coral.jpg"
                    width="100%"
                    height="100%"
                    borderRadius="15px"
                    cursor="pointer"
                    layout="responsive"
                  />
                </Box>
                <Box
                  w={{
                    sm: "42px",
                    md: "104px",
                    lg: "70px",
                    xl: "90px",
                    "2xl": "130px",
                  }}
                  h={{
                    sm: "42px",
                    md: "104px",
                    lg: "70px",
                    xl: "90px",
                    "2xl": "130px",
                  }}
                  onClick={(e) => setImageUrl(e.target.src)}
                >
                  <Image
                    src="/img/activities/2-cuttlefish.webp"
                    width="100%"
                    height="100%"
                    borderRadius="15px"
                    cursor="pointer"
                    layout="responsive"
                  />
                </Box>
                <Box
                  w={{
                    sm: "42px",
                    md: "104px",
                    lg: "70px",
                    xl: "90px",
                    "2xl": "130px",
                  }}
                  h={{
                    sm: "42px",
                    md: "104px",
                    lg: "70px",
                    xl: "90px",
                    "2xl": "130px",
                  }}
                  onClick={(e) => setImageUrl(e.target.src)}
                >
                  <Image
                    src="/img/activities/3-clownfish.jpg"
                    width="100%"
                    height="100%"
                    borderRadius="15px"
                    cursor="pointer"
                    layout="responsive"
                  />
                </Box>
                <Box
                  w={{
                    sm: "42px",
                    md: "104px",
                    lg: "70px",
                    xl: "90px",
                    "2xl": "130px",
                  }}
                  h={{
                    sm: "42px",
                    md: "104px",
                    lg: "70px",
                    xl: "90px",
                    "2xl": "130px",
                  }}
                  onClick={(e) => setImageUrl(e.target.src)}
                >
                  <Image
                    src="/img/activities/4-anemone.jpeg"
                    width="100%"
                    height="100%"
                    borderRadius="15px"
                    cursor="pointer"
                    layout="responsive"
                  />
                </Box>
              </Stack>
            </Flex>
            <Flex direction="column" w="100%">
              <Text
                color={textColor}
                fontSize="3xl"
                fontWeight="bold"
                mb="12px"
                mt={{ sm: "20px", md: "50px", "2xl": "20px", "3xl": "50px" }}
              >
                {name}
              </Text>
              <Text
                fontColor="secondaryGray.600"
                pe={{ base: "0px", "3xl": "200px" }}
                mb="40px"
              >
                {`${city}, ${country}`}
              </Text>
              <Stack
                direction="column"
                spacing="24px"
                w="100%"
                mb="20px"
                pr={{ md: "0px", lg: "25px" }}
              >
                <Flex align="center" w="100%">
                  <Flex align="center">
                    <IconBox
                      as="box"
                      h="40px"
                      minW="40px"
                      bg={iconBoxBg}
                      me="18px"
                      icon={
                        <VscSymbolRuler h="20px" w="20px" color={iconColor} />
                      }
                    />
                    <Flex direction="column">
                      <Text fontSize="sm" fontWeight="bold" color={textColor}>
                        Depth
                      </Text>
                    </Flex>
                  </Flex>
                  <Spacer />
                  <Text color="green.400" fontSize="xs">
                    <Text as="span" fontSize="lg" fontWeight="bold">
                      {`${depth}m`}
                    </Text>{" "}
                    Max
                  </Text>
                </Flex>

                <Flex align="center" w="100%">
                  <Flex align="center">
                    <IconBox
                      as="box"
                      h="40px"
                      minW="40px"
                      bg={iconBoxBg}
                      me="18px"
                      icon={
                        <IoBoatOutline h="20px" w="20px" color={iconColor} />
                      }
                    />
                    <Flex direction="column">
                      <Text fontSize="sm" fontWeight="bold" color={textColor}>
                        Access
                      </Text>
                    </Flex>
                  </Flex>
                  <Spacer />
                  <Text fontWeight="bold" color="green.400" fontSize="lg">
                    {access}
                  </Text>
                </Flex>

                <Flex align="center" w="100%">
                  <Flex align="center">
                    <IconBox
                      as="box"
                      h="40px"
                      minW="40px"
                      bg={iconBoxBg}
                      me="18px"
                      icon={
                        <FaRegAddressCard h="20px" w="20px" color={iconColor} />
                      }
                    />
                    <Flex direction="column">
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color={textColor}
                        mb="10px"
                      >
                        Certification Level
                      </Text>
                      <Flex wrap="wrap" gap={3}>
                        {certLevel?.map((level) => (
                          <Badge
                            colorScheme="teal"
                            borderRadius="15px"
                            display="flex"
                            px={4}
                            py={2}
                            justifyContent="center"
                          >
                            {level}
                          </Badge>
                        ))}
                      </Flex>
                      {/* <Text color="gray.400" fontSize="xs">
                        Wreck, Night Dive, Deep, Corals, Sandy Bottom, Top 100 site, drift
                      </Text> */}
                    </Flex>
                  </Flex>
                  <Spacer />
                </Flex>

                <Flex align="center" w="100%">
                  <Flex align="center">
                    <IconBox
                      as="box"
                      h="40px"
                      minW="40px"
                      bg={iconBoxBg}
                      me="18px"
                      icon={
                        <HiOutlineBadgeCheck
                          h="20px"
                          w="20px"
                          color={iconColor}
                        />
                      }
                    />
                    <Flex direction="column">
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color={textColor}
                        mb="10px"
                      >
                        Diving Types
                      </Text>
                      <Flex wrap="wrap" gap={3}>
                        {divingTypes?.map((type) => (
                          <Badge
                            colorScheme="teal"
                            borderRadius="15px"
                            display="flex"
                            px={4}
                            py={2}
                            justifyContent="center"
                          >
                            {type}
                          </Badge>
                        ))}
                      </Flex>
                      {/* <Text color="gray.400" fontSize="xs">
                        Wreck, Night Dive, Deep, Corals, Sandy Bottom, Top 100 site, drift
                      </Text> */}
                    </Flex>
                  </Flex>
                  <Spacer />
                </Flex>
              </Stack>
              <Accordion
                defaultIndex={[0]}
                allowToggle
                w={{ sm: "100%", md: "100%", xl: "94%" }}
                mb="16px"
              >
                <AccordionItem border="none">
                  <AccordionButton
                    _focus="none"
                    _hover="none"
                    p="20px 0px 20px 0px"
                    borderBottom="1px solid"
                    borderColor={borderColor}
                  >
                    <Box flex="1" textAlign="left">
                      <Text
                        color={textColor}
                        fontWeight="700"
                        fontSize={{ sm: "md", lg: "md" }}
                      >
                        Description
                      </Text>
                    </Box>
                    <AccordionIcon color="gray.500" />
                  </AccordionButton>
                  <AccordionPanel p="18px 0px 10px 0px">
                    <Text
                      color="secondaryGray.600"
                      fontWeight="500"
                      fontSize="md"
                      textAlign="left"
                      alignSelf="flex-start"
                      justifySelf="flex-start"
                    >
                      {description}
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem border="none">
                  <AccordionButton
                    _focus="none"
                    _hover="none"
                    p="20px 0px 20px 0px"
                    borderBottom="1px solid"
                    borderColor={borderColor}
                  >
                    <Box flex="1" textAlign="left">
                      <Text
                        color={textColor}
                        fontWeight="700"
                        fontSize={{ sm: "md", lg: "md" }}
                      >
                        Characteristics
                      </Text>
                    </Box>
                    <AccordionIcon color="gray.500" />
                  </AccordionButton>
                  <AccordionPanel p="18px 0px 10px 0px">
                    <Text
                      color="secondaryGray.600"
                      fontWeight="500"
                      fontSize="md"
                      textAlign="left"
                      alignSelf="flex-start"
                      justifySelf="flex-start"
                    >
                      Coming Soon
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem border="none">
                  <AccordionButton
                    _focus="none"
                    _hover="none"
                    p="20px 0px 20px 0px"
                    borderBottom="1px solid"
                    borderColor={borderColor}
                  >
                    <Box flex="1" textAlign="left">
                      <Text
                        color={textColor}
                        fontWeight="700"
                        fontSize={{ sm: "md", lg: "md" }}
                      >
                        Reviews
                      </Text>
                    </Box>
                    <AccordionIcon color="gray.500" />
                  </AccordionButton>
                  <AccordionPanel p="18px 0px 10px 0px">
                    <Text
                      color="secondaryGray.600"
                      fontWeight="500"
                      fontSize="md"
                      textAlign="left"
                      alignSelf="flex-start"
                      justifySelf="flex-start"
                    >
                      No reviews yet
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Flex>
          </Flex>
        </Flex>
      </Card>
      {/* Species Section */}
      <Species species={species} />
      {/* Upcoming Dive Trips */}
      {/* <UpcomingTrips diveSiteName={name} diveSiteImg={imageUrl} /> */}
    </>
  );
}

DiveSiteDetails.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
