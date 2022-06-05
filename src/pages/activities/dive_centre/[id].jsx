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
  VStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
// Custom components
import { useState, useEffect } from "react";
import { AiOutlineDollar } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { useMoralisQuery } from "react-moralis";

import Image from "components/actions/NextChakraImg";
import Card from "components/card/Card";
import IconBox from "components/icons/IconBox";
// import UpcomingTrips from "components/pages/diveSite/UpcomingTrips";
import AdminLayout from "layouts/admin";

export default function DiveCentreDetails() {
  const [name, setname] = useState();
  const [description, setDescription] = useState();
  const [address, setAddress] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [centrePhoto, setCentrePhoto] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [languages, setLanguages] = useState();
  const [memberships, setMemberships] = useState();
  const [paymentMethods, setPaymentMethods] = useState();
  const [services, setServices] = useState();
  const [equipment, setEquipment] = useState();
  // const [rating, setRating] = useState();
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
    data: centreData,
    // error: siteError,
    // isLoading: siteIsLoading,
  } = useMoralisQuery(
    "DiveCentres",
    (query) =>
      query
        .equalTo("objectId", id) // `${params.id}`
        .select(
          "objectId",
          "name",
          "address",
          "description",
          "latitude",
          "longitude",
          "photo",
          "city",
          "languages",
          "memberships",
          "services",
          "equipment",
          "paymentMethods",
          "country",
          "rating"
        ),
    [isReady],
    {
      live: true,
    }
  );

  useEffect(() => {
    if (!centreData) return null;
    async function getNFTurl() {
      try {
        const response = centreData[0]?.attributes;
        setname(response.name);
        setDescription(response.description);
        setAddress(response.address);
        setImageUrl(response.photo._url);
        setCity(response.city);
        setCountry(response.country);
        setLanguages(response.languages);
        setMemberships(response.memberships);
        setServices(response.services);
        setEquipment(response.equipment);
        setPaymentMethods(response.paymentMethods);
        // setRating(response.rating);
        setCentrePhoto(response.photo._url);
      } catch (error) {
        // console.error(error);
      }
    }
    getNFTurl();
  }, [centreData]);

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
                height={{ sm: "300px", md: "400px", lg: "500px" }}
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
                  {centrePhoto && (
                    <Image
                      src={centrePhoto}
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
                {`${address} - ${city}, ${country}`}
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
                        Memberships
                      </Text>
                      <Flex wrap="wrap" gap={3}>
                        {memberships?.map((membership) => (
                          <Badge
                            colorScheme="teal"
                            borderRadius="15px"
                            display="flex"
                            px={4}
                            py={2}
                            justifyContent="center"
                          >
                            {membership}
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
                        <AiOutlineDollar h="20px" w="20px" color={iconColor} />
                      }
                    />
                    <Flex direction="column">
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color={textColor}
                        mb="10px"
                      >
                        Payment Methods
                      </Text>
                      <Flex wrap="wrap" gap={3}>
                        {paymentMethods?.map((method) => (
                          <Badge
                            colorScheme="teal"
                            borderRadius="15px"
                            display="flex"
                            px={4}
                            py={2}
                            justifyContent="center"
                          >
                            {method}
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
                      icon={<IoLanguage h="20px" w="20px" color={iconColor} />}
                    />
                    <Flex direction="column">
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color={textColor}
                        mb="10px"
                      >
                        Languages
                      </Text>
                      <Flex wrap="wrap" gap={3}>
                        {languages?.map((language) => (
                          <Badge
                            colorScheme="teal"
                            borderRadius="15px"
                            display="flex"
                            px={4}
                            py={2}
                            justifyContent="center"
                          >
                            {language}
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
                        Activities & Services
                      </Text>
                    </Box>
                    <AccordionIcon color="gray.500" />
                  </AccordionButton>
                  <AccordionPanel p="18px 0px 10px 0px">
                    <Stack
                      direction="row"
                      spacing={{ sm: "20px", md: "35px", lg: "20px" }}
                      mx="auto"
                      mb={{ sm: "24px", lg: "0px" }}
                    >
                      <Flex wrap="wrap">
                        {services?.map((service) => (
                          <>
                            <Badge
                              colorScheme="purple"
                              borderRadius="15px"
                              display="flex"
                              p={3}
                              mb={3}
                              justifyContent="center"
                            >
                              <VStack>
                                <Image
                                  src={`/svg/services/${service

                                    .toLowerCase()
                                    .replaceAll(" ", "_")}.svg`}
                                  width="100%"
                                  height="40px"
                                  borderRadius="15px"
                                />
                                <Text>{service}</Text>
                              </VStack>
                            </Badge>
                            <Spacer />
                          </>
                        ))}
                      </Flex>
                    </Stack>
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
                        Equipment
                      </Text>
                    </Box>
                    <AccordionIcon color="gray.500" />
                  </AccordionButton>
                  <AccordionPanel p="18px 0px 10px 0px">
                    <Stack
                      direction="row"
                      spacing={{ sm: "20px", md: "35px", lg: "20px" }}
                      mx="auto"
                      mb={{ sm: "24px", lg: "0px" }}
                    >
                      <Flex wrap="wrap">
                        {equipment?.map((item) => (
                          <>
                            <Badge
                              colorScheme="purple"
                              borderRadius="15px"
                              display="flex"
                              p={3}
                              mb={3}
                              justifyContent="center"
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
                            </Badge>
                            <Spacer />
                          </>
                        ))}
                      </Flex>
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Flex>
          </Flex>
        </Flex>
      </Card>
      {/* Upcoming Dive Trips */}
      {/* <UpcomingTrips diveSiteName={name} diveSiteImg={imageUrl} /> */}
    </>
  );
}

DiveCentreDetails.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
