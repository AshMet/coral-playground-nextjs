/* eslint-disable react/no-array-index-key */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useToast,
  useColorMode,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";

import AlertPopup from "components/alerts/AlertPopup";
import Card from "components/card/Card";
import { DarkMap, LightMap } from "components/maps/MapStyles";
// import * as gtag from "lib/data/gtag";
import { supabase } from "pages/api/index";

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

function createKey(site) {
  return site.latitude + site.longitude;
}

export default function DiveSelection(props) {
  const { selectedSites, setSelectedSites } = props;

  // const { diveCount } = diveTrip || {};

  const [mapLocation, setMapLocation] = useState("Select Location");
  const [diveSites, setDiveSites] = useState();
  const [loading, setLoading] = useState();
  const [zoom, setZoom] = useState(5);
  const [infoOpen, setInfoOpen] = useState(false);
  const toast = useToast();
  const posthog = usePostHog();

  async function fetchSites() {
    setLoading(true);
    const { data: sites } = await supabase
      .from("dive_sites")
      .select(`id, name, latitude, longitude`);
    // console.log("siteTripData", data);
    setDiveSites(sites);
    setLoading(false);
  }

  useEffect(() => {
    fetchSites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add items to cart
  function addSite(newItem) {
    const alreadyInCart = selectedSites.some((item) => item.id === newItem.id);
    // console.log("newItem", newItem);
    if (alreadyInCart) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="warning"
            text="Item was already added"
            subtext="Select a different site"
          />
        ),
      });
      return;
    }

    setSelectedSites((prevItems) => [...prevItems, newItem]);
    toast({
      position: "top",
      render: () => (
        <AlertPopup
          type="success"
          text={`Dive Site Added: ${newItem.name}`}
          subtext="Click save to complete dive trip creation"
        />
      ),
    });
    // gtag.event({
    //   action: "add-site-to-trip",
    //   category: "button",
    //   label: "Add Dive Site to Trip",
    //   value: newItem.name,
    // });
    posthog.capture("Dive Site Added to Trip", {
      "Dive Site": newItem.name,
    });
  }

  // console.log(data);
  const { colorMode } = useColorMode();
  // const textColor = useColorModeValue("secondaryGray.900", "white");

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

  return loading ? (
    <Spinner size="lg" />
  ) : (
    <>
      <Flex direction="column">
        <Card
          minH="300px"
          p="0px"
          // pr={{ sm: "0px", lg: "20px" }}
          pb={{ sm: "20px", lg: "0px" }}
        >
          <Box height="100%" position="relative">
            <Card
              m={0}
              p={0}
              h={{ sm: "300px", md: "300px" }}
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
                {diveSites && (
                  <MarkerClusterer options={clusterOptions}>
                    {(clusterer) =>
                      diveSites.map((site) => (
                        <Marker
                          key={createKey(site)}
                          position={{
                            lat: site.latitude,
                            lng: site.longitude,
                          }}
                          clusterer={clusterer}
                          onClick={(event) => markerClickHandler(event, site)}
                          // onClick={(() => setMapLocation(site), onOpen)}
                          icon={{
                            url: "/img/diving/dive_site_marker.svg",
                            scaledSize:
                              site.latitude === mapLocation.latitude
                                ? new window.google.maps.Size(50, 50)
                                : new window.google.maps.Size(34, 34),
                          }}
                        >
                          {infoOpen &&
                            site.latitude === mapLocation.latitude && (
                              <InfoWindow
                                onCloseClick={() => setInfoOpen(false)}
                                position={{
                                  lat: site.latitude,
                                  lng: site.longitude,
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
                                    {site.name}
                                  </Text>
                                  <Button
                                    me="10px"
                                    bgColor="brand.100"
                                    _hover={{ bg: "brand.500" }}
                                    borderRadius="50%"
                                    h="38px"
                                    w="38px"
                                    onClick={() => addSite(site)}
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
      </Flex>
      {selectedSites.length > 0 && (
        <Flex mt={3} mb={3} flexWrap="wrap">
          <Text mr={5} mt={3}>
            Selected Sites:{" "}
          </Text>
          {selectedSites.map((site, index) => (
            <Badge key={index} colorScheme="green" mr={3} mt={3}>
              {site.name}
            </Badge>
          ))}
        </Flex>
      )}
      <Button
        size="lg"
        color="white"
        bgColor="brand.300"
        _hover={{ bg: "brand.400" }}
        mt={2}
        onClick={() => {
          setSelectedSites([]);
          setStartDate();
        }}
      >
        Clear Sites
      </Button>
    </>
  );
}
