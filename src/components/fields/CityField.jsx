/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
// import React from "react";
import { useColorModeValue, InputGroup, Select } from "@chakra-ui/react";
// import { TbMapPin } from "react-icons/tb";

export default function CityField(props) {
  const {
    city,
    setCity,
    variant,
    background,
    children,
    placeholder,
    borderRadius,
    ...rest
  } = props;
  // Chakra Color Mode
  // const searchIconColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
  const inputText = useColorModeValue("gray.700", "gray.100");

  // async function handleSubmit() {
  //   const { data } = await supabase
  //     .from("dive_sites")
  //     .select("name, slug")
  //     .textSearch("name", searchString, {
  //       type: "websearch",
  //       config: "english",
  //     });
  //   setSearchResults(data);
  //   open();
  // }

  return (
    <InputGroup w={{ base: "100%", md: "25%" }} {...rest}>
      {/* <InputLeftElement
        children={
          <IconButton
            bg="inherit"
            position="fixed"
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
              <Icon as={TbMapPin} color={searchIconColor} w="15px" h="15px" />
            }
            // onClick={() => handleSubmit()}
          />
        }
      /> */}
      <Select
        value={city}
        variant="search"
        fontSize="sm"
        bg={background || inputBg}
        color={inputText}
        fontWeight="500"
        _placeholder={{ color: "gray.400", fontSize: "14px" }}
        borderRadius={borderRadius || "30px"}
        placeholder={placeholder || "Select City"}
        defaultValue="All Cities"
        onChange={(e) => setCity(e.target.value)}
      >
        <option value="All Cities">All Cities</option>
        <option value="Hurghada">Hurghada</option>
        <option value="Marsa Alam">Marsa Alam</option>
        <option value="Sharm El Sheikh">Sharm El Sheikh</option>
        <option value="Dahab">Dahab</option>
      </Select>
    </InputGroup>
  );
}
