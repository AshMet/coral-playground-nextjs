/* eslint-disable react/prop-types */
// Chakra imports
import {
  Flex,
  FormControl,
  SimpleGrid,
  Text,
  FormLabel,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

import Card from "components/card/Card";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";

export default function Settings(props) {
  const { setPrice, setMinCert, setActive, setNotes } = props;

  const [price] = useState();
  const [minCert] = useState("open_water");
  const [active] = useState("active");
  const [notes] = useState();
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";

  return (
    <FormControl>
      <Card mb={{ base: "0px", xl: "20px" }}>
        <Flex direction="column" mb="40px" ms="10px">
          <Text fontSize="xl" color={textColorPrimary} fontWeight="bold">
            Trip Details
          </Text>
          <Text fontSize="md" color={textColorSecondary}>
            Please provide all relevant details for your planned dive trip
          </Text>
        </Flex>
        <SimpleGrid
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: "20px", xl: "20px" }}
        >
          <InputField
            mb="0px"
            id="price"
            label="Price"
            value={price}
            placeholder="For Booking Confirmation"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          {/* <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              children="$"
            />
            <Input
              id="price"
              label="Price"
              value={price}
              placeholder="Enter amount"
              onChange={(e) => setPrice(e.target.value)}
            />
            <InputRightElement children={<CheckIcon color="green.500" />} />
          </InputGroup> */}
          <Flex direction="column">
            <Flex direction="column" mb="20px">
              <FormLabel
                ms="10px"
                htmlFor="minCert"
                fontSize="sm"
                // color={textColor}
                fontWeight="bold"
                _hover={{ cursor: "pointer" }}
              >
                Minimum Certification Level
              </FormLabel>
              <Select
                fontSize="sm"
                id="minCert"
                variant="main"
                h="44px"
                maxh="44px"
                defaultValue="open_water"
                value={minCert}
                onChange={(e) => setMinCert(e.target.value)}
              >
                <option value="open_water">Open Water</option>
                <option value="advanced">Advanced</option>
                <option value="dive_master">Dive Master</option>
              </Select>
            </Flex>
            <Flex direction="column">
              <FormLabel
                ms="10px"
                htmlFor="active"
                fontSize="sm"
                // color={textColor}
                fontWeight="bold"
                _hover={{ cursor: "pointer" }}
              >
                Active?
              </FormLabel>
              <Select
                fontSize="sm"
                id="active"
                variant="main"
                h="44px"
                maxh="44px"
                value={active}
                defaultValue="active"
                onChange={(e) => setActive(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </Flex>
          </Flex>
          <TextField
            id="notes"
            label="Notes"
            mb="0px"
            h="100%"
            value={notes}
            placeholder="Please provide any other important information before your dive (e.g. Medical conditions)"
            onChange={(e) => setNotes(e.target.value)}
          />
        </SimpleGrid>
      </Card>
    </FormControl>
  );
}
