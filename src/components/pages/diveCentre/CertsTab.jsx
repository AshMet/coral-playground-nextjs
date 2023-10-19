/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import { Flex, Text, Box, SimpleGrid } from "@chakra-ui/react";

import CentreCertTile from "components/dataDisplay/CentreCertTile";

export default function CertsTab(props) {
  const { centreCerts } = props;

  return (
    <Box>
      <Text color="grey.500" fontSize="md" fontWeight="500" mb="20px">
        Select any certification course you would like to register for
      </Text>
      <Flex direction="column" w="100%">
        <Flex wrap="wrap">
          {centreCerts?.length > 0 ? (
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="20px" w="100%">
              {centreCerts.map((cert) => (
                <CentreCertTile key={cert.id} item={cert} />
              ))}
            </SimpleGrid>
          ) : (
            <Text fontSize="md" fontWeight="500" color="textColor" mb="30px">
              No Dive Trips are scheduled for your selected dates. Please modify
              your dates or check back soon, new trips are added regularly
            </Text>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
