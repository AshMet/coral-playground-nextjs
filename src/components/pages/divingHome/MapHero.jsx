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
  chakra,
  Flex,
  Stack,
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
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

function createKey(location) {
  return location.lat + location.lng;
}

export default function Mission(props) {
  const { data } = props;
  const mapRef = useRef();
  const [mapLocation, setMapLocation] = useState("Select Location");

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

            {data?.map(
              (location) =>
                location.lat &&
                location.lng && (
                  <Marker
                    key={createKey(location)}
                    latitude={location.lat}
                    longitude={location.lng}
                    anchor="bottom"
                    onClick={(e) => {
                      // If we let the click event propagates to the map, it will immediately close the popup
                      // with `closeOnClick: true`
                      e.originalEvent.stopPropagation();
                      setMapLocation(location);
                      mapRef.current?.flyTo({
                        center: [location.lng, location.lat + 0.02],
                        zoom: 13,
                        duration: 2000,
                      });
                    }}
                  >
                    {location.lat !== mapLocation.lat ? (
                      <Tag
                        size="sm"
                        bgColor="#0b050575"
                        color="white"
                        borderRadius="full"
                      >
                        <Avatar
                          src={
                            location.locationType === "dive_site"
                              ? "/img/diving/dive_site_icon.svg"
                              : "/img/diving/dive_centre_icon.svg"
                          }
                          size={location.lat === mapLocation.lat ? "sm" : "xs"}
                          // name={location.name}
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
                        type={location.locationType}
                        image={location.itemImg}
                        zIndex={3}
                      />
                    )}
                  </Marker>
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
        mt={{ sm: "-220px", lg: "-170px" }}
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
            fontSize={{ sm: "5xl", lg: "5xl" }}
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
