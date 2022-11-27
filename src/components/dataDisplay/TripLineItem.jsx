/* eslint-disable react/prop-types */
// Chakra imports
import {
  Button,
  Flex,
  Icon,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { useContext, useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoMdTime } from "react-icons/io";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";

import { DivingContext } from "contexts/DivingContext";
import "../../../public/css/MiniCalendar.module.css";
// import "react-calendar/dist/Calendar.css";
// import "react-datetime-picker/dist/DateTimePicker.css";
// import "react-clock/dist/Clock.css";

export default function TripLineItem(props) {
  const { trip, icon, ...rest } = props;
  const { addToCart } = useContext(DivingContext);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  // const bgHover = useColorModeValue("brand.100", "brand.100");
  // const bgFocus = useColorModeValue("brand.200", "brand.200");

  const [value, onChange] = useState();

  const siteNames = trip.dive_sites?.map((site) => site.name).join(" + ");
  const diveDate = trip.fixed_start_date;
  const diveTime = trip.fixed_start_time;

  // function setDateTime() {
  //   const newDate = c;
  //   diveTime
  //     ? newDate.setHours(diveTime.split(":")[0], diveTime.split(":")[1])
  //     : newDate.setHours(0, 0);
  //   return newDate.toLocaleString("en-US", { timeZone: "Africa/Cairo" });
  // }

  // console.log("TripLineItem trip", trip);
  return (
    <Flex justifyContent="center" alignItems="center" w="100%" {...rest}>
      <Flex direction="column" align="start" me="auto" w="100%">
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
            {trip.dive_centre.name}
          </Text>
        </Flex>

        <Flex align="center">
          <Icon me="8px" as={IoMdTime} w="16px" h="16px" />
          <Text color="brand.400" fontSize="sm" fontWeight="500">
            {diveDate ? (
              new Date(diveDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            ) : (
              <Tooltip label="Select Date before adding to cart">
                <Flex align="center">
                  <DatePicker onChange={onChange} value={value} />
                </Flex>
              </Tooltip>
            )}
            {diveTime &&
              ` @ ${new Date(diveTime).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
          </Text>
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
            bg="brand.400"
            w="37px"
            h="37px"
            mt="10px"
            lineHeight="100%"
            borderRadius="10px"
            onClick={() =>
              addToCart({
                id: trip.id,
                title: siteNames,
                siteCount: trip.dive_sites?.length,
                centreName: trip.dive_centre.name,
                diveDate: diveDate ? new Date(diveDate) : new Date(value),
                diveTime,
                price: trip.price,
                priceId: trip.stripe_price_id,
                payNow: trip.pay_now,
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
