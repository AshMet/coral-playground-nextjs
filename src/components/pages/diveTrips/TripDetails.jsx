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
  const {
    name,
    setDuration,
    setDescription,
    setCheckIn,
    setPrice,
    setMinCert,
    setStatus,
  } = props;

  const [price] = useState();
  const [minCert] = useState("open_water");
  const [status] = useState("active");
  // const [name] = useState();
  const [description] = useState();
  const [checkIn] = useState();
  const [duration] = useState();
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
            id="name"
            label="Name"
            value={name}
            isRequired
            isDisabled
            placeholder="Defaults to names of dive sites"
            // onChange={(e) => setName(e.target.value)}
          />
          <InputField
            mb="0px"
            id="price"
            label="Price"
            value={price}
            placeholder="Total Price including commission"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <InputField
            mb="0px"
            id="duration"
            label="Duration"
            value={duration}
            placeholder="Total length of the dive trip"
            onChange={(e) => setDuration(e.target.value)}
          />
          <Flex direction="column">
            <Flex direction="column" mb="20px">
              <FormLabel
                ms="10px"
                htmlFor="checkIn"
                fontSize="sm"
                // color={textColor}
                fontWeight="bold"
                _hover={{ cursor: "pointer" }}
              >
                Check In
              </FormLabel>
              <Select
                fontSize="sm"
                id="checkIn"
                variant="main"
                h="44px"
                maxh="44px"
                placeholder="How long before the dive should the user arrive?"
                defaultValue="open_water"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              >
                <option value="open_water">30 minutes before</option>
                <option value="advanced">1 hour before</option>
                <option value="dive_master">2 hours before</option>
              </Select>
            </Flex>
          </Flex>
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
                htmlFor="status"
                fontSize="sm"
                // color={textColor}
                fontWeight="bold"
                _hover={{ cursor: "pointer" }}
              >
                Active?
              </FormLabel>
              <Select
                fontSize="sm"
                id="status"
                variant="main"
                h="44px"
                maxh="44px"
                value={status}
                defaultValue="active"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </Flex>
          </Flex>
          <TextField
            id="description"
            label="Description"
            mb="0px"
            h="100%"
            value={description}
            placeholder="Additional Information about the trip"
            onChange={(e) => setDescription(e.target.value)}
          />
        </SimpleGrid>
      </Card>
    </FormControl>
  );
}
