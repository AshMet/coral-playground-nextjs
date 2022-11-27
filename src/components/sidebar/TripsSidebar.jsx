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
  Divider,
  // Button,
} from "@chakra-ui/react";
// Custom components
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import Link from "next/link";
import { MdAddCircle } from "react-icons/md";

import Card from "components/card/Card";
// import TimelineItem from "components/dataDisplay/TimelineItem";
import TripLineItem from "components/dataDisplay/TripLineItem";
import { DarkMap, LightMap } from "components/maps/MapStyles";

const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];
const containerStyle = {
  width: "100%",
  height: "100%", // { sm: "calc(100vh + 50px)", xl: "calc(100vh - 75px - 275px)" }
};

// const userQuery = await new Moralis.Query(Moralis.Role).equalTo("users", user).find();

export default function TripSidebar({ trips, diveCentreId, ...rest }) {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorTertiary = useColorModeValue(
    "secondaryGray.700",
    "secondaryGray.500"
  );
  const bg = useColorModeValue("secondaryGray.300", "navy.700");
  const { colorMode } = useColorMode();

  const mapOptions = {
    styles: colorMode === "light" ? LightMap : DarkMap,
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeId: "satellite",
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

  // console.log("sidebar trips", trips);

  return (
    <Card {...rest} maxH="max-content">
      <Text color={textColor} fontSize="xl" fontWeight="700" mb="16px">
        Upcoming Dive Trips
      </Text>
      <Text color={textColorTertiary} fontSize="md" mb="16px">
        Add a dive to your cart by selecting your preferred date and clicking
        the <Icon as={MdAddCircle} color="brand.400" w="16px" h="16px" /> button
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
            lat: trips[0]?.dive_centre.latitude || 28,
            lng: trips[0]?.dive_centre.longitude || 35,
          }}
          zoom={8}
          options={mapOptions}
          mb="0px"
          border="20px"
        >
          {trips &&
            trips.map((trip) =>
              trip.dive_sites.map((site) => (
                <Marker
                  key={`${trip.id}-${site.id}`}
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
                key={trip.dive_centre.id}
                position={{
                  lat: trip.dive_centre.latitude,
                  lng: trip.dive_centre.longitude,
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
          <Flex
            key={trip.id}
            direction="column"
            justify="space-between"
            align="center"
          >
            <TripLineItem
              trip={trip}
              locationType="dive_centre"
              icon={
                <Icon as={MdAddCircle} color={textColor} w="20px" h="18px" />
              }
            />
            <Divider my="25px" />
          </Flex>
        ))
      ) : (
        <Text fontSize="md" fontWeight="500" color="brand.400" mb="30px">
          No Dives scheduled. Check again soon, new dives are getting added all
          the time
        </Text>
      )}
      {/* Need to add logic to authorize only allowed users to create a new trip */}
      {/* {diveCentreId && (
        <Link
          href={{
            pathname: "/diving/dive_trips/new",
            query: { diveCentreId },
          }}
        >
          <Button>New Trip</Button>
        </Link>
      )} */}
    </Card>
  );
}
