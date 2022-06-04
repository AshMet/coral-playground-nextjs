/* eslint-disable react/prop-types */
import { Badge, Box, Flex, VStack, Spacer, Text } from "@chakra-ui/react";

import Image from "components/actions/NextChakraImg";
import Card from "components/card/Card";

export default function Species(props) {
  const { species } = props;
  return (
    <Card mt={{ sm: "15px", md: "25px" }}>
      <Box w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Text color="purple.400" fonSize="sm" fontWeight="bold" mb="8px">
          Species
        </Text>

        <Flex wrap="wrap" gap={3}>
          {species?.map((item) => {
            return (
              <>
                <Badge
                  colorScheme="purple"
                  borderRadius="15px"
                  display="flex"
                  p={3}
                  justifyContent="center"
                >
                  <VStack>
                    <Image
                      src={`/svg/species/${item
                        .toLowerCase()
                        .replaceAll(" ", "_")}.svg`}
                      width="100%"
                      height="40px"
                      borderRadius="15px"
                    />
                    <Text>{item}</Text>
                  </VStack>
                </Badge>
                <Spacer />
              </>
            );
          })}
        </Flex>
      </Box>
    </Card>
  );
}
