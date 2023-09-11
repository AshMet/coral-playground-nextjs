/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
// import React from "react";
import {
  Flex,
  useColorModeValue,
  IconButton,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { useState } from "react";
import { TbCalendar } from "react-icons/tb";

export default function SearchBar(props) {
  // Pass the computed styles into the `__css` prop
  const { variant, background, children, placeholder, borderRadius, ...rest } =
    props;
  // Chakra Color Mode
  const searchIconColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
  const inputText = useColorModeValue("gray.700", "gray.100");
  const [value, onChange] = useState();

  return (
    <InputGroup w={{ base: "100%", md: "25%" }} {...rest}>
      <InputLeftElement
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
      />
      <Flex
        align="center"
        variant="search"
        w="100%"
        pt="6px"
        pb="6px"
        pl="40px"
        fontSize="sm"
        bg={background || inputBg}
        color={inputText}
        fontWeight="500"
        // _placeholder={{ color: "gray.400", fontSize: "14px" }}
        borderRadius={borderRadius || "30px"}
      >
        <DateRangePicker
          onChange={onChange}
          value={value}
          format="dd MMM y"
          minDate={new Date()}
          returnValue="range"
          // clearIcon={null}
          // calendarIcon={null}
          tileDisabled={({ date, view }) =>
            (view === "month" && date.getDay() === 0) || date.getDay() === 6
          }
        />
      </Flex>
      {/* <Input
            variant="search"
            fontSize="sm"
            bg={background || inputBg}
            color={inputText}
            fontWeight="500"
            _placeholder={{ color: "gray.400", fontSize: "14px" }}
            borderRadius={borderRadius || "30px"}
            placeholder={placeholder || "Search Dive Sites..."}
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          /> */}
    </InputGroup>
  );
}
