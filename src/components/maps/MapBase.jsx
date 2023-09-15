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
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { useRef, useState } from "react";
import Map, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

// import { logojson } from "../../lib/data/mapbox/coral-logo";
import Card from "components/card/Card";

import "mapbox-gl/dist/mapbox-gl.css";

import MapMarker from "./MapMarker";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapBase(props) {
  const { diveSites, diveCentres, h, pt, gridArea, boxShadow, scrollZoom } =
    props;
  const [mapLocation, setMapLocation] = useState("Select Location");
  const mapRef = useRef();

  const mapStyles = useColorModeValue(
    "mapbox://styles/ashmet/cl5g3eivr000q14pcior0262r",
    "mapbox://styles/ashmet/cl5g3eivr000q14pcior0262r"
  );

  const settings = {
    scrollZoom: scrollZoom || false,
  };

  // const layerStyle = {
  //   id: "point",
  //   type: "circle",
  //   paint: {
  //     "circle-radius": 10,
  //     "circle-color": "#007cbf",
  //   },
  // };

  return (
    <Flex
      gridArea={gridArea}
      display={{ base: "block", lg: "flex" }}
      direction={{ sm: "column", md: "row" }}
      w="full"
      pt={pt}
      boxShadow={boxShadow}
    >
      <Card
        justifyContent="center"
        position="relative"
        direction="column"
        borderRadius="xl"
        w="100%"
        p={{ sm: "0px", md: "10px" }}
        zIndex="0"
        h={h} // "100vh"
        overflow="hidden"
      >
        <Map
          ref={mapRef}
          initialViewState={{
            latitude: 27.2134,
            longitude: 33.9,
            pitch: 65,
            zoom: 12,
            scrollZoom: false,
            // touchZoom: false,
            doubleClickZoom: true,
            // dragPan: false,
            // dragRotate: false,
            // touchRotate: false,
            // keyboard: false,
          }}
          {...settings}
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
                  key={location.id}
                  location={location}
                  mapLocation={mapLocation}
                  setMapLocation={setMapLocation}
                  type="diveCentre"
                  mapRef={mapRef}
                />
              )
          )}
          {/* <Source type="geojson" data={logojson}>
            <Layer {...layerStyle} />
          </Source> */}
          {/* <TripSearchBar
            // city={city}
            // setCity={setCity}
            title
            searchButton
            mt="calc(100vh - 200px)"
            mb="20px"
          /> */}
        </Map>
      </Card>
    </Flex>
  );
}
