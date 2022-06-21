/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
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
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import { useState } from "react";
// Chakra imports
// Custom components
// import { IoPaperPlane } from "react-icons/io5";
import { useMoralisCloudFunction } from "react-moralis";

// Assets
import Card from "components/card/Card";
// import SearchBar from "components/navbar/searchBar/SearchBar";
import MapCard from "components/maps/MapCard";
import { DarkMap, LightMap } from "components/maps/MapStyles";
import AdminLayout from "layouts/admin";

const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const center = { lat: 28.0132, lng: 34.4751 };
const libraries = ["places"];
const containerStyle = {
  width: "100%",
  height: "100%", // { sm: "calc(100vh + 50px)", xl: "calc(100vh - 75px - 275px)" }
};
const clusterOptions = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
};

function createKey(location) {
  return location.lat + location.lng;
}

export default function Default() {
  const [mapLocation, setMapLocation] = useState("Select Location");
  const { data, error, isLoading } = useMoralisCloudFunction("getMapLocations");
  const { colorMode } = useColorMode();
  // const inputBg = useColorModeValue(
  //   { base: "SecondaryGray.300", md: "white" },
  //   { base: "navy.700", md: "navy.900" }
  // );

  const mapOptions = {
    styles: colorMode === "light" ? LightMap : DarkMap,
    disableDefaultUI: true,
    zoomControl: true,
  };

  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: mapApiKey,
    libraries,
  });

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Map";

  return (
    <Flex
      mt={{ sm: "110px", md: "80px" }}
      w="100%"
      direction={{ base: "column", lg: "row" }}
    >
      <Box
        position="relative"
        w="100%"
        height={{ sm: "calc(100vh - 250px)", md: "calc(100vh - 70px - 70px)" }}
      >
        <Card
          justifyContent="center"
          position="relative"
          direction="column"
          w="100%"
          h="100%"
          p={{ sm: "0px", md: "20px" }}
          zIndex="0"
          minH={{ base: "calc(120% - 0px)", lg: "100%" }}
        >
          <Flex
            direction="column"
            position={{ base: "unset", md: "absolute" }}
            w={{ sm: "100%", md: "calc(100% - 40px)" }}
            h={{ sm: "100%", md: "calc(100% - 40px)" }}
            zIndex="1"
          >
            {/* <SearchBar
              w={{ base: "100%", md: "292px" }}
              placeholder="Search your next destination"
              background={inputBg}
              mb="auto"
            /> */}
            <Box minH="calc(100vh - 275px)">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={4}
                options={mapOptions}
                mb="0px"
              >
                {data && (
                  <MarkerClusterer options={clusterOptions}>
                    {(clusterer) =>
                      data.map((location) => (
                        <Marker
                          key={createKey(location)}
                          position={{ lat: location.lat, lng: location.lng }}
                          clusterer={clusterer}
                          onClick={() => setMapLocation(location)}
                          icon={{
                            url:
                              location.type === "dive_site"
                                ? colorMode === "light"
                                  ? "/img/activities/dive_icon_dark.svg"
                                  : "/img/activities/dive_icon_light.svg"
                                : colorMode === "light"
                                ? "/img/activities/centre_icon_dark.svg"
                                : "/img/activities/centre_icon_light.svg",
                            scaledSize:
                              location.lat === mapLocation.lat
                                ? new window.google.maps.Size(50, 50)
                                : new window.google.maps.Size(34, 34),
                          }}
                        />
                      ))
                    }
                  </MarkerClusterer>
                )}
              </GoogleMap>
            </Box>
            <MapCard mapLocation={mapLocation} />
          </Flex>
          {/* <Map
        initialViewState={{
          latitude: 37.692,
          longitude: -122.435,
          zoom: 13,
        }}
        style={{ borderRadius: "20px", width: "100%", minHeight: "600px" }}
        mapStyle={mapStyles}
        mapboxAccessToken={MAPBOX_TOKEN}
      /> */}
        </Card>
      </Box>
    </Flex>
  );
}

Default.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
