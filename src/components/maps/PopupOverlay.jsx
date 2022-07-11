/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/prop-types */
// Chakra imports
import { Badge, Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsArrowRight } from "react-icons/bs";

export default function Default(props) {
  const { name, icon, divingTypes, locationId, locationType } = props;
  const router = useRouter();

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
    <Box>
      <Flex align="center" mb="10px" mx="10px">
        <Icon me="10px" as={icon} color="brand.300" h="30px" w="30px" />
        <Text fontSize="lg" fontWeight="700" color="brand.300">
          {name}
        </Text>
      </Flex>
      <Flex align="center">
        <Flex wrap="wrap" gap={1}>
          {divingTypes?.map((type) => (
            <Badge
              colorScheme="purple"
              borderRadius="15px"
              display="flex"
              px={1}
              py={1}
              justifyContent="center"
              fontSize="0.8em"
            >
              {type}
            </Badge>
          ))}
        </Flex>
        <Button
          p="0px"
          ms="auto"
          variant="no-hover"
          bg="transparent"
          cursor="pointer"
          color="brand.100"
          _hover={{ transform: "translate(4px)" }}
          onClick={viewLocationDetails}
        >
          <Text fontSize="sm" fontWeight="bold">
            View
          </Text>
          <Icon
            as={BsArrowRight}
            w="18px"
            h="18px"
            transition="all .3s ease"
            ms=".3rem"
          />
        </Button>
      </Flex>
    </Box>
  );
}
