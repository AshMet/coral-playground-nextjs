/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { Flex, Text, Icon, useColorModeValue, Divider } from "@chakra-ui/react";
import { useContext } from "react";
import { MdAddCircle } from "react-icons/md";
import { RRule, RRuleSet, datetime } from "rrule";

import Card from "components/card/Card";
import TripLineItem from "components/dataDisplay/TripLineItem";
import TripSearchBar from "components/fields/TripSearchBar";
import { TripSearchContext } from "contexts/TripSearchContext";
import {
  getGenericDives,
  getRruleFreq,
  getRruleDays,
} from "utils/dive_centre_helpers";

import TripsMap from "./components/TripsMap";

export default function TripSidebar({ trips, diveSite, diveCentre, ...rest }) {
  const { dateRange } = useContext(TripSearchContext);
  const today = new Date();
  const in3Months = new Date(new Date().setMonth(new Date().getMonth() + 3));
  // const [filtered, setFiltered] = useState();
  // const [tripRules, setTripRules] = useState([]);

  const getRRule = (trip, options) =>
    new RRule({
      ...options,
      freq: getRruleFreq(trip.frequency),
      byweekday: getRruleDays(trip.recurDays),
      tzid: trip.timezone,
      dtstart: new Date(trip.startDate ? trip.startDate : today),
      until: new Date(trip.recurEndDate ? trip.recurEndDate : in3Months),
      ...(trip.frequency === "One Time" && { interval: 1 }),
    });
  const getGenericRRule = (trip, range, options) =>
    new RRule({
      ...options,
      freq: RRule.DAILY,
      tzid: trip.timezone,
      dtstart: new Date(today),
      until: new Date(in3Months),
    });

  const getFilteredRules = (trip, range) => {
    const ruleSet = new RRuleSet();
    const start = new Date(range ? range[0] : today);
    const end = new Date(range ? range[1] : in3Months);
    const filterStart = datetime(
      start.getFullYear(),
      start.getMonth() + 1,
      start.getDate()
    );
    const filterEnd = datetime(
      end.getFullYear(),
      end.getMonth() + 1,
      end.getDate()
    );
    trip.generic
      ? ruleSet.rrule(getGenericRRule(trip, {}))
      : ruleSet.rrule(getRRule(trip, {}));
    return ruleSet.between(filterStart, filterEnd);
  };

  // console.log("trips", trips);
  // console.log("filtered", filtered);
  // console.log("dateRange", dateRange);

  // useEffect(() => {
  //   const dateFiltered = filterByDateRange(trips, dateRange);
  //   setFiltered(dateFiltered);
  // }, [trips, dateRange]);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorTertiary = useColorModeValue(
    "secondaryGray.700",
    "secondaryGray.500"
  );

  // console.log("sidebar trips", trips);

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
          <Text fontSize="md" fontWeight="500" color="textColor" mb="30px">
            No Dive Trips are scheduled for your selected dates. Please modify
            your dates or check back soon, new trips are added regularly
          </Text>
        )}
      </Card>
      <Card mt={5}>
        <Text color={textColor} fontSize="2xl" fontWeight="700" mb="20px">
          Price List
        </Text>
        {trips.length > 0 ? (
          getGenericDives(trips).map((trip, index) => (
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
          <Text fontSize="md" fontWeight="500" color="brand.400" mb="30px">
            This business has not added any items to their price list. Check
            back soon, new items are added regularly
          </Text>
        )}
      </Card>
      {/* <RegularTrips trips={getGenericDives(trips)} diveSite={diveSite} /> */}
    </Flex>
  );
}
