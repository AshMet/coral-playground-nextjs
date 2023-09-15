import {
  Heading,
  Text,
  Flex,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

import TripSearchBar from "components/fields/TripSearchBar";
// import { TextLine } from "components/icons/Icons";

export default function CallToActionWithAnnotation() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.700", "white");

  const [city, setCity] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    <Stack direction={{ base: "column", md: "row" }} mb="100px">
      <Stack direction="column" spacing={10} justifyContent="center" w="100%">
        <Flex direction="column" width="stretch">
          <Flex
            direction="column"
            mx="auto"
            mb="40px"
            mt={{ sm: "20px", lg: "80px" }}
            maxW={{ base: "100%", md: "100%", lg: "80%", xl: "70%" }}
            textAlign="center"
          >
            <Text
              fontWeight="700"
              letterSpacing="2px"
              bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
              bgClip="text"
              fontSize="sm"
              w="100%"
              mb="10px"
              as="h1"
            >
              WELCOME TO CORAL PLAYGROUND
            </Text>
            <Heading
              color={textColor}
              fontWeight="800"
              fontSize={{ base: "38px", md: "60px", lg: "68px" }}
              lineHeight={{ base: "48px", md: "70px", lg: "78px" }}
              mb="20px"
            >
              The Better Way to Book your <br />
              <Text as="span" color="brand.100">
                Red Sea{" "}
                {/* <Icon
                  position="absolute"
                  as={TextLine}
                  bottom={{
                    base: "-20px",
                    md: "-32px",
                    lg: "-30px",
                    xl: "-44px",
                  }}
                  left={{ base: "94%", md: "50%" }}
                  transform={{
                    base: "translate(-100%, 0px)",
                    md: "translate(-50%, 0px)",
                  }}
                  w={{ base: "180px", md: "300px", xl: "400px" }}
                /> */}
              </Text>
              <Text as="span" color={textColor}>
                Diving Adventure
              </Text>
            </Heading>
            <Text
              color={textColorSecondary}
              fontSize="xl"
              w="100%"
              mb="20px"
              mt="50px"
              px="20px"
            >
              Get started by entering your travel dates below to see our
              upcoming dive trips
            </Text>
            <TripSearchBar
              city={city}
              setCity={setCity}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              w="100%"
              searchButton
            />
          </Flex>
        </Flex>
      </Stack>
    </Stack>
  );
}
