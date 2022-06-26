/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
// import React from "react";
import {
  Icon,
  Flex,
  Badge,
  useColorModeValue,
  Button,
  Spacer,
  Text,
  Stack,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaRegAddressCard } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoBoatOutline, IoLanguage } from "react-icons/io5";
import { MdChevronRight, MdOutlineStyle } from "react-icons/md";

import IconBox from "components/icons/IconBox";

export default function LocationSummary(props) {
  const { mapLocation } = props;
  const router = useRouter();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = "white";
  const iconBoxBg = "brand.400";

  const viewLocationDetails = function () {
    // ReactGA.event({
    //   category: "Diving",
    //   action: "View Site Details",
    // });
    mapLocation?.locationType === "dive_site"
      ? router.push(`/dive_sites/${mapLocation?.location_id}`)
      : router.push(`/dive_centres/${mapLocation?.location_id}`);
  };

  return (
    <Flex direction="column" gap="10px" mb="10px" w="100%">
      <Stack
        direction="column"
        spacing="24px"
        w="100%"
        mb="20px"
        pr={{ md: "0px", lg: "25px" }}
      >
        {!mapLocation.name && (
          <Text fontSize="xl" fontWeight="700">
            Select Site to begin
          </Text>
        )}
        {mapLocation.name && (
          <Box>
            <Text color={textColor} fontSize="xl" fontWeight="700" mb="30px">
              {mapLocation?.name}
            </Text>
            <Flex align="center">
              <IconBox
                as="box"
                h="40px"
                minW="40px"
                bg={iconBoxBg}
                me="18px"
                icon={
                  <HiOutlineLocationMarker
                    h="30px"
                    w="30px"
                    color={iconColor}
                  />
                }
              />
              <Text fontWeight="500" fontSize="md" me="5px">
                {`${mapLocation?.city}, ${mapLocation?.country}`}
              </Text>
              <Spacer />
            </Flex>
          </Box>
        )}

        {mapLocation?.access && (
          <Flex align="center" mb="10px">
            <IconBox
              as="box"
              h="40px"
              minW="40px"
              bg={iconBoxBg}
              me="18px"
              icon={<IoBoatOutline h="20px" w="20px" color={iconColor} />}
            />
            <Flex direction="column">
              <Text fontWeight="500" fontSize="md" me="5px">
                {mapLocation.access} Access
              </Text>
              <Spacer />
            </Flex>
          </Flex>
        )}
        {mapLocation?.certLevel && (
          <Flex align="center" mb="10px">
            <IconBox
              as="box"
              h="40px"
              minW="40px"
              bg={iconBoxBg}
              me="18px"
              icon={<FaRegAddressCard h="20px" w="20px" color={iconColor} />}
            />
            <Flex direction="column">
              <Text fontWeight="500" fontSize="md" me="5px">
                {mapLocation.certLevel.map(
                  (level, index) => (index ? ", " : "") + level
                )}
              </Text>
            </Flex>
          </Flex>
        )}
        {mapLocation?.divingTypes && (
          <Flex align="center" mb="10px">
            <IconBox
              as="box"
              h="40px"
              minW="40px"
              bg={iconBoxBg}
              me="18px"
              icon={<MdOutlineStyle h="30px" w="30px" color={iconColor} />}
            />
            <Flex wrap="wrap" gap={1}>
              {mapLocation?.divingTypes.map((type) => (
                <Badge
                  colorScheme="teal"
                  borderRadius="15px"
                  display="flex"
                  px={4}
                  py={2}
                  justifyContent="center"
                >
                  {type}
                </Badge>
              ))}
            </Flex>
          </Flex>
        )}
        {mapLocation?.memberships && (
          <Flex align="center" mb="10px">
            <IconBox
              as="box"
              h="40px"
              minW="40px"
              bg={iconBoxBg}
              me="18px"
              icon={<FaRegAddressCard h="20px" w="20px" color={iconColor} />}
            />
            <Flex direction="column">
              <Text fontWeight="500" fontSize="md" me="5px">
                {mapLocation.memberships.map(
                  (membership, index) => (index ? ", " : "") + membership
                )}
              </Text>
            </Flex>
          </Flex>
        )}
        {mapLocation?.languages && (
          <Flex align="center" mb="10px">
            <IconBox
              as="box"
              h="40px"
              minW="40px"
              bg={iconBoxBg}
              me="18px"
              icon={<IoLanguage h="30px" w="30px" color={iconColor} />}
            />
            <Flex wrap="wrap" gap={1}>
              {mapLocation?.languages.map((language) => (
                <Badge
                  colorScheme="teal"
                  borderRadius="15px"
                  display="flex"
                  px={4}
                  py={2}
                  justifyContent="center"
                >
                  {language}
                </Badge>
              ))}
            </Flex>
          </Flex>
        )}
        <Spacer />
        {mapLocation?.name && (
          <Button variant="darkBrand" onClick={viewLocationDetails}>
            <Spacer />
            View
            <Spacer />
            <Icon as={MdChevronRight} color="white" />
          </Button>
        )}
      </Stack>
    </Flex>

    // <MiniStatistics
    //   name={
    //     mapLocation?.country &&
    //     `${mapLocation?.city}, ${mapLocation?.country}`
    //   }
    //   value={mapLocation?.name || "Select Dive Site"}
    // />
    // {mapLocation?.menuItem1 && (
    //   <MiniStatistics
    //     startContent={
    //       <IconBox
    //         w="56px"
    //         h="56px"
    //         bg={boxBg}
    //         icon={
    //           <Icon w="32px" h="32px" as={MdShowChart} color={brandColor} />
    //         }
    //       />
    //     }
    //     name="Depth"
    //     value={`${mapLocation?.menuItem1} m`}
    //   />
    // )}
    // {mapLocation?.menuItem3 && (
    //   <MiniStatistics
    //     startContent={
    //       <IconBox
    //         w="56px"
    //         h="56px"
    //         bg={boxBg}
    //         icon={<Icon w="32px" h="32px" as={MdPerson} color={brandColor} />}
    //       />
    //     }
    //     name="Access"
    //     value={mapLocation?.menuItem3}
    //   />
    // )}
    // <MiniStatistics
    //   startContent={
    //     <IconBox
    //       w="56px"
    //       h="56px"
    //       bg={boxBg}
    //       icon={
    //         <Icon w="32px" h="32px" as={MdCreditCard} color={brandColor} />
    //       }
    //     />
    //   }
    //   name={mapLocation?.type === "dive_site" ? "Cert Level" : "Memberships"}
    //   value={mapLocation?.menuItem2?.map((type) => (
    //     <Badge colorScheme="teal" borderRadius="15px">
    //       {type}
    //     </Badge>
    //   ))}
    // />
    // <MiniStatistics
    //   // startContent={
    //   //   <IconBox
    //   //     w="56px"
    //   //     h="56px"
    //   //     bg={boxBg}
    //   //     icon={<Icon w="32px" h="32px" as={MdRedo} color={brandColor} />}
    //   //   />
    //   // }
    //   name={mapLocation?.type === "dive_site" ? "Diving Types" : "Languages"}
    //   value={
    //     <Flex wrap="wrap" gap={1}>
    //       {mapLocation?.menuItem4?.map((type) => (
    //         <Badge colorScheme="teal" borderRadius="15px">
    //           {type}
    //         </Badge>
    //       ))}
    //     </Flex>
    //   }
    // />
  );
}
