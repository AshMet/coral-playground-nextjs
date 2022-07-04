/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { useMoralisCloudFunction } from "react-moralis";

import MiniCalendar from "components/calendar/MiniCalendar";
import Card from "components/card/Card";
import TimelineItem from "components/dataDisplay/TimelineItem";
import { DarkMap, LightMap } from "components/maps/MapStyles";

const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const center = { lat: 28.0132, lng: 34.4751 };
const libraries = ["places"];
const containerStyle = {
  width: "100%",
  height: "100%", // { sm: "calc(100vh + 50px)", xl: "calc(100vh - 75px - 275px)" }
};
const clusterOptions = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
};

function createKey(location) {
  return location.lat + location.lng;
}
export default function DiveSelection(props) {
  const { dives, setDives } = props;
  const [mapLocation, setMapLocation] = useState("Select Location");
  const [selectedDate, setSelectedDate] = useState();
  const [diveTime, setDiveTime] = useState();
  const { data } = useMoralisCloudFunction("getDiveSites");
  const { colorMode } = useColorMode();

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const shadow = useColorModeValue(
    "18px 17px 40px 4px rgba(112, 144, 176, 0.1)",
    "unset"
  );

  const mapOptions = {
    styles: colorMode === "light" ? LightMap : DarkMap,
    disableDefaultUI: true,
    zoomControl: true,
  };

  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: mapApiKey,
    libraries,
  });

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Map";

  const addDive = () => {
    if (!mapLocation.name || !selectedDate || !diveTime) {
      return;
    }
    const dive = {
      id: mapLocation.location_id,
      siteName: mapLocation.name,
      diveDate: selectedDate,
      diveTime,
      priceId: mapLocation.stripePriceId,
    };

    const newDiveList = [dive, ...dives];
    setDives(newDiveList);
    console.log(...dives);
    console.log(mapLocation);
  };

  return (
    <Card mb="20px">
      <Box>
        <Text fontSize="2xl" fontWeight="700" color={textColor}>
          Select Dives
        </Text>
        <Text
          fontSize="md"
          fontWeight="500"
          color="secondaryGray.600"
          mb="30px"
        >
          Add your dives to get started
        </Text>
      </Box>
      <Flex direction={{ sm: "column", lg: "row" }}>
        <Card
          minH="400px"
          p="0px"
          pr={{ sm: "0px", lg: "20px" }}
          pb={{ sm: "20px", lg: "0px" }}
        >
          <Box height="100%" minH="400px" position="relative">
            <Card
              m={0}
              p={0}
              h={{ sm: "425px", md: "425px" }}
              w="100%"
              overflow="hidden"
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={4}
                options={mapOptions}
                mb="0px"
              >
                {data && (
                  <MarkerClusterer options={clusterOptions}>
                    {(clusterer) =>
                      data.map((location) => (
                        <Marker
                          key={createKey(location)}
                          position={{
                            lat: location.lat,
                            lng: location.lng,
                          }}
                          clusterer={clusterer}
                          onClick={() => setMapLocation(location)}
                          icon={{
                            url:
                              colorMode === "light"
                                ? "/img/diving/dive_icon_dark.svg"
                                : "/img/diving/dive_icon_light.svg",
                            scaledSize:
                              location.lat === mapLocation.lat
                                ? new window.google.maps.Size(50, 50)
                                : new window.google.maps.Size(34, 34),
                          }}
                        />
                      ))
                    }
                  </MarkerClusterer>
                )}
              </GoogleMap>
            </Card>
          </Box>
        </Card>
        <MiniCalendar
          // gridArea={{ md: "1 / 1 / 2 / 2;", lg: "1 / 1 / 2 / 2" }}
          selectRange={false}
          mb="20px"
          setSelectedDate={setSelectedDate}
          setDiveTime={setDiveTime}
        />
      </Flex>
      <Flex direcion="row" w="100%" mt="20px">
        <TimelineItem
          width="100%"
          mr="20px"
          title={mapLocation?.name || "Select Dive Site"}
          day={selectedDate?.toLocaleDateString("en-US", {
            day: "numeric",
          })}
          weekday={selectedDate?.toLocaleDateString("en-US", {
            month: "short",
          })}
          hours={diveTime}
        />
        <Flex direction="column" align="center">
          <IconButton
            borderRadius="50%"
            variant="darkBrand"
            w="56px"
            h="56px"
            mb="5px"
            boxShadow={shadow}
            icon={<Icon as={MdAdd} color="white" w="24px" h="24px" />}
            onClick={addDive}
          />
          <Text fontSize="sm" fontWeight="500" color={textColor}>
            Add Dive
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
