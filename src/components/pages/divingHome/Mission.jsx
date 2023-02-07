/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
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
  Avatar,
  Box,
  Flex,
  Tag,
  TagLabel,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

import Card from "components/card/Card";
import DiveSiteCard from "components/card/DiveSiteCard";
import InnerContent from "layouts/InnerContent";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Mission(props) {
  const { sites } = props;
  const mapRef = useRef();
  const [mapLocation, setMapLocation] = useState("Select Location");

  const mapStyles = useColorModeValue(
    "mapbox://styles/ashmet/cl5g3eivr000q14pcior0262r",
    "mapbox://styles/ashmet/cl5g3eivr000q14pcior0262r"
  );
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue(
    "secondaryGray.700",
    "secondaryGray.300"
  );
  // const endGradient = useColorModeValue(
  //   "linear-gradient(360deg, #F7FAFC 17.92%, rgba(247, 250, 252, 0) 100%)",
  //   "linear-gradient(360deg, #172041 17.92%, rgba(23, 32, 65, 0) 54.26%)"
  // );
  return (
    <Flex
      w="100%"
      direction={{ base: "column" }}
      pt={{ base: "180px", md: "200px", xl: "100px" }}
      overflow="hidden"
      bgSize="cover"
      position="relative"
    >
      <InnerContent px={{ base: "20px", md: "40px", xl: "0px" }}>
        <Flex direction="column" width="stretch">
          <Flex
            direction="column"
            mx="auto"
            mb="40px"
            maxW={{ base: "100%", md: "100%", lg: "80%", xl: "70%" }}
            textAlign="center"
          >
            <Text
              fontWeight="700"
              letterSpacing="2px"
              bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
              bgClip="text"
              fontSize="sm"
              w="100%"
              mb="10px"
            >
              OUR MISSION
            </Text>
            <Text
              color={textColor}
              fontWeight="800"
              fontSize={{ base: "28px", md: "40px", lg: "48px" }}
              lineHeight={{ base: "38px", md: "50px", lg: "58px" }}
              mb="20px"
            >
              A Better Diving Experience
            </Text>
            <Text color={textColor} fontSize="lg" w="100%" mb="20px">
              Coral Playground is your gateway to the largest collection of
              dives in Egypt, operated by a network of the highest quality dive
              centres, guides and instructors.{" "}
              <Text color={textColorSecondary} as="span" fontWeight="700">
                Our goal is to make sure you can book the best dive vacation of
                your life as quickly and easily as possible with complete peace
                of mind.
              </Text>
            </Text>
          </Flex>
        </Flex>
        <Flex
          direction={{ sm: "column", md: "row" }}
          w="full"
          h={{ sm: "75vh", lg: "50vh" }}
          boxShadow="dark-lg"
        >
          <Card
            justifyContent="center"
            position="relative"
            direction="column"
            borderRadius="xl"
            w="100%"
            p={{ sm: "0px", md: "10px" }}
            zIndex="0"
            h={{ sm: "calc(100vh - 150px)", md: "calc(100vh - 150px)" }}
            overflow="hidden"
          >
            <Map
              ref={mapRef}
              initialViewState={{
                latitude: 27.914633,
                longitude: 34.352383,
                pitch: 85,
                zoom: 13,
              }}
              style={{ borderRadius: "20px", width: "100%", height: "100%" }}
              mapStyle={mapStyles}
              mapboxAccessToken={MAPBOX_TOKEN}
              onClick={() => setMapLocation("Select Location")}
            >
              <GeolocateControl position="top-left" />
              <FullscreenControl position="top-left" />
              <NavigationControl position="top-left" />
              <ScaleControl />

              {sites.map(
                (location) =>
                  location.latitude &&
                  location.longitude && (
                    <Marker
                      key={location.latitude + location.longitude}
                      latitude={location.latitude}
                      longitude={location.longitude}
                      anchor="bottom"
                      onClick={(e) => {
                        // If we let the click event propagates to the map, it will immediately close the popup
                        // with `closeOnClick: true`
                        e.originalEvent.stopPropagation();
                        setMapLocation(location);
                        mapRef.current?.flyTo({
                          center: [
                            location.longitude,
                            location.latitude + 0.02,
                          ],
                          zoom: 13,
                          duration: 2000,
                        });
                      }}
                    >
                      {location.latitude !== mapLocation.latitude ? (
                        <Tag
                          size="sm"
                          bgColor="#0b050575"
                          color="white"
                          borderRadius="full"
                        >
                          <Avatar
                            src="/img/diving/dive_site_icon.svg"
                            size={
                              location.latitude === mapLocation.latitude
                                ? "sm"
                                : "xs"
                            }
                            ml={-1}
                            mr={2}
                          />
                          <TagLabel>{location.name}</TagLabel>
                        </Tag>
                      ) : (
                        <DiveSiteCard
                          key={location.location_id}
                          id={location.location_id}
                          name={location.name}
                          tagList={location.divingTypes}
                          type="dive_site"
                          image={location.dive_map}
                          zIndex={3}
                        />
                      )}
                    </Marker>
                  )
              )}
            </Map>
          </Card>
        </Flex>
      </InnerContent>
      <Box h="200px" w="100%" />
    </Flex>
  );
}
