/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import { Flex, useColorModeValue, InputGroup, Icon } from "@chakra-ui/react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { useContext } from "react";
import { TbCalendar } from "react-icons/tb";

import { TripSearchContext } from "contexts/TripSearchContext";

export default function SearchBar(props) {
  const { ...rest } = props;
  const { dateRange, setDateRange } = useContext(TripSearchContext);
  // Chakra Color Mode
  const searchIconColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
  const inputText = useColorModeValue("gray.700", "gray.100");

  return (
    <InputGroup w={{ base: "100%", md: "25%" }} {...rest}>
      {/* <InputLeftElement
        children={
          <IconButton
            bg="inherit"
            borderRadius="inherit"
            _hover="none"
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
            icon={
              <Icon as={TbCalendar} color={searchIconColor} w="15px" h="15px" />
            }
            // onClick={() => handleSubmit()}
          />
        }
      /> */}
      <Flex
        align="center"
        variant="search"
        w="100%"
        pt="6px"
        pb="6px"
        pl="20px"
        fontSize="sm"
        bg={inputBg}
        color={inputText}
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
            <Icon as={TbCalendar} color={searchIconColor} w="20px" h="20px" />
          }
          // tileDisabled={({ date, view }) =>
          //   (view === "month" && date.getDay() === 0) || date.getDay() === 6
          // }
        />
      </Flex>
    </InputGroup>
  );
}
