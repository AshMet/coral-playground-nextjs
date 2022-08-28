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
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useState, useRef } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Assets
import Image from "components/actions/NextChakraImg";
import Card from "components/card/Card";
// import SearchBar from "components/navbar/searchBar/SearchBar";
// import LocationSummary from "components/maps/LocationSummary";
import DiveSiteCard from "components/card/DiveSiteCard";
import AdminLayout from "layouts/admin";

const Moralis = require("moralis/node");

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

function createKey(location) {
  return location.lat + location.lng;
}

export default function Default({ data }) {
  const mapRef = useRef();
  const [mapLocation, setMapLocation] = useState("Select Location");
  const parsedData = JSON.parse(data);

  // const centerMap = useCallback(({ latitude, longitude }) => {
  //   mapRef.current?.flyTo({ center: [longitude, latitude], duration: 2000 });
  // }, []);

  const mapStyles = useColorModeValue(
    "mapbox://styles/ashmet/cl5g3eivr000q14pcior0262r",
    "mapbox://styles/ashmet/cl5g3eivr000q14pcior0262r"
  );
  const [popupInfo, setPopupInfo] = useState(null);

  return (
    <>
      <NextSeo
        title="Dive Map"
        description="Explore dive sites and centres on our interactive map"
      />
      <Flex
        gridArea="1 / 1 / 1 / 1"
        display={{ base: "block", lg: "flex" }}
        pt={{ base: "130px", md: "80px", xl: "80px" }}
      >
        <Card
          justifyContent="center"
          position="relative"
          direction="column"
          w="100%"
          p={{ sm: "0px", md: "10px" }}
          zIndex="0"
          h={{ sm: "calc(100vh - 200px)", md: "calc(100vh - 130px)" }}
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
          >
            <GeolocateControl position="top-left" />
            <FullscreenControl position="top-left" />
            <NavigationControl position="top-left" />
            <ScaleControl />

            {parsedData?.map(
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
                      setPopupInfo(location);
                      mapRef.current?.flyTo({
                        center: [location.lng, location.lat + 0.02],
                        zoom: 13,
                        duration: 2000,
                      });
                    }}
                  >
                    <Image
                      src={
                        location.locationType === "dive_site"
                          ? "/img/diving/dive_site_marker.svg"
                          : "/img/diving/dive_centre_marker.svg"
                      }
                      alt="map icon"
                      height={location.lat === mapLocation.lat ? 50 : 30}
                      width={location.lat === mapLocation.lat ? 50 : 30}
                    />
                  </Marker>
                )
            )}
            {popupInfo && (
              <Popup
                anchor="bottom"
                offset={20}
                closeButton={false}
                longitude={Number(popupInfo.lng)}
                latitude={Number(popupInfo.lat)}
                onClose={() => setPopupInfo(null)}
                style={{ ".mapboxgl-popup-content": { background: "#345346" } }}
              >
                <DiveSiteCard
                  key={popupInfo.location_id}
                  id={popupInfo.location_id}
                  name={popupInfo.name}
                  tagList={popupInfo.divingTypes}
                  type={popupInfo.locationType}
                  image={popupInfo.itemImg?.url}
                />
              </Popup>
            )}
          </Map>
        </Card>
      </Flex>
    </>
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
      itemImg: centreResults[i].attributes.coverPhoto,
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
