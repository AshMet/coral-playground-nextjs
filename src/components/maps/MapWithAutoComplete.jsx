/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { useState } from "react";

import Card from "components/card/Card";
import InputField from "components/fields/InputField";
import { DarkMap, LightMap } from "components/maps/MapStyles";

const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];
const containerStyle = {
  width: "100%",
  height: "100%", // { sm: "calc(100vh + 50px)", xl: "calc(100vh - 75px - 275px)" }
};

export default function MapWithAutoComplete(props, { ...rest }) {
  const { diveCentre, setDiveCentre } = props;

  const [searchResult, setSearchResult] = useState("Result: none");
  const [latitude, setLatitude] = useState(27.2578957);
  const [longitude, setLongitude] = useState(33.8116067);

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

  // const mapRef = useRef();
  // const onMapLoad = useCallback((map) => {
  //   mapRef.current = map;
  // }, []);

  // const panTo = useCallback(({ lat, lng }) => {
  //   mapRef.current.panTo({ lat, lng });
  //   mapRef.current.setZoom(14);
  // }, []);

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Map";

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const { name, geometry } = place;
      const formattedAddress = place.formatted_address;
      setLatitude(geometry.location.lat());
      setLongitude(geometry.location.lng());
      // panTo(geometry.location.lat(), geometry.location.lng());
      setDiveCentre({
        ...diveCentre,
        name,
        address: formattedAddress,
        latitude: geometry.location.lat(),
        longitude: geometry.location.lng(),
      });
      // console.log(`place: ${JSON.stringify(place)}`);
    }
  }

  function onMarkerDrag(e) {
    const { latLng } = e;
    setLatitude(latLng.lat());
    setLongitude(latLng.lng());
    setDiveCentre({
      ...diveCentre,
      latitude: latLng.lat(),
      longitude: latLng.lng(),
    });
    // console.log(`place: ${JSON.stringify(place)}`);
  }

  return (
    <Card {...rest} maxH="max-content" w="100%">
      <Card
        bg={bg}
        height="400px"
        mb="30px"
        mx={0}
        p={0}
        w="100%"
        overflow="hidden"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{
            lat: latitude,
            lng: longitude,
          }}
          zoom={12}
          options={mapOptions}
          mb="0px"
          border="20px"
          // onLoad={onMapLoad}
        >
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <InputField
              type="text"
              mb="0px"
              label="Search"
              placeholder="Get started by searching for your business here"
              w="70%"
              mx="auto"
              bg="white"
              color="black"
            />
          </Autocomplete>
          {/* Home Marker */}
          <Marker
            position={{
              lat: latitude,
              lng: longitude,
            }}
            draggable
            onDragEnd={onMarkerDrag}
            // onClick={() => setMapLocation(location)}
            icon={{
              url: "/img/diving/dive_centre_marker.svg",
              scaledSize: new window.google.maps.Size(34, 34),
            }}
          />
        </GoogleMap>
      </Card>
    </Card>
  );
}
