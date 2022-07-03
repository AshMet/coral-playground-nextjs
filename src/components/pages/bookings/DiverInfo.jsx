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
  const { setDiverName, setDiverEmail, setDiverCert, setLastDive, setNotes } =
    props;

  const [diverName] = useState();
  const [diverEmail] = useState();
  const [diverCert] = useState();
  const [lastDive] = useState();
  const [notes] = useState();
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";

  return (
    <FormControl>
      <Card mb={{ base: "0px", xl: "20px" }}>
        <Flex direction="column" mb="40px" ms="10px">
          <Text fontSize="xl" color={textColorPrimary} fontWeight="bold">
            Diver Information
          </Text>
          <Text fontSize="md" color={textColorSecondary}>
            Please provide some basic information to ensure you are qualified
          </Text>
        </Flex>
        <SimpleGrid
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: "20px", xl: "20px" }}
        >
          <InputField
            mb="0px"
            me="30px"
            id="diverName"
            label="Diver Name"
            value={diverName}
            placeholder="eg. John Smith"
            onChange={(e) => setDiverName(e.target.value)}
          />
          <InputField
            mb="0px"
            id="email"
            label="Email"
            value={diverEmail}
            placeholder="For Booking Confirmation"
            onChange={(e) => setDiverEmail(e.target.value)}
          />
          <Flex direction="column">
            <Flex direction="column" mb="20px">
              <FormLabel
                ms="10px"
                htmlFor="diverCert"
                fontSize="sm"
                // color={textColor}
                fontWeight="bold"
                _hover={{ cursor: "pointer" }}
              >
                Current Certification Level
              </FormLabel>
              <Select
                fontSize="sm"
                id="diverCert"
                variant="main"
                h="44px"
                maxh="44px"
                defaultValue="open_water"
                value={diverCert}
                onChange={(e) => setDiverCert(e.target.value)}
              >
                <option value="open_water">Open Water</option>
                <option value="advanced">Advanced</option>
                <option value="dive_master">Dive Master</option>
              </Select>
            </Flex>
            <Flex direction="column">
              <FormLabel
                ms="10px"
                htmlFor="lastDive"
                fontSize="sm"
                // color={textColor}
                fontWeight="bold"
                _hover={{ cursor: "pointer" }}
              >
                Time since last dive
              </FormLabel>
              <Select
                fontSize="sm"
                id="lastDive"
                variant="main"
                h="44px"
                maxh="44px"
                value={lastDive}
                defaultValue="6months"
                onChange={(e) => setLastDive(e.target.value)}
              >
                <option value="6months">{`< 6 months ago`}</option>
                <option value="1year">6 months - 1 year ago</option>
                <option value="2years">1 - 2 years ago</option>
                <option value="2plusyears">{`> 2 years ago`}</option>
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
