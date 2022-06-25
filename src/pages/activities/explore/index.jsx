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
import { Box, Flex, Grid, Text, useColorMode } from "@chakra-ui/react";
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
import LocationSummary from "components/maps/LocationSummary";
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
    <Grid
      pt={{ base: "130px", md: "80px", xl: "80px" }}
      gridTemplateColumns={{ md: "2.15fr 1fr", xl: "2.95fr 1fr" }}
      display={{ base: "block", lg: "grid" }}
    >
      <Flex gridArea="1 / 1 / 2 / 2" display={{ base: "block", lg: "flex" }}>
        <Card
          m={0}
          p={0}
          h={{ sm: "calc(100vh - 275px)", md: "calc(100vh - 130px)" }}
          w="100%"
          overflow="hidden"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={4}
            options={mapOptions}
            mb="0px"
            border="20px"
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
                          location.locationType === "dive_site"
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
        </Card>
      </Flex>
      <Card
        align="center"
        direction="column"
        gridArea="1 / 2 / 2 / 3"
        w="100%"
        ml={{ sm: 0, lg: "20px" }}
        mt={{ sm: "20px", lg: 0 }}
      >
        <Grid
          templateColumns={{ md: "repeat(2, 1fr)", lg: "1fr" }}
          display={{ base: "block", "3xl": "grid" }}
          gridColumnGap="20px"
        >
          <LocationSummary mapLocation={mapLocation} />
        </Grid>
      </Card>
    </Grid>
  );
}

Default.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
