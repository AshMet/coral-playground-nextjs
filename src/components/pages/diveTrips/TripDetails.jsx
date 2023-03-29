/* eslint-disable no-restricted-globals */
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
  Switch,
} from "@chakra-ui/react";

import Card from "components/card/Card";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";

export default function Settings(props) {
  const {
    name,
    price,
    // status,
    minCert,
    description,
    checkIn,
    duration,
    active,
    setActive,
    setDuration,
    setDescription,
    setCheckIn,
    setPrice,
    setMinCert,
    // setStatus,
  } = props;

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");

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
            label={`Price: ${
              price ? (price / 100).toFixed(2) : "Enter value in"
            } Euro`}
            value={price ? price / 100 : 0}
            placeholder="Total Price including commission"
            onChange={(e) => setPrice(Number(e.target.value) * 100)}
          />
          <InputField
            mb="0px"
            id="duration"
            default={8}
            label={`Trip Duration (${duration || "Enter value in"} hours)`}
            // value={duration}
            isError={duration !== "" && isNaN(duration)}
            placeholder="Total length of the dive trip"
            onChange={(e) => setDuration(Number(e.target.value))}
          />
          <Flex direction="column">
            <Flex direction="column" mb="20px">
              <FormLabel
                ms="10px"
                htmlFor="minCert"
                fontSize="sm"
                fontWeight="bold"
                _placeholder={{ color: textColorSecondary }}
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
                placeholder="Select..."
                borderColor={borderColor}
                // placeholder="How long before the dive should the user arrive?"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              >
                <option value="30_minutes">30 minutes before</option>
                <option value="1_hour">1 hour before</option>
                <option value="1.5_hours">1.5 hours before</option>
                <option value="2_hours">2 hours before</option>
              </Select>
            </Flex>
          </Flex>
          <Flex direction="column">
            <Flex direction="column" mb="20px">
              <FormLabel
                ms="10px"
                htmlFor="minCert"
                fontSize="sm"
                fontWeight="bold"
                _placeholder={{ color: textColorSecondary }}
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
                placeholder="Select..."
                borderColor={borderColor}
                value={minCert}
                onChange={(e) => setMinCert(e.target.value)}
              >
                <option value="open_water">Open Water</option>
                <option value="advanced">Advanced</option>
                <option value="dive_master">Dive Master</option>
              </Select>
            </Flex>
            {/* <Flex direction="column">
              <FormLabel
                ms="10px"
                htmlFor="minCert"
                fontSize="sm"
                fontWeight="bold"
                _placeholder={{ color: textColorSecondary }}
                _hover={{ cursor: "pointer" }}
              >
                Status
              </FormLabel>
              <Select
                fontSize="sm"
                id="status"
                variant="main"
                h="44px"
                maxh="44px"
                placeholder="Select..."
                borderColor={borderColor}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </Flex> */}
            <Flex>
              <Switch
                colorScheme="teal"
                value={active}
                defaultChecked
                onChange={() => setActive(!active)}
                id="active"
              />
              <FormLabel
                ms="10px"
                htmlFor="active"
                fontSize="sm"
                fontWeight="bold"
                _placeholder={{ color: textColorSecondary }}
                _hover={{ cursor: "pointer" }}
              >
                {active
                  ? "Active: Publicly visible on your dive centre page"
                  : "Inactive: Trip is hidden from customers"}
              </FormLabel>
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
