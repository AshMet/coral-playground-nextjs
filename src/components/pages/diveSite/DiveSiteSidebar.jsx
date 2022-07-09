/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// Chakra imports
import {
  Flex,
  Text,
  Icon,
  useColorMode,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react";
// Custom components
// import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { HiOutlineLocationMarker } from "react-icons/hi";

import Card from "components/card/Card";
import TimelineItem from "components/dataDisplay/TimelineItem";
// import { CircProgressMini } from "components/charts/CircularProgress";
// Assets
// import diploma from "assets/img/account/Diploma.png";
import { DarkMap, LightMap } from "components/maps/MapStyles";

const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const center = { lat: 28.0132, lng: 34.4751 };
const libraries = ["places"];
const containerStyle = {
  width: "100%",
  height: "100%", // { sm: "calc(100vh + 50px)", xl: "calc(100vh - 75px - 275px)" }
};

function createKey(location) {
  return location.lat + location.lng;
}

export default function CourseInfo({
  depth,
  visibility,
  current,
  access,
  certLevel,
  diveTypes,
  city,
  country,
  trips,
  ...rest
}) {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorTertiary = useColorModeValue("secondaryGray.600", "white");
  const bg = useColorModeValue("secondaryGray.300", "navy.700");
  const { colorMode } = useColorMode();

  const mapOptions = {
    styles: colorMode === "light" ? LightMap : DarkMap,
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControlOptions: {
      mapTypeIds: ["coordinate", "satellite"],
      // style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
    },
  };

  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: mapApiKey,
    libraries,
  });

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Map";
  return (
    <Card {...rest} maxH="max-content">
      <Text color={textColor} fontSize="xl" fontWeight="700" mb="16px">
        Upcoming Dive Trips
      </Text>
      <Card
        bg={bg}
        height="200px"
        maxW={{ base: "400px" }}
        mb="20px"
        m={0}
        p={0}
        w="100%"
        overflow="hidden"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={7}
          options={mapOptions}
          mb="0px"
          border="20px"
        >
          {trips &&
            trips.map((trip) => (
              <Marker
                key={createKey(trip.diveCentre)}
                position={{
                  lat: trip.diveCentre.latitude,
                  lng: trip.diveCentre.longitude,
                }}
                // onClick={() => setMapLocation(location)}
                icon={{
                  url:
                    colorMode === "light"
                      ? "/img/diving/centre_icon_dark.svg"
                      : "/img/diving/centre_icon_light.svg",
                  scaledSize: new window.google.maps.Size(34, 34),
                }}
              />
            ))}
          <Marker
            // key={createKey(trips[0].diveSite)}
            position={{
              lat: trips[0].diveSite.latitude,
              lng: trips[0].diveSite.longitude,
            }}
            // onClick={() => setMapLocation(location)}
            icon={{
              url:
                colorMode === "light"
                  ? "/img/diving/dive_icon_dark.svg"
                  : "/img/diving/dive_icon_light.svg",
              scaledSize: new window.google.maps.Size(34, 34),
            }}
          />
        </GoogleMap>
      </Card>
      <Flex mb="15px" align="center" cursor="pointer">
        <Icon
          as={HiOutlineLocationMarker}
          ms="auto"
          h="22px"
          w="22px"
          mr="10px"
          color={textColorTertiary}
        />
        <Text color={textColorTertiary} fontWeight="500" fontSize="md" me="5px">
          Address
        </Text>
        <Spacer />
      </Flex>
      <Flex wrap="wrap" gap={3} mb="25px">
        {`${city}, ${country}`}
      </Flex>
      {/* {trips.map((trip) => {
        return <Text> {trip.notes} </Text>;
      })} */}
      {trips.length > 0 ? (
        trips.map((trip) => (
          <TimelineItem
            key={trip.id}
            id={trip.id}
            mb="16px"
            title={trip.diveCentre.name}
            day={new Date(trip.startTime?.iso).toLocaleDateString("en-US", {
              day: "numeric",
            })}
            weekday={new Date(trip.startTime?.iso).toLocaleDateString("en-US", {
              month: "short",
            })}
            hours={new Date(trip.startTime?.iso).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            // removeDive={removeDive}
          />
        ))
      ) : (
        <Text fontSize="md" fontWeight="500" color="purple.500" mb="30px">
          No Dive currently scheduled. New dives are getting added all the time
        </Text>
      )}
    </Card>
  );
}
