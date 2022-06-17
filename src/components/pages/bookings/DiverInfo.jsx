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

import Card from "components/card/Card";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";

export default function Settings() {
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
            placeholder="eg. John Smith"
          />
          <InputField
            mb="0px"
            id="email"
            label="Email"
            placeholder="For Booking Confirmation"
          />
          <Flex direction="column">
            <Flex direction="column" mb="20px">
              <FormLabel
                ms="10px"
                htmlFor="currency"
                fontSize="sm"
                // color={textColor}
                fontWeight="bold"
                _hover={{ cursor: "pointer" }}
              >
                Current Certification Level
              </FormLabel>
              <Select
                // value={certLevel}
                fontSize="sm"
                id="currency"
                variant="main"
                h="44px"
                maxh="44px"
                defaultValue="open_water"
                // onChange={(e) => setCertLevel(e.target.value)}
              >
                <option value="open_water">Open Water</option>
                <option value="advanced">Advanced</option>
                <option value="dive_master">Dive Master</option>
              </Select>
            </Flex>
            <Flex direction="column">
              <FormLabel
                ms="10px"
                htmlFor="currency"
                fontSize="sm"
                // color={textColor}
                fontWeight="bold"
                _hover={{ cursor: "pointer" }}
              >
                Time since last dive
              </FormLabel>
              <Select
                // value={certLevel}
                fontSize="sm"
                id="currency"
                variant="main"
                h="44px"
                maxh="44px"
                defaultValue="open_water"
                // onChange={(e) => setCertLevel(e.target.value)}
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
            placeholder="Please provide any other important information before your dive (e.g. Medical conditions)"
          />
        </SimpleGrid>
      </Card>
    </FormControl>
  );
}
