/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerClusterer,
  InfoWindow,
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
  const { tripDives, setTripDives } = props;

  const [mapLocation, setMapLocation] = useState("Select Location");
  const [selectedDate, setSelectedDate] = useState();
  const [diveTime, setDiveTime] = useState();
  const [zoom, setZoom] = useState(5);
  const [infoOpen, setInfoOpen] = useState(false);
  // const [selectedPlace, setSelectedPlace] = useState(null);

  const { data } = useMoralisCloudFunction("getDiveSites");
  const { colorMode } = useColorMode();

  const textColor = useColorModeValue("secondaryGray.900", "white");

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

  // useEffect(() => {
  //   const siteNames = tripDives?.map((site) => site.name).join(" + ");
  // }, [tripDives]);

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Map";

  const addDive = () => {
    if (!mapLocation.name) {
      return;
    }
    // const dive = {
    //   id: mapLocation.location_id,
    //   siteName: mapLocation.name,
    //   diveDate: selectedDate,
    //   diveTime,
    //   priceId: mapLocation.stripePriceId,
    // };

    const newDiveList = [mapLocation, ...tripDives];
    setTripDives(newDiveList);
    console.log(tripDives[0]);
    console.log(mapLocation);
  };

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setMapLocation(place);

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);

    // If you want to zoom in a little on marker click
    if (zoom < 13) {
      setZoom(13);
    }

    // if you want to center the selected Marker
    //  setCenter(place.pos)
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
        <TimelineItem
          width="100%"
          mr="20px"
          title={
            tripDives
              ? tripDives?.map((site) => site.name).join(" + ")
              : "Select Dive Site"
          }
          day={selectedDate?.toLocaleDateString("en-US", {
            day: "numeric",
          })}
          weekday={selectedDate?.toLocaleDateString("en-US", {
            month: "short",
          })}
          hours={diveTime}
          mb="20px"
        />
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
                          onClick={(event) =>
                            markerClickHandler(event, location)
                          }
                          // onClick={(() => setMapLocation(location), onOpen)}
                          icon={{
                            url: "/img/diving/dive_site_marker.svg",
                            scaledSize:
                              location.lat === mapLocation.lat
                                ? new window.google.maps.Size(50, 50)
                                : new window.google.maps.Size(34, 34),
                          }}
                        >
                          {infoOpen && location.lat === mapLocation.lat && (
                            <InfoWindow
                              onCloseClick={() => setInfoOpen(false)}
                              position={{
                                lat: location.lat,
                                lng: location.lng,
                              }}
                            >
                              <Flex align="center" w="100%">
                                <Text
                                  ms="auto"
                                  color="gray.500"
                                  me="20px"
                                  fontSize="lg"
                                  fontWeight="500"
                                >
                                  {location.name}
                                </Text>
                                <Button
                                  _hover={{ bg: "brand.500" }}
                                  me="10px"
                                  variant="brand"
                                  borderRadius="50%"
                                  h="38px"
                                  w="38px"
                                  onClick={addDive}
                                >
                                  <Icon
                                    as={MdAdd}
                                    color="white"
                                    h="24px"
                                    w="24px"
                                  />
                                </Button>
                              </Flex>
                            </InfoWindow>
                          )}
                        </Marker>
                      ))
                    }
                  </MarkerClusterer>
                )}
              </GoogleMap>
            </Card>
          </Box>
        </Card>
        <Flex direction="column">
          <MiniCalendar
            // gridArea={{ md: "1 / 1 / 2 / 2;", lg: "1 / 1 / 2 / 2" }}
            selectRange={false}
            setSelectedDate={setSelectedDate}
            setDiveTime={setDiveTime}
          />
        </Flex>
      </Flex>
    </Card>
  );
}
