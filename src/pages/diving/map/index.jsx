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
import {
  Avatar,
  Flex,
  Tag,
  TagLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useState, useRef } from "react";
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Assets
import { supabase } from "../../api";
// import Image from "components/actions/NextChakraImg";
import Card from "components/card/Card";
// import SearchBar from "components/navbar/searchBar/SearchBar";
// import LocationSummary from "components/maps/LocationSummary";
import DiveSiteCard from "components/card/DiveSiteCard";
import DivingLayout from "layouts/DivingLayout";
// const Moralis = require("moralis/node");

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

function createKey(location) {
  return location.lat + location.lng;
}

export default function Default({ data }) {
  const mapRef = useRef();
  const [mapLocation, setMapLocation] = useState("Select Location");
  // const parsedData = JSON.parse(data);

  // const centerMap = useCallback(({ latitude, longitude }) => {
  //   mapRef.current?.flyTo({ center: [longitude, latitude], duration: 2000 });
  // }, []);

  const mapStyles = useColorModeValue(
    "mapbox://styles/ashmet/cl5g3eivr000q14pcior0262r",
    "mapbox://styles/ashmet/cl5g3eivr000q14pcior0262r"
  );

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
    </>
  );
}

export async function getStaticProps() {
  try {
    const { data: siteResults } = await supabase.from("dive_sites").select(
      `id, name, description, latitude, longitude, min_visibility, max_visibility, depth, current, cert_level,
        tags, access, dive_map, city: cities (name), country: cities (countries (name))`
    );
    const { data: centreResults } = await supabase.from("dive_centres").select(
      `id, name, description, address, latitude, longitude, payment_methods, equipment, services, languages, memberships,
      cover_photo, city: cities (name), country: cities (countries (name))`
    );
    const data = [];

    for (let i = 0; i < siteResults.length; ++i) {
      data.push({
        location_id: siteResults[i].id,
        name: siteResults[i].name,
        lat: siteResults[i].latitude,
        lng: siteResults[i].longitude,
        itemImg: siteResults[i].dive_map,
        maxDepth: siteResults[i].depth,
        cert_level: siteResults[i].cert_level,
        access: siteResults[i].access,
        divingTypes: siteResults[i].tags,
        city: siteResults[i].city.name,
        country: siteResults[i].country.countries.name,
        locationType: "dive_site",
      });
    }

    for (let i = 0; i < centreResults.length; ++i) {
      data.push({
        location_id: centreResults[i].id,
        name: centreResults[i].name,
        lat: centreResults[i].latitude,
        lng: centreResults[i].longitude,
        itemImg: centreResults[i].cover_photo,
        memberships: centreResults[i].memberships,
        languages: centreResults[i].languages,
        city: centreResults[i].city.name,
        country: centreResults[i].country.countries.name,
        locationType: "dive_centre",
      });
    }

    // const data = JSON.stringify(results);

    return {
      props: { data },
    };
  } catch (error) {
    console.error(error);
  }
}

Default.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
