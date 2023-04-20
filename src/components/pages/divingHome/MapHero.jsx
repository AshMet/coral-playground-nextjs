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
  Box,
  chakra,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import Map, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

import Card from "components/card/Card";

import "mapbox-gl/dist/mapbox-gl.css";
import MapMarker from "./MapMarker";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapHero(props) {
  const { diveSites, diveCentres } = props;
  const [mapLocation, setMapLocation] = useState("Select Location");
  const mapRef = useRef();

  const mapStyles = useColorModeValue(
    "mapbox://styles/ashmet/cl5g3eivr000q14pcior0262r",
    "mapbox://styles/ashmet/cl5g3eivr000q14pcior0262r"
  );

  return (
    <Flex
      w="100%"
      direction={{ base: "column" }}
      // pt={{ base: "180px", md: "200px", xl: "100px" }}
      overflow="hidden"
      bgSize="cover"
      position="relative"
      h="100vh"
    >
      {/* <InnerContent w="100%"> */}
      <Flex
        direction={{ sm: "column", md: "row" }}
        w="full"
        // h={{ sm: "75vh", lg: "50vh" }}
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
          h="100vh"
          overflow="hidden"
        >
          <Map
            ref={mapRef}
            initialViewState={{
              latitude: 28.0132,
              longitude: 33.7751,
              pitch: 85,
              zoom: 7,
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

            {diveSites?.map(
              (location) =>
                location.latitude &&
                location.longitude && (
                  <MapMarker
                    location={location}
                    mapLocation={mapLocation}
                    setMapLocation={setMapLocation}
                    type="diveSite"
                    mapRef={mapRef}
                  />
                )
            )}
            {diveCentres?.map(
              (location) =>
                location.latitude &&
                location.longitude && (
                  <MapMarker
                    location={location}
                    mapLocation={mapLocation}
                    setMapLocation={setMapLocation}
                    type="diveCentre"
                    mapRef={mapRef}
                  />
                )
            )}
          </Map>
        </Card>
      </Flex>
      {/* </InnerContent> */}
      <Stack
        direction="column"
        spacing={10}
        justifyContent="center"
        align="center"
        mt={{ sm: "-120px", lg: "-170px" }}
        zIndex={50}
      >
        <Box
          textAlign="center"
          justifyContent="center"
          bgColor="#2f353c69"
          py={10}
          borderRadius="2xl"
        >
          <Text
            as="h1"
            fontSize={{ sm: "3xl", lg: "5xl" }}
            color="white"
            lineHeight={1}
            fontWeight="bold"
            mx={{ sm: "10px", lg: "100px" }}
          >
            Book Your Next
            <chakra.span
              bgGradient="linear(to-br, brand.100, red.400)"
              bgClip="text"
            >
              {" "}
              Red Sea{" "}
            </chakra.span>{" "}
            Diving Adventure
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
}
