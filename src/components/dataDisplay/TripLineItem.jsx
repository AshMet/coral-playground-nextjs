/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// Chakra imports
import {
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
// Custom components
import { useContext, useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoMdTime } from "react-icons/io";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";

import { CartContext } from "contexts/CartContext";
import {
  combineDateAndTime,
  getTileColor,
  getDisabledTiles,
} from "utils/helpers/diveCentresHelper";

import TimeTile from "./TimeTile";

export default function TripLineItem(props) {
  const { trip, tripRules, type, icon, ...rest } = props;
  const { id, name, price, stripePriceId, deposit, startTime, centreName } =
    trip || {};
  const { addToCart } = useContext(CartContext);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  // const bgHover = useColorModeValue("brand.100", "brand.100");
  // const bgFocus = useColorModeValue("brand.200", "brand.200");

  const [selectedDate, onChange] = useState();
  const { isOpen, onToggle } = useDisclosure();

  const siteNames =
    name || trip.diveSites?.map((site) => site.name).join(" + ");

  // console.log("selectedDate", selectedDate);
  // console.log("selectedDate", selectedDate);
  // console.log("SiteTripLineItem trip", trip);

  return (
    <Flex justifyContent="center" alignItems="center" w="100%" {...rest}>
      <Box onClick={onToggle}>
        <TimeTile
          date={new Date(selectedDate)}
          time={startTime}
          color="white"
          bg="purple.400"
        />
      </Box>
      <Flex direction="column" align="start" me="auto" w="100%" ml="10px">
        <Flex direction="row" align="stretch" me="auto">
          <Flex align="center">
            <Icon me="8px" as={HiOutlineLocationMarker} w="16px" h="16px" />
            <Text color={textColor} fontSize="md" me="6px" fontWeight="700">
              {siteNames}
            </Text>
          </Flex>
        </Flex>

        <Flex align="center">
          <Icon me="8px" as={IoStorefrontOutline} w="16px" h="16px" />
          <Text color={textColor} fontSize="md" me="6px" fontWeight="500">
            {type === "diveSite" && trip?.centreName}
            <Badge colorScheme="green" size="sm" padding={1} ml={2}>
              {tripRules?.length} Trips
            </Badge>
          </Text>
        </Flex>

        <Flex align="center">
          <Icon me="8px" as={IoMdTime} w="16px" h="16px" />
          <Flex align="center">
            <DatePicker
              onChange={onChange}
              value={selectedDate}
              // format="dd MMM y"
              minDate={new Date()}
              clearIcon={null}
              calendarIcon={null}
              tileClassName={({ date, view }) =>
                getTileColor({ date, view }, tripRules)
              }
              tileDisabled={({ date }) => getDisabledTiles({ date }, tripRules)}
              isOpen={isOpen}
            />
          </Flex>
          <Text
            ml="5px"
            color={textColor}
            fontSize="md"
            me="6px"
            fontWeight="500"
          >{`@ ${startTime?.split(":")[0]}:${startTime?.split(":")[1]}`}</Text>
        </Flex>
      </Flex>

      <Flex direction="column">
        <Text
          ms="auto"
          color="green.500"
          fontSize="sm"
          me="6px"
          fontWeight="700"
        >
          €
          <Text as="span" fontSize="lg">
            {trip.price / 100}
          </Text>
        </Text>
        <Tooltip label="Add to Cart">
          <Button
            align="center"
            justifyContent="center"
            // bg="brand.100"
            colorScheme="brand"
            w="37px"
            h="37px"
            mt="10px"
            lineHeight="100%"
            borderRadius="10px"
            onClick={() =>
              addToCart({
                id,
                title: name,
                itemType: "diveTrip",
                centreName,
                startDate: combineDateAndTime(selectedDate, startTime),
                diveTime: startTime,
                price,
                priceId: stripePriceId,
                deposit,
              })
            }
            {...rest}
          >
            <Icon as={MdAddCircle} color="white" w="24px" h="24px" />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
