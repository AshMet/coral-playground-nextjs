/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import {
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { useContext } from "react";
import { MdAddCircle } from "react-icons/md";

import Card from "components/card/Card";
// import EquipLineItem from "components/dataDisplay/EquipLineItem";
import TripLineItem from "components/dataDisplay/TripLineItem";
import TripSearchBar from "components/fields/TripSearchBar";
import { TripSearchContext } from "contexts/TripSearchContext";
import {
  getGenericDives,
  getFilteredRules,
} from "utils/helpers/diveCentresHelper";

import TripsMap from "./components/TripsMap";

export default function TripSidebar({
  trips,
  diveSite,
  diveCentre,
  centreEquipment,
  ...rest
}) {
  const { dateRange } = useContext(TripSearchContext);

  // console.log("sidebar trips", trips);
  // console.log("filtered", filtered);
  // console.log("dateRange", dateRange);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorTertiary = useColorModeValue(
    "secondaryGray.700",
    "secondaryGray.500"
  );

  const genericDives = getGenericDives(trips);

  return (
    <Flex direction="column">
      <Card {...rest} maxH="max-content">
        <Text color={textColor} fontSize="xl" fontWeight="700" mb="5px">
          Upcoming Dive Trips
        </Text>
        <Text color={textColorTertiary} fontSize="md" mb="16px">
          Add a dive to your cart by selecting your preferred date and clicking
          the <Icon as={MdAddCircle} color="brand.400" w="16px" h="16px" />{" "}
          button
        </Text>
        {(trips || diveSite.latitude || diveCentre.latitude) && (
          <TripsMap trips={trips} diveSite={diveSite} diveCentre={diveCentre} />
        )}
        <TripSearchBar mb={10} w="100%" mt="20px" mx="0px" />
        {trips?.length > 0 ? (
          trips
            ?.filter((trip) => trip.generic !== true)
            .map((trip, index) => (
              <Flex
                key={trip.id}
                direction="column"
                justify="space-between"
                align="center"
              >
                <TripLineItem
                  trip={trip}
                  tripRules={getFilteredRules(trip, dateRange)}
                  type={diveCentre ? "diveCentre" : "diveSite"}
                  icon={
                    <Icon
                      as={MdAddCircle}
                      color={textColor}
                      w="20px"
                      h="18px"
                    />
                  }
                />
                {trips?.filter((x) => x.generic !== true).length >
                  index + 1 && <Divider my="25px" />}
              </Flex>
            ))
        ) : (
          <Text
            fontSize="md"
            fontWeight="500"
            color="textColorTertiary"
            mb="30px"
          >
            No Dive Trips are scheduled for your selected dates. Please modify
            your dates or check back soon, new trips are added regularly
          </Text>
        )}
      </Card>
      <Card mt={5}>
        <Flex gap={5}>
          <Text color={textColor} fontSize="2xl" fontWeight="700" mb="20px">
            Price List
          </Text>
          {genericDives.length > 0 && (
            <Badge
              bgColor="brand.100"
              color="white"
              borderRadius="15px"
              display="flex"
              // w="30px"
              h="25px"
              px={4}
              py={2}
              justifyContent="center"
            >
              {genericDives.length}
            </Badge>
          )}
        </Flex>
        {genericDives.length > 0 ? (
          genericDives.map((trip, index) => (
            <Flex
              key={trip.id}
              direction="column"
              justify="space-between"
              align="center"
            >
              <TripLineItem
                trip={trip}
                tripRules={getFilteredRules(trip, dateRange)}
                type={diveCentre ? "diveCentre" : "diveSite"}
                icon={
                  <Icon as={MdAddCircle} color={textColor} w="20px" h="18px" />
                }
              />
              {trips?.filter((x) => x.generic === true).length > index + 1 && (
                <Divider my="25px" />
              )}
              {trip.length > index + 1 && <Divider my="25px" />}
            </Flex>
          ))
        ) : (
          <Text
            fontSize="md"
            fontWeight="500"
            color="textColorTertiary"
            mb="30px"
          >
            This business has not added any items to their price list. Check
            back soon, new items are added regularly
          </Text>
        )}
      </Card>
      {/* {centreEquipment?.length > 0 && (
        <Card mt={5}>
          <Text color={textColor} fontSize="2xl" fontWeight="700" mb="20px">
            Equipment Rentals
          </Text>
          {centreEquipment.map((item, index) => (
            <Flex
              key={item.id}
              direction="column"
              justify="space-between"
              align="center"
            >
              <EquipLineItem
                item={item}
                icon={
                  <Icon as={MdAddCircle} color={textColor} w="20px" h="18px" />
                }
              />
              {centreEquipment?.length > index + 1 && <Divider my="25px" />}
            </Flex>
          ))}
        </Card>
      )} */}
    </Flex>
  );
}
