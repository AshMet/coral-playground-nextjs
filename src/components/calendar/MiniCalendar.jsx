/* eslint-disable react/prop-types */
import { Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
// Chakra imports
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

// Custom components
import Card from "components/card/Card";
// import "react-calendar/dist/Calendar.css";
import "../../../public/css/MiniCalendar.module.css";

export default function MiniCalendar(props) {
  const { selectRange, setSelectedDate, ...rest } = props;
  const [diveDate, setDiveDate] = useState(new Date());
  // Chakra Color Mode
  // const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("transparent", "whiteAlpha.100");
  // function onChange(value) {
  //   setDiveDate(value);
  // }

  useEffect(() => {
    setSelectedDate(diveDate);
  }, [setSelectedDate, diveDate]);

  return (
    <Card
      border="1px solid"
      borderColor={borderColor}
      align="center"
      direction="column"
      w="100%"
      maxW="max-content"
      p="20px 15px"
      h="max-content"
      {...rest}
    >
      <Calendar
        onChange={setDiveDate}
        value={diveDate}
        selectRange={selectRange}
        view="month"
        // formatMonth={(locale, date) => formatDate(date, "MM")}
        tileContent={<Text color="brand.500" />}
        prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
        nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
      />
      {/* <Text mt={5}>
        <Text as="span" fontSize="sm" color={textColor} fontWeight="bold">
          Dive Date:{` `}
        </Text>
        {diveDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text> */}
    </Card>
  );
}
