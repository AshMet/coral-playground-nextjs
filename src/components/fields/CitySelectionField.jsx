/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable react/prop-types */
import {
  Button,
  Flex,
  Icon,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
// import Link from "next/link";
import { MdApps, MdDashboard } from "react-icons/md";

export default function CitySelectionField(props) {
  const { country, setCountry, city, setCity, ...rest } = props;

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

  return (
    <Flex w="100%" {...rest}>
      {/* <SearchBar /> */}
      <Select
        value={country}
        fontSize="sm"
        id="edit_product"
        variant="main"
        h="44px"
        maxh="44px"
        me="20px"
        // placeholder="Please select"
        defaultValue="egypt"
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="Egypt">Egypt</option>
      </Select>
      <Select
        value={city}
        fontSize="sm"
        variant="main"
        h="44px"
        maxh="44px"
        me="20px"
        // placeholder="All Cities"
        defaultValue="All Cities"
        onChange={(e) => setCity(e.target.value)}
      >
        <option value="All Cities">All Cities</option>
        <option value="Hurghada">Hurghada</option>
        <option value="Marsa Alam">Marsa Alam</option>
        <option value="Sharm El Sheikh">Sharm El Sheikh</option>
        <option value="Dahab">Dahab</option>
      </Select>
      <Button
        me="20px"
        bg={buttonBg}
        border="1px solid"
        color="secondaryGray.600"
        borderColor={useColorModeValue("secondaryGray.100", "whiteAlpha.100")}
        borderRadius="16px"
        _placeholder={{ color: "secondaryGray.600" }}
        _hover={hoverButton}
        _active={activeButton}
        _focus={activeButton}
      >
        <Icon color={textColor} as={MdDashboard} />
      </Button>
      <Button
        bg={buttonBg}
        border="1px solid"
        color="secondaryGray.600"
        borderColor={useColorModeValue("secondaryGray.100", "whiteAlpha.100")}
        borderRadius="16px"
        _placeholder={{ color: "secondaryGray.600" }}
        _hover={hoverButton}
        _active={activeButton}
        _focus={activeButton}
      >
        <Icon color={textColor} as={MdApps} />
      </Button>
    </Flex>
  );
}
