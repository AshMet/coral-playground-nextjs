/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
// Chakra imports
import { Box, Button, Icon, Spacer, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdChevronRight } from "react-icons/md";

// Custom components
import Card from "components/card/Card";
import IconBox from "components/icons/IconBox";

export default function Banner(props) {
  const { name, city, country, icon, locationId, locationType } = props;
  const router = useRouter();
  // Chakra Color Mode
  const textColorSecondary = "gray.400";

  function viewLocationDetails() {
    // ReactGA.event({
    //   category: "Diving",
    //   action: "View Site Details",
    // });
    locationType === "dive_site"
      ? router.push(`/diving/dive_sites/${locationId}`)
      : router.push(`/diving/dive_centres/${locationId}`);
  }

  return (
    <Card mb={{ base: "0px", lg: "0px" }} align="center" bgColor="white">
      <IconBox
        mx="auto"
        h="60px"
        w="60px"
        icon={<Icon as={icon} color="white" h="30px" w="30px" />}
        bg="brand.400"
      />
      <Text
        color="brand.500"
        fontWeight="bold"
        fontSize="xl"
        mt="10px"
        mb="5px"
      >
        {name}
      </Text>
      <Text
        color={textColorSecondary}
        fontSize="xs"
        maxW={{ base: "100%", xl: "80%", "3xl": "60%" }}
        mx="auto"
      >
        {`${city}, ${country}` || " "}
      </Text>
      <Box w="100%" mt="10px">
        {name && (
          <Button variant="darkBrand" onClick={viewLocationDetails} w="100%">
            <Spacer />
            View
            <Spacer />
            <Icon as={MdChevronRight} color="white" />
          </Button>
        )}
        {/* <Flex w="100%" justify="space-between" mb="10px">
          <Text color={textColorSecondary} fontSize="sm" maxW="40%">
            {used} GB
          </Text>
          <Text color={textColorSecondary} fontSize="sm" maxW="40%">
            {total} GB
          </Text>
        </Flex>
        <Progress
          align="start"
          colorScheme="brandScheme"
          value={(used / total) * 100}
          w="100%"
        /> */}
      </Box>
    </Card>
  );
}
