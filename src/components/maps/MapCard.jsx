/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
// import React from "react";
import { Icon, Flex, Badge, useColorModeValue, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  MdCreditCard,
  MdPerson,
  MdShowChart,
  MdChevronRight,
} from "react-icons/md";

import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
// Custom components

// import Map from "react-map-gl";

// Assets
// import "mapbox-gl/dist/mapbox-gl.css";

// const MAPBOX_TOKEN =
//   "pk.eyJ1Ijoic2ltbW1wbGUiLCJhIjoiY2wxeG1hd24xMDEzYzNrbWs5emFkdm16ZiJ9.q9s0sSKQFFaT9fyrC-7--g"; // Set your mapbox token her

export default function MapCard(props) {
  const { mapLocation } = props;
  const router = useRouter();
  // const mapStyles = useColorModeValue(
  //   "mapbox://styles/simmmple/ckwxecg1wapzp14s9qlus38p0",
  //   "mapbox://styles/simmmple/cl0qqjr3z000814pq7428ptk5"
  // );
  // Chakra color mode
  // const brand = useColorModeValue("brand.500", "brand.400");
  const inputBg = useColorModeValue(
    { base: "secondaryGray.300", md: "white" },
    { base: "navy.700", md: "navy.900" }
  );
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  // const textColorSecondary = useColorModeValue("secondaryGray.700", "white");
  // const dash = useColorModeValue("234318FFFF", "237551FFFF");

  const viewLocationDetails = function () {
    // ReactGA.event({
    //   category: "Diving",
    //   action: "View Site Details",
    // });
    mapLocation?.type === "dive_site"
      ? router.push(`/activities/dive_sites/${mapLocation?.location_id}`)
      : router.push(`/activities/dive_centres/${mapLocation?.location_id}`);
  };

  return (
    <Flex
      w="100%"
      mt={{ base: "12px", md: "10px" }}
      direction={{ base: "row", md: "row" }}
      align={{ base: "end", md: "unset" }}
      mb={{ base: "0px", md: "0px" }}
    >
      <Flex
        position="relative"
        bg={inputBg}
        w="100%"
        borderRadius="30px"
        // p={{ base: "10px", md: "10px" }}
        pt="10px"
        px="10px"
        mt="auto"
      >
        <Flex
          direction={{ sm: "column", md: "row" }}
          gap="10px"
          mb="10px"
          w="100%"
        >
          <MiniStatistics
            name={
              mapLocation?.country &&
              `${mapLocation?.city}, ${mapLocation?.country}`
            }
            value={mapLocation?.name || "Select Dive Site"}
          />
          {mapLocation?.menuItem1 && (
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdShowChart}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Depth"
              value={`${mapLocation?.menuItem1} m`}
            />
          )}
          {mapLocation?.menuItem3 && (
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon w="32px" h="32px" as={MdPerson} color={brandColor} />
                  }
                />
              }
              name="Access"
              value={mapLocation?.menuItem3}
            />
          )}
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon
                    w="32px"
                    h="32px"
                    as={MdCreditCard}
                    color={brandColor}
                  />
                }
              />
            }
            name={
              mapLocation?.type === "dive_site" ? "Cert Level" : "Memberships"
            }
            value={mapLocation?.menuItem2?.map((type) => (
              <Badge colorScheme="teal" borderRadius="15px">
                {type}
              </Badge>
            ))}
          />
          <MiniStatistics
            // startContent={
            //   <IconBox
            //     w="56px"
            //     h="56px"
            //     bg={boxBg}
            //     icon={<Icon w="32px" h="32px" as={MdRedo} color={brandColor} />}
            //   />
            // }
            name={
              mapLocation?.type === "dive_site" ? "Diving Types" : "Languages"
            }
            value={
              <Flex wrap="wrap" gap={1}>
                {mapLocation?.menuItem4?.map((type) => (
                  <Badge colorScheme="teal" borderRadius="15px">
                    {type}
                  </Badge>
                ))}
              </Flex>
            }
          />
          {mapLocation?.name && (
            <Button
              borderRadius="50%"
              ms={{ base: "14px", md: "auto" }}
              my="auto"
              w={{ base: "45px", md: "70px" }}
              h={{ base: "45px", md: "70px" }}
              minW={{ base: "45px", md: "70px" }}
              minH={{ base: "45px", md: "70px" }}
              variant="darkBrand"
              onClick={viewLocationDetails}
            >
              <Icon
                as={MdChevronRight}
                color="white"
                w={{ base: "18px", md: "25px" }}
                h={{ base: "18px", md: "25px" }}
              />
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
