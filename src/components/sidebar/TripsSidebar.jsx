/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// Chakra imports
import {
  Flex,
  Text,
  Icon,
  // Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { MdAddCircle } from "react-icons/md";

import Card from "components/card/Card";
// import TimelineItem from "components/dataDisplay/TimelineItem";
import Transaction from "components/dataDisplay/Transaction";
import { DarkMap, LightMap } from "components/maps/MapStyles";

const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];
const containerStyle = {
  width: "100%",
  height: "100%", // { sm: "calc(100vh + 50px)", xl: "calc(100vh - 75px - 275px)" }
};

export default function DiveCentreSidebar({ trips, ...rest }) {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  // const textColorTertiary = useColorModeValue("secondaryGray.600", "white");
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
        mb="30px"
        mx={0}
        p={0}
        w="100%"
        overflow="hidden"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{
            lat: trips[0]?.centreLat || 28,
            lng: trips[0]?.centreLng || 35,
          }}
          zoom={8}
          options={mapOptions}
          mb="0px"
          border="20px"
        >
          {trips &&
            trips.map((trip) =>
              trip.siteList.map((site) => (
                <Marker
                  key={site.latitude + trip.longitude}
                  position={{
                    lat: site.latitude,
                    lng: site.longitude,
                  }}
                  // onClick={() => setMapLocation(location)}
                  icon={{
                    url: "/img/diving/dive_site_marker.svg",
                    scaledSize: new window.google.maps.Size(34, 34),
                  }}
                />
              ))
            )}
          {trips &&
            trips.map((trip) => (
              <Marker
                position={{
                  lat: trip.centreLat,
                  lng: trip.centreLng,
                }}
                icon={{
                  url: "/img/diving/dive_centre_marker.svg",
                  scaledSize: new window.google.maps.Size(34, 34),
                }}
              />
            ))}
        </GoogleMap>
      </Card>
      {trips.length > 0 ? (
        trips.map((trip) => (
          <Flex justify="space-between" mb="25px" align="center">
            <Transaction
              key={trip.id}
              tripId={trip.id}
              siteList={trip.siteList}
              centreName={trip.centreName}
              diveDate={trip.startTime}
              price={trip.price}
              locationType="dive_centre"
              icon={
                <Icon as={MdAddCircle} color={textColor} w="20px" h="18px" />
              }
            />
          </Flex>
        ))
      ) : (
        <Text fontSize="md" fontWeight="500" color="purple.500" mb="30px">
          No Dives scheduled. Check again soon, new dives are getting added all
          the time
        </Text>
      )}
    </Card>
  );
}
