/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable import/no-cycle */
import {
  Button,
  Flex,
  Icon,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
// import Link from "next/link";
import Link from "next/link";
import { MdApps, MdDashboard } from "react-icons/md";
// Custom Components

// import Balance from "components/navbar/Balance";
import CityField from "components/fields/CityField";
import DateRangeField from "components/fields/DateRangeField";
// import SearchBar from "components/navbar/searchBar/SearchBar";

export default function TripSearchBar(props) {
  const { city, setCity, cityFilter, searchButton, viewButtons, ...rest } =
    props;

  const menuBg = useColorModeValue("purple.600", "purple.400");
  // const textColor = useColorModeValue("secondaryGray.900", "white");

  const hoverButton = useColorModeValue(
    { bg: "purple.300" },
    { bg: "purple.600" }
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
    <Flex mx={{ sm: "10px" }}>
      <Spacer />
      <Flex
        w={{ sm: "100%", lg: "80%" }}
        alignItems="center"
        flexDirection={{ sm: "column", md: "row" }}
        bg={menuBg}
        flexWrap="unset"
        p="10px"
        borderRadius="30px"
        boxShadow={shadow}
        zIndex={100}
        {...rest}
      >
        {/* <SearchBar
        mb={secondary ? { base: "10px", md: "unset" } : "unset"}
        me="10px"
        borderRadius="30px"
      /> */}
        {cityFilter && (
          <CityField
            city={city}
            setCity={setCity}
            ml={{ sm: "10px", md: "0px" }}
            mb={{ sm: "10px", md: "unset" }}
            me="10px"
            borderRadius="30px"
            w={{ sm: "100%", md: "400px" }}
          />
        )}
        <DateRangeField
          ml={{ sm: "10px", md: "0px" }}
          mb={{ sm: "10px", md: "unset" }}
          borderRadius="30px"
          w={{ sm: "100%" }}
        />
        <Spacer />
        <Flex direction="row">
          {viewButtons && (
            <Flex direction="row">
              <Button
                variant="brand"
                ml="10px"
                me="10px"
                borderRadius="30px"
                _hover={hoverButton}
                _active={activeButton}
                _focus={activeButton}
              >
                <Icon color="white" as={MdDashboard} />
              </Button>
              <Button
                variant="brand"
                borderRadius="30px"
                _hover={hoverButton}
                _active={activeButton}
                _focus={activeButton}
              >
                <Icon color="white" as={MdApps} />
              </Button>
            </Flex>
          )}
          {searchButton && (
            <Link href="/dive_trips" passHref>
              <Button borderRadius={30} variant="brand" minW="150px">
                Search
              </Button>
            </Link>
          )}
        </Flex>
      </Flex>
      <Spacer />
    </Flex>
  );
}
