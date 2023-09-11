/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable import/no-cycle */
import {
  Box,
  Button,
  Flex,
  Icon,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
// import Link from "next/link";
import PropTypes from "prop-types";
import { MdApps, MdDashboard } from "react-icons/md";
// Custom Components

// import Balance from "components/navbar/Balance";
import CityField from "components/fields/CityField";
import FromToDateField from "components/fields/FromToDateField";
// import SearchBar from "components/navbar/searchBar/SearchBar";

export default function TripSearchBar(props) {
  const { city, setCity, ...rest } = props;
  const menuBg = useColorModeValue("white", "navy.800");
  // const textColor = useColorModeValue("secondaryGray.900", "white");

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const buttonBg = useColorModeValue("transparent", "navy.800");
  const hoverButton = useColorModeValue(
    { bg: "gray.100" },
    { bg: "whiteAlpha.100" }
  );
  const activeButton = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.200" }
  );
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );

  return (
    <Flex>
      <Spacer />
      <Flex
        w={{ sm: "100%", md: "80%" }}
        alignItems="center"
        flexDirection={{ sm: "column", md: "row" }}
        bg={menuBg}
        flexWrap="unset"
        p="10px"
        borderRadius="30px"
        boxShadow={shadow}
        {...rest}
      >
        {/* <SearchBar
        mb={secondary ? { base: "10px", md: "unset" } : "unset"}
        me="10px"
        borderRadius="30px"
      /> */}
        <CityField
          city={city}
          setCity={setCity}
          mb={{ sm: "10px", md: "unset" }}
          me="10px"
          borderRadius="30px"
          w={{ sm: "100%", md: "25%" }}
        />
        <FromToDateField
          mb={{ sm: "10px", md: "unset" }}
          me="10px"
          borderRadius="30px"
          w={{ sm: "100%", md: "400px" }}
        />
        <Spacer />
        <Box>
          <Button
            me="10px"
            bg={buttonBg}
            border="1px solid"
            color="secondaryGray.600"
            borderColor={useColorModeValue(
              "secondaryGray.100",
              "whiteAlpha.100"
            )}
            borderRadius="16px"
            _placeholder={{ color: "secondaryGray.600" }}
            _hover={hoverButton}
            _active={activeButton}
            _focus={activeButton}
          >
            <Icon color={textColor} as={MdDashboard} />
          </Button>
          <Button
            me="10px"
            bg={buttonBg}
            border="1px solid"
            color="secondaryGray.600"
            borderColor={useColorModeValue(
              "secondaryGray.100",
              "whiteAlpha.100"
            )}
            borderRadius="16px"
            _placeholder={{ color: "secondaryGray.600" }}
            _hover={hoverButton}
            _active={activeButton}
            _focus={activeButton}
          >
            <Icon color={textColor} as={MdApps} />
          </Button>
          <Button borderRadius={30} variant="brand" minW="150px">
            Search
          </Button>
        </Box>
      </Flex>
      <Spacer />
    </Flex>
  );
}

TripSearchBar.propTypes = {
  // variant: PropTypes.string,
  // fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  // onOpen: PropTypes.func,
};
