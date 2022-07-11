/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable sonarjs/no-duplicate-string */
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
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import { useMoralisCloudFunction } from "react-moralis";

// Assets
import Image from "components/actions/NextChakraImg";
import Card from "components/card/Card";
// import SearchBar from "components/navbar/searchBar/SearchBar";
import LocationSummary from "components/maps/LocationSummary";
import AdminLayout from "layouts/admin";

// import { IoPaperPlane } from "react-icons/io5";
const Moralis = require("moralis/node");

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

function createKey(location) {
  return location.lat + location.lng;
}

export default function Default({ data }) {
  const [mapLocation, setMapLocation] = useState("Select Location");
  // const { data } = useMoralisCloudFunction("getMapLocations");
  const parsedData = JSON.parse(data);

  const mapStyles = useColorModeValue(
    "mapbox://styles/ashmet/cl5g3eivr000q14pcior0262r",
    "mapbox://styles/ashmet/cl5g3eivr000q14pcior0262r"
  );

  return (
    <Grid
      pt={{ base: "130px", md: "80px", xl: "80px" }}
      gridTemplateColumns={{ md: "2.15fr 1fr", xl: "2.95fr 1fr" }}
      display={{ base: "block", lg: "grid" }}
    >
      <Flex gridArea="1 / 1 / 2 / 2" display={{ base: "block", lg: "flex" }}>
        <Card
          justifyContent="center"
          position="relative"
          direction="column"
          w="100%"
          p={{ sm: "0px", md: "10px" }}
          zIndex="0"
          minH={{ sm: "calc(100vh - 275px)", md: "calc(100vh - 130px)" }}
        >
          <Map
            initialViewState={{
              latitude: 28.0132,
              longitude: 33.7751,
              pitch: 85, // pitch in degrees
              // bearing: -60, // bearing in degrees
              zoom: 7,
            }}
            style={{ borderRadius: "20px", width: "100%", minHeight: "600px" }}
            mapStyle={mapStyles}
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            {parsedData?.map(
              (location) =>
                location.lat &&
                location.lng && (
                  <Marker
                    key={createKey(location)}
                    latitude={location.lat}
                    longitude={location.lng}
                    color="red"
                    onClick={() => setMapLocation(location)}
                  >
                    <Image
                      src={
                        location.locationType === "dive_site"
                          ? "/img/diving/dive_icon_dark.svg"
                          : "/img/diving/centre_icon_dark.svg"
                      }
                      alt="map icon"
                      height={location.lat === mapLocation.lat ? 50 : 30}
                      width={location.lat === mapLocation.lat ? 50 : 30}
                    />
                  </Marker>
                )
            )}
          </Map>
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

// This works with parsed data in the body. Not sure why images were not working
export async function getStaticProps() {
  const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
  const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
  Moralis.initialize(appId);
  Moralis.serverURL = serverUrl;
  const siteQuery = new Moralis.Query("DiveSites");
  const centreQuery = new Moralis.Query("DiveCentres");

  const siteResults = await siteQuery.find();
  const centreResults = await centreQuery.find();
  const results = [];

  for (let i = 0; i < siteResults.length; ++i) {
    results.push({
      location_id: siteResults[i].id,
      name: siteResults[i].attributes.name,
      lat: siteResults[i].attributes.latitude,
      lng: siteResults[i].attributes.longitude,
      itemImg: siteResults[i].attributes.diveMap,
      maxDepth: siteResults[i].attributes.maxDepth,
      certLevel: siteResults[i].attributes.certLevel,
      access: siteResults[i].attributes.access,
      divingTypes: siteResults[i].attributes.divingTypes,
      city: siteResults[i].attributes.city,
      country: siteResults[i].attributes.country,
      locationType: "dive_site",
    });
  }

  for (let i = 0; i < centreResults.length; ++i) {
    results.push({
      location_id: centreResults[i].id,
      name: centreResults[i].attributes.name,
      lat: centreResults[i].attributes.latitude,
      lng: centreResults[i].attributes.longitude,
      itemImg: centreResults[i].attributes.photo,
      memberships: centreResults[i].attributes.memberships,
      languages: centreResults[i].attributes.languages,
      city: centreResults[i].attributes.city,
      country: centreResults[i].attributes.country,
      locationType: "dive_centre",
    });
  }
  const data = JSON.stringify(results);

  return {
    props: { data },
  };
}

Default.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
