/* eslint-disable react-hooks/exhaustive-deps */
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
  RadioGroup,
  Radio,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import DiveSelection from "../pages/bookings/DiveSelection";
import Card from "components/card/Card";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";

export default function TripDetailsForm(props) {
  const {
    diveTrip,
    setDiveTrip,
    tripType,
    setTripType,
    selectedSites,
    setSelectedSites,
  } = props;

  const { name, description, checkin, diveCount, price, minCert, active } =
    diveTrip || {};

  const [tripPrice, setTripPrice] = useState();
  const [tripActive, setTripActive] = useState(active);

  useEffect(() => {
    setDiveTrip({
      ...diveTrip,
      price: Number(tripPrice) * 100,
    });
  }, [tripPrice]);

  useEffect(() => {
    setDiveTrip({
      ...diveTrip,
      active: tripActive,
    });
  }, [tripActive]);

  useEffect(() => {
    const generic = tripType === "generic";
    setDiveTrip({
      ...diveTrip,
      generic,
    });
  }, [tripType]);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
  const handleChange = (e) => {
    setDiveTrip({ ...diveTrip, [e.target.name]: e.target.value });
  };
  const handleNumberChange = (e) => {
    setDiveTrip({ ...diveTrip, [e.target.name]: Number(e.target.value) });
  };

  // console.log("diveTrip", diveTrip);

  return (
    <FormControl>
      <Card mb={{ base: "0px", xl: "20px" }}>
        <Flex direction="column" mb="40px" ms="10px">
          <Text fontSize="2xl" color={textColor} fontWeight="bold">
            Trip Details
          </Text>
          <Text fontSize="md" color={textColorSecondary}>
            Please provide all relevant details for your planned dive trip
          </Text>
        </Flex>
        <RadioGroup mb={10} onChange={setTripType} value={tripType}>
          <Flex
            gap={{ sm: 4, md: 10, lg: 20 }}
            direction="row"
            justify="center"
          >
            <Radio size="lg" colorScheme="red" value="generic">
              Generic Price List
            </Radio>
            <Radio size="lg" colorScheme="green" value="site-specific">
              Calendar Item
            </Radio>
          </Flex>
        </RadioGroup>
        <Flex display={tripType !== "generic" ? "contents" : "none"}>
          <FormLabel
            ms="10px"
            htmlFor="startDate"
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            _hover={{ cursor: "pointer" }}
          >
            Add dive sites to your trip
          </FormLabel>
          <DiveSelection
            diveTrip={diveTrip}
            setDiveTrip={setDiveTrip}
            selectedSites={selectedSites}
            setSelectedSites={setSelectedSites}
          />
        </Flex>
        <SimpleGrid
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: "20px", xl: "20px" }}
        >
          <Flex direction="column" justify="center">
            <FormLabel
              ms="10px"
              htmlFor="numberDives"
              fontSize="sm"
              color={textColor}
              fontWeight="bold"
              _hover={{ cursor: "pointer" }}
            >
              Number of Dives
            </FormLabel>
            <NumberInput
              fontSize="sm"
              id="diveCount"
              variant="main"
              // h="40px"
              maxh="44px"
              placeholder="Select..."
              borderColor={borderColor}
            >
              <NumberInputField
                name="diveCount"
                color={textColor}
                value={Number(diveCount)}
                min={1}
                max={10}
                defaultValue={1}
                // onChange={(e) => setDiveCount(Number(e.target.value))}
                onChange={handleNumberChange}
                isError={diveCount === ""}
                errorMessage="Dive Count cannot be empty"
                isRequired
              />
              {/* <NumberInputStepper>
            <NumberIncrementStepper
              onChange={(e) => setDiveCount(Number(e.target.value))}
            />
            <NumberDecrementStepper />
          </NumberInputStepper> */}
            </NumberInput>
          </Flex>

          <InputField
            mb="0px"
            name="name"
            label="Name"
            value={name}
            isRequired
            // isDisabled
            placeholder={
              tripType === "generic"
                ? "Defaults to number of dives"
                : "Defaults to names of dive sites"
            }
            onChange={handleChange}
            // onChange={(e) => setName(e.target.value)}
          />
          <InputField
            mb="0px"
            name="price"
            label={`Price (${
              price ? (price / 100).toFixed(2) : "Enter value in"
            } Euro)`}
            value={price && price / 100}
            placeholder="Total Price in Euros including commission"
            onChange={(e) => setTripPrice(e.target.value)}
            isError={price === "" || price < 1}
            errorMessage="Price cannot be empty"
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
                name="checkin"
                fontSize="sm"
                id="checkin"
                variant="main"
                h="44px"
                maxh="44px"
                defaultValue={60}
                borderColor={borderColor}
                placeholder="How long before the dive should the user arrive?"
                value={checkin}
                onChange={handleChange}
              >
                <option value={30}>30 minutes before departure</option>
                <option value={60}>1 hour before departure</option>
                <option value={90}>1.5 hours before departure</option>
                <option value={120}>2 hours before departure</option>
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
                name="minCert"
                fontSize="sm"
                id="minCert"
                variant="main"
                h="44px"
                maxh="44px"
                // placeholder="Select..."
                borderColor={borderColor}
                value={minCert}
                onChange={handleChange}
              >
                <option value="open_water">Open Water</option>
                <option value="advanced">Advanced</option>
                <option value="dive_master">Dive Master</option>
              </Select>
            </Flex>
            <Flex>
              <Switch
                id="active"
                name="active"
                colorScheme="purple"
                isChecked={tripActive}
                defaultChecked
                onChange={() => setTripActive(!tripActive)}
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
            name="description"
            id="description"
            label="Description"
            mb="0px"
            h="100%"
            value={description}
            placeholder="Additional Information about the trip"
            onChange={handleChange}
          />
        </SimpleGrid>
      </Card>
    </FormControl>
  );
}
