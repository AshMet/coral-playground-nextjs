/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import Card from "components/card/Card";
import { DarkMap, LightMap } from "components/maps/MapStyles";

const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];
const containerStyle = {
  width: "100%",
  height: "100%", // { sm: "calc(100vh + 50px)", xl: "calc(100vh - 75px - 275px)" }
};

export default function TripsMap(props) {
  const { trips, diveSite, diveCentre } = props;
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
  return (
    <Card
      bg={bg}
      height="200px"
      maxW={{ base: "400px" }}
      mb="10px"
      mx={0}
      p={0}
      w="100%"
      overflow="hidden"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: diveSite ? diveSite.latitude : diveCentre.latitude, // || 28
          lng: diveSite ? diveSite.longitude : diveCentre.longitude, // || 35
        }}
        zoom={8}
        options={mapOptions}
        mb="0px"
        border="20px"
      >
        {/* Home Marker */}
        <Marker
          key={diveSite ? diveSite.id : diveCentre.id}
          position={{
            lat: diveSite ? diveSite.latitude : diveCentre.latitude,
            lng: diveSite ? diveSite.longitude : diveCentre.longitude,
          }}
          // onClick={() => setMapLocation(location)}
          icon={{
            url: diveSite
              ? "/img/diving/dive_site_marker.svg"
              : "/img/diving/dive_centre_marker.svg",
            scaledSize: new window.google.maps.Size(34, 34),
          }}
        />

        {/* Show all dive sites with trips from given diveCentre */}
        {diveCentre &&
          trips?.map((trip) =>
            trip.dive_sites.map((site) => (
              <Marker
                key={`${trip.id}-${site.id}`}
                position={{
                  lat: site.dive_site.latitude,
                  lng: site.dive_site.longitude,
                }}
                // onClick={() => setMapLocation(location)}
                icon={{
                  url: "/img/diving/dive_site_marker.svg",
                  scaledSize: new window.google.maps.Size(34, 34),
                }}
              />
            ))
          )}

        {/* Show all dive centres with trips to given diveSite */}
        {diveSite &&
          trips?.map((trip) => (
            <Marker
              key={trip.dive_trip.dive_centre.id}
              position={{
                lat: trip.dive_trip.dive_centre.latitude,
                lng: trip.dive_trip.dive_centre.longitude,
              }}
              icon={{
                url: "/img/diving/dive_centre_marker.svg",
                scaledSize: new window.google.maps.Size(34, 34),
              }}
            />
          ))}
      </GoogleMap>
    </Card>
  );
}
