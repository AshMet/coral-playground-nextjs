/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Icon,
  useColorModeValue,
  Flex,
  FormLabel,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
// import Calendar from "react-calendar";
// import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { useEffect, useState } from "react";
import { TbCalendar } from "react-icons/tb";
import TimePicker from "react-time-picker/dist/entry.nostyle";

import Card from "components/card/Card";
import InputField from "components/fields/InputField";
// import StatusIndicator from "components/icons/StatusIndicator";

export default function Scheduling(props) {
  const { diveTrip, setDiveTrip, ...rest } = props;

  const { frequency, duration, recurDays } = diveTrip || {};

  const today = new Date();
  const nextMonth = new Date(today.setMonth(today.getMonth() + 3));
  const [dateRange, setDateRange] = useState([new Date(), nextMonth]);
  const [tripTime, setTripTime] = useState("07:00");
  const [durationAmt, setDurationAmt] = useState(8);
  const [durationUnit, setDurationUnit] = useState("hours");

  // const setDateRange = () => {
  //   return (newDate) => {
  //     // setStartDate(newDate[0]);
  //     // setEndDate(newDate[1]);
  //     onChange(newDate);
  //   };
  // };
  // const [diveTime] = useState();
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("transparent", "whiteAlpha.100");

  const handleChange = (e) => {
    setDiveTrip({ ...diveTrip, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const dur = Object.entries(duration);
    dur[0][0] = durationUnit;
    dur[0][1] = durationAmt;
    setDiveTrip({ ...diveTrip, duration: Object.fromEntries(dur) });
  }, [durationAmt, durationUnit]);

  useEffect(() => {
    setDiveTrip({
      ...diveTrip,
      startDate: dateRange[0],
      recurEndDate: dateRange[1],
    });
  }, [dateRange]);

  useEffect(() => {
    setDiveTrip({
      ...diveTrip,
      startTime: tripTime,
    });
  }, [tripTime]);

  // function setDurValue(obj, value) {
  //   const dur = Object.entries(obj);
  //   dur[0][1] = value;
  //   setDiveTrip({ ...diveTrip, duration: Object.fromEntries(dur) });
  // }
  // Days of week
  const dayOfWeekOptions = [
    { value: "MO", label: "Monday" },
    { value: "TU", label: "Tuesday" },
    { value: "WE", label: "Wednesday" },
    { value: "TH", label: "Thursday" },
    { value: "FR", label: "Friday" },
    { value: "SA", label: "Saturday" },
    { value: "SU", label: "Sunday" },
  ];
  const [daysPickerItems] = useState(dayOfWeekOptions);
  const [selectedDays, setSelectedDays] = useState(
    dayOfWeekOptions.filter((i) => recurDays?.includes(i.value))
  );

  const handleDaysChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedDays(selectedItems);
      setDiveTrip({
        ...diveTrip,
        recurDays: selectedItems?.map((item) => item.value),
      });
    }
  };

  return (
    <Card
      border="1px solid"
      my={5}
      borderColor={borderColor}
      align="center"
      direction="column"
      w="100%"
      minW="400px"
      // p="20px 15px"
      h="max-content"
      {...rest}
    >
      <Flex direction="column">
        <FormLabel
          ms="10px"
          htmlFor="frequency"
          fontSize="sm"
          color={textColor}
          fontWeight="bold"
          mt="20px"
          _hover={{ cursor: "pointer" }}
        >
          How frequently do you do this trip?
        </FormLabel>
        <Select
          name="frequency"
          fontSize="sm"
          id="frequency"
          variant="main"
          h="44px"
          maxh="44px"
          // placeholder="Select..."
          borderColor={borderColor}
          value={frequency}
          onChange={handleChange}
          defaultValue="Daily"
          isInvalid={frequency === ""}
          isRequired
        >
          <option value="One Time">One Time</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </Select>
        <FormLabel
          ms="10px"
          htmlFor="startDate"
          fontSize="sm"
          color={textColor}
          fontWeight="bold"
          _hover={{ cursor: "pointer" }}
          mt="20px"
        >
          How long will this dive trip repeat for?
        </FormLabel>
        <InputGroup
          w={{ base: "100%", md: "100%" }}
          borderColor={useColorModeValue("secondaryGray.100", "whiteAlpha.100")}
          borderWidth="2px"
          borderRadius="20px"
        >
          <Flex
            align="center"
            variant="search"
            w="100%"
            pt="6px"
            pb="6px"
            pl="20px"
            fontSize="sm"
            // bg={inputBg}
            // color={inputText}
            fontWeight="500"
            // _placeholder={{ color: "gray.400", fontSize: "14px" }}
            borderRadius="30px"
          >
            <DateRangePicker
              onChange={setDateRange}
              value={dateRange}
              format="dd MMM y"
              minDate={new Date()}
              returnValue="range"
              rangeDivider="to"
              dayPlaceholder=""
              monthPlaceholder=""
              yearPlaceholder=""
              // clearIcon={null}
              calendarIcon={
                <Icon
                  as={TbCalendar}
                  // color={searchIconColor}
                  w="20px"
                  h="20px"
                />
              }
            />
          </Flex>
        </InputGroup>
        {/* <Calendar
            onChange={setDiveDate}
            value={diveDate}
            selectRange={selectRange}
            view="month"
            tileContent={<Text color="brand.500" />}
            prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
            nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
          /> */}
        <FormLabel
          ms="10px"
          htmlFor="startTime"
          fontSize="sm"
          color={textColor}
          fontWeight="bold"
          _hover={{ cursor: "pointer" }}
          mb={0}
          mt="20px"
        >
          Dive Departure Time
        </FormLabel>
        <TimePicker
          name="startTime"
          onChange={setTripTime}
          value={tripTime}
          disableClock
        />
      </Flex>

      <CUIAutoComplete
        name="recurDays"
        label="Which days of the week does this trip leave on?"
        placeholder="Leave blank if this trip happens everyday"
        items={daysPickerItems}
        labelStyleProps={{
          fontSize: "sm",
          fontWeight: "extrabold",
          ml: "5px",
          mt: "20px",
        }}
        inputStyleProps={{
          fontSize: "sm",
          borderRadius: "2xl",
          // borderColor: borderPrimary,
          // h: "44px",
          // _placeholder: { color: placeholderColor },
        }}
        tagStyleProps={{
          rounded: "full",
          py: 1,
          px: 2,
          color: "white",
          bgColor: useColorModeValue("brand.300", "brand.400"),
        }}
        listStyleProps={{ color: "black", bgColor: "gray.200" }}
        selectedItems={selectedDays}
        onSelectedItemsChange={(changes) =>
          handleDaysChange(changes.selectedItems)
        }
        disableCreateItem
      />

      <Flex direction="row" alignItems="flex-end" gap={4} mb={10}>
        <InputField
          mb="0px"
          mr="10px"
          id="duration"
          name="duration"
          // default={8}
          label={`Trip Duration (${durationAmt} ${durationUnit})`}
          value={durationAmt}
          isError={durationAmt !== "" && Number.isNaN(durationAmt)}
          placeholder="# of hours / days"
          // onChange={handleChange}
          onChange={(e) => setDurationAmt(Number(e.target.value))}
        />
        <Select
          fontSize="sm"
          id="durationUnit"
          variant="main"
          h="44px"
          maxh="44px"
          placeholder="Select..."
          borderColor={borderColor}
          // placeholder="How long before the dive should the user arrive?"
          value={durationUnit}
          onChange={(e) => setDurationUnit(e.target.value)}
        >
          <option value="hours">Hours</option>
          <option value="days">Days</option>
        </Select>
      </Flex>
    </Card>
  );
}
