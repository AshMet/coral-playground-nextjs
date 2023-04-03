/* eslint-disable react-hooks/exhaustive-deps */
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
  Button,
  Center,
} from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import { useContext, useEffect } from "react";

import Card from "components/card/Card";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";
import { CartContext } from "contexts/CartContext";

import CheckoutButton from "./CheckoutButton";
import { useRouter } from "next/router";

export default function DiverInfo(props) {
  const { summaryTab } = props;

  const user = useUser();
  const router = useRouter();

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";
  const {
    diverName,
    setDiverName,
    diverEmail,
    setDiverEmail,
    diverCert,
    setDiverCert,
    lastDive,
    setLastDive,
    notes,
    setNotes,
  } = useContext(CartContext);

  useEffect(() => {
    setDiverName(
      `${user?.user_metadata.first_name} ${user?.user_metadata.last_name}`
    );
    setDiverEmail(user?.email);
    setDiverCert(user?.user_metadata.certification);
  }, [user]);

  return (
    <FormControl>
      {user ? (
        <Card mb={{ base: "0px", xl: "20px" }}>
          <Flex direction="column" mb="40px" ms="10px">
            <Text fontSize="xl" color={textColorPrimary} fontWeight="bold">
              Diver Information
            </Text>
            <Text fontSize="md" color={textColorSecondary}>
              Please provide some basic information for a faster check-in when
              you arrive at your dive centre.
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
              isDisabled={!user}
              onChange={(e) => setDiverName(e.target.value)}
            />
            <InputField
              mb="0px"
              id="email"
              label="Email"
              value={diverEmail}
              placeholder="For Booking Confirmation"
              isDisabled={!user}
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
                  isDisabled={!user}
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
                  isDisabled={!user}
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
              isDisabled={!user}
              value={notes}
              placeholder="Please provide any other important information before your dive (e.g. Medical conditions)"
              onChange={(e) => setNotes(e.target.value)}
            />
          </SimpleGrid>
          <Flex justify="space-between" mt="24px">
            <Button
              variant="light"
              fontSize="sm"
              borderRadius="16px"
              w={{ base: "128px", md: "148px" }}
              h="46px"
              onClick={() => summaryTab.current.click()}
            >
              Prev
            </Button>
            <CheckoutButton />
          </Flex>
        </Card>
      ) : (
        <Center h="200px">
          <CheckoutButton />
          <Button
            variant="brand"
            fontSize="sm"
            borderRadius="16px"
            w={{ base: "128px", md: "168px" }}
            h="46px"
            ml={5}
            onClick={() => router.push("/auth/signup")}
          >
            Sign Up to Checkout
          </Button>
        </Center>
      )}
    </FormControl>
  );
}
