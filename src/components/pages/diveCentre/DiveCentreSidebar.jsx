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
const center = { lat: 28.0132, lng: 34.4751 };
const libraries = ["places"];
const containerStyle = {
  width: "100%",
  height: "100%", // { sm: "calc(100vh + 50px)", xl: "calc(100vh - 75px - 275px)" }
};

function createKey(location) {
  return location.lat + location.lng;
}

export default function DiveCentreSidebar({
  centreId,
  centreName,
  address,
  city,
  country,
  trips,
  ...rest
}) {
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
              lat: trips[0]?.diveSite.latitude,
              lng: trips[0]?.diveSite.longitude,
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
      {trips.length > 0 ? (
        trips.map((trip) => (
          <Flex justify="space-between" mb="25px" align="center">
            <Transaction
              key={trip.id}
              id={trip.id}
              siteId={trip.diveSite.id}
              siteName={trip.diveSite.name}
              siteList={trip.diveSites}
              centreName={centreName}
              diveDate={trip.startTime}
              price={trip.price / 100}
              locationType="dive_centre"
              icon={
                <Icon as={MdAddCircle} color={textColor} w="20px" h="18px" />
              }
            />
          </Flex>
        ))
      ) : (
        <Text fontSize="md" fontWeight="500" color="purple.500" mb="30px">
          No Dive currently scheduled. New dives are getting added all the time
        </Text>
      )}
    </Card>
  );
}
