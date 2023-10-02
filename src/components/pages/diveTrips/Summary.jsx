/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Divider, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { RRule } from "rrule";

import Card from "components/card/Card";
import SidebarInvoice from "components/dataDisplay/SidebarInvoice";

export default function Auction(props) {
  const { diveTrip, deposit } = props;
  // Chakra Color Mode
  const {
    name,
    price,
    frequency,
    startDate,
    startTime,
    duration,
    recurEndDate,
    recurDays,
    timezone,
  } = diveTrip || {};
  const shadow = useColorModeValue(
    " 0px 50px 40px -34px rgba(112, 144, 176, 0.16)",
    "unset"
  );
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";
  const [tripsRule, setTripsRule] = useState([]);

  //-----------------------------------------------------------
  // Replace these functions with ones from dive_centre_helpers
  const getRruleFreq = (freq) => {
    switch (freq) {
      case "daily":
        return RRule.DAILY;
      case "weekly":
        return RRule.WEEKLY;
      case "monthly":
        return RRule.MONTHLY;
      case "once":
        return RRule.YEARLY;
      default:
        return RRule.MONTHLY;
    }
  };

  const getRruleDays = (oldArr) => {
    const newArr = [];
    if (oldArr.includes("MO")) {
      newArr.push(RRule.MO);
    }
    if (oldArr.includes("TU")) {
      newArr.push(RRule.TU);
    }
    if (oldArr.includes("WE")) {
      newArr.push(RRule.WE);
    }
    if (oldArr.includes("TH")) {
      newArr.push(RRule.TH);
    }
    if (oldArr.includes("FR")) {
      newArr.push(RRule.FR);
    }
    if (oldArr.includes("SA")) {
      newArr.push(RRule.SA);
    }
    if (oldArr.includes("SU")) {
      newArr.push(RRule.SU);
    }
    return newArr;
  };

  const rule = new RRule({
    freq: getRruleFreq(frequency),
    byweekday: getRruleDays(recurDays),
    tzid: timezone,
    dtstart: startDate,
    until: recurEndDate,
    ...(frequency === "One Time" && { interval: 1 }),
  });

  //-----------------------------------------------------------

  useEffect(() => {
    setTripsRule(rule.all());
  }, [diveTrip]);

  // const getTileContent = ({ date, view }) =>
  //   view === "month" &&
  //   tripsRule
  //     .map((item) => new Date(item).toISOString().split("T")[0])
  //     .includes(new Date(date).toISOString().split("T")[0]) ? (
  //     <StatusIndicator />
  //   ) : null;

  const getTileColor = ({ date, view }) =>
    view === "month" &&
    tripsRule
      .map((item) => new Date(item).toISOString().split("T")[0])
      .includes(new Date(date).toISOString().split("T")[0])
      ? "trip-calendar-selectable"
      : null;

  return (
    <Card
      direction="column"
      // ps={{ base: "unset", lg: "'65px'" }}
      maxW="100%"
      minW="400px"
      // align="center"
      p="20px"
      mb="20px"
      boxShadow={shadow}
    >
      {/* <Flex
        w="100%"
        
        direction="column"
        border="1px solid"
        borderColor={borderColor}
        bg={cardBg}
        borderRadius="30px"
      > */}
      <Text fontSize="xl" color={textColorPrimary} fontWeight="bold">
        Trip Summary
      </Text>
      <Text fontSize="md" color={textColorSecondary} mb={10}>
        Please confirm selections and click &quot;Add Dive Trip&quot; to save
      </Text>
      <Text fontWeight="700" color={textColorPrimary} fontSize="30px">
        {name}
      </Text>

      {/* <Text fontSize="xl" color={textColorPrimary} fontWeight="500" mb="28px">
        {startDate
          ? `${startDate.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })} ${frequency}`
          : frequency}
        {` @ ${startTime}`}
      </Text> */}
      <Text fontSize="xl" color={textColorPrimary} fontWeight="500" mb="28px">
        Starting{" "}
        {startDate.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}{" "}
        {rule.toText()}
        {` @ ${startTime}`}
      </Text>
      {/* <Text fontSize="xl" color={textColorPrimary} fontWeight="500" mb="28px">
        {rule.toText()}
      </Text> */}
      <Text fontSize="xl" color={textColorPrimary} fontWeight="500" mb="28px">
        Duration:{" "}
        {duration &&
          `${Object.entries(duration)[0][1]} ${Object.entries(duration)[0][0]}`}
      </Text>
      <Text fontSize="md" color={textColorSecondary} mb={4}>
        Days in green below show the dates that customers can book this trip
      </Text>
      <Calendar
        // onChange={setDiveDate}
        // value={diveDate}
        // selectRange={selectRange}
        view="month"
        tileClassName={getTileColor}
        tileDisabled={({ date }) => date.getDay() >= 0}
        // prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
        // nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
      />
      <Flex w="100%" mt={5} direction="column">
        <Flex direction="column">
          <Text fontSize="xl" fontWeight="700" lineHeight="100%" my={10}>
            Cost Breakdown
          </Text>
          <SidebarInvoice
            mb="20px"
            title="Total Price"
            subtitle="Total cost of the trip"
            sum={`€${price / 100}`}
          />
          <Divider mb="20px" />
          <SidebarInvoice
            mb="20px"
            title="Deposit"
            subtitle="Amount paid to Coral Playground"
            sum={`€${deposit / 100}`}
          />
          <Divider mb="20px" />
          <SidebarInvoice
            mb="20px"
            title="Amount Remaining"
            subtitle="Amount paid to dive centre"
            sum={`€${(price - deposit) / 100}`}
          />
        </Flex>
      </Flex>
      {/* </Flex> */}
      {/* 
      <Button variant="brand" fontSize="sm" fontWeight="500" h="46px">
        Create Trip
      </Button> */}
    </Card>
  );
}
