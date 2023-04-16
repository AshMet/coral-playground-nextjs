/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
// import React from "react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Text,
  useColorModeValue,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { TbScubaMask } from "react-icons/tb";

import { supabase } from "pages/api/index";

export default function SearchBar(props) {
  // Pass the computed styles into the `__css` prop
  const { variant, background, children, placeholder, borderRadius, ...rest } =
    props;
  // Chakra Color Mode
  const searchIconColor = useColorModeValue("gray.700", "white");
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
  const inputText = useColorModeValue("gray.700", "gray.100");
  const textColorTertiary = useColorModeValue("secondaryGray.600", "white");
  const menuBg = useColorModeValue("white", "navy.800");
  const menuText = useColorModeValue("navy.800", "white");
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  async function handleSubmit() {
    const { data } = await supabase
      .from("dive_sites")
      .select()
      .textSearch("name", searchString, {
        type: "websearch",
        config: "english",
      });
    setSearchResults(data);
    open();
  }

  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={close}
      placement="bottom"
      // closeOnBlur={false}
    >
      <PopoverTrigger>
        <InputGroup w={{ base: "100%", md: "200px" }} {...rest}>
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
                icon={<SearchIcon color={searchIconColor} w="15px" h="15px" />}
                onClick={() => handleSubmit()}
              />
            }
          />
          <Input
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
          />
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent color={menuText} bg={menuBg} borderColor="blue.800">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Select Dive Site
        </PopoverHeader>
        <PopoverBody borderRadius="20px">
          {searchResults &&
            searchResults.map((result) => (
              <Link href={`/diving/dive_sites/${result.id}`}>
                <Flex mb="25px" align="center" cursor="pointer">
                  <Icon
                    color={menuText}
                    as={TbScubaMask}
                    h="24px"
                    w="24px"
                    mr={3}
                  />
                  <Text
                    color={menuText}
                    fontWeight="500"
                    fontSize="md"
                    me="5px"
                    _hover={{ color: "brand.100" }}
                  >
                    {result.name}
                  </Text>
                  <Icon
                    as={MdChevronRight}
                    ms="auto"
                    h="22px"
                    w="22px"
                    color={textColorTertiary}
                  />
                </Flex>
              </Link>
            ))}
        </PopoverBody>
        {/* <PopoverFooter d="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            <Button variant="outline">Cancel</Button>
            <Button colorScheme="red">Apply</Button>
          </ButtonGroup>
        </PopoverFooter> */}
      </PopoverContent>
    </Popover>
  );
}
