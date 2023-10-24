/* eslint-disable react/prop-types */
import {
  Badge,
  Box,
  Divider,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Card from "components/card/Card";

import CertCentreLineItem from "./CertCentreLineItem";

export default function CertSidebar({ certCentres }) {
  const textColorTertiary = useColorModeValue(
    "secondaryGray.700",
    "secondaryGray.500"
  );
  return (
    <Card>
      <Flex gap={5}>
        <Flex flexDirection="column">
          <Text fontSize="lg" fontWeight="700" lineHeight="100%">
            Available Dive Centres
          </Text>
          <Text color={textColorTertiary} fontSize="sm" mt="10px">
            Select a date on your preferred dive centre to add to your cart for
            checkout
          </Text>
        </Flex>

        {/* {(trips || diveSite.latitude || diveCentre.latitude) && (
          <TripsMap trips={trips} diveSite={diveSite} diveCentre={diveCentre} />
        )} */}
        {certCentres?.length > 0 && (
          <Badge
            bgColor="brand.100"
            color="white"
            borderRadius="15px"
            display="flex"
            // w="30px"
            h="25px"
            px={4}
            py={2}
            justifyContent="center"
          >
            {certCentres.length}
          </Badge>
        )}
      </Flex>
      <Box mt={10}>
        {certCentres?.length > 0 ? (
          certCentres.map((certCentre, index) => (
            <Flex
              key={certCentre.id}
              direction="column"
              justify="space-between"
              align="center"
            >
              <CertCentreLineItem
                certCentre={certCentre}
                // tripRules={getFilteredRules(trip, dateRange)}
                // type={diveCentre ? "diveCentre" : "diveSite"}
                // icon={
                //   <Icon as={MdAddCircle} color={textColor} w="20px" h="18px" />
                // }
              />
              {certCentres?.length > index + 1 && <Divider my="25px" />}
            </Flex>
          ))
        ) : (
          <Text
            fontSize="md"
            fontWeight="500"
            color="textColorTertiary"
            mb="30px"
          >
            No results found
          </Text>
        )}
      </Box>
    </Card>
  );
}
