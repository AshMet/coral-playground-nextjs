/* eslint-disable consistent-return */
/* eslint-disable no-console */
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
import axios from "axios";
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
import NftLayout from "layouts/nft";
// const Moralis = require("moralis/node");

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

export async function getStaticProps() {
  try {
    const siteQuery = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/dive_sites`
    );
    const centreQuery = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/dive_centres`
    );
    const { data: siteResults } = siteQuery;
    const { data: centreResults } = centreQuery;
    const results = [];

    for (let i = 0; i < siteResults.length; ++i) {
      results.push({
        location_id: siteResults[i].id,
        name: siteResults[i].name,
        lat: siteResults[i].latitude,
        lng: siteResults[i].longitude,
        itemImg: siteResults[i].dive_map_url,
        maxDepth: siteResults[i].depth,
        certLevel: siteResults[i].cert_level,
        access: siteResults[i].access,
        divingTypes: siteResults[i].tags,
        city: siteResults[i].city,
        country: siteResults[i].country,
        locationType: "dive_site",
      });
    }

    for (let i = 0; i < centreResults.length; ++i) {
      results.push({
        location_id: centreResults[i].id,
        name: centreResults[i].name,
        lat: centreResults[i].latitude,
        lng: centreResults[i].longitude,
        itemImg: centreResults[i].cover_photo_url,
        memberships: centreResults[i].memberships,
        languages: centreResults[i].languages,
        city: centreResults[i].city,
        country: centreResults[i].country,
        locationType: "dive_centre",
      });
    }

    const data = JSON.stringify(results);

    return {
      props: { data },
    };
  } catch (error) {
    console.error(error);
  }
}

Default.getLayout = function getLayout(page) {
  return <NftLayout>{page}</NftLayout>;
};
