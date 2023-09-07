/* eslint-disable react/prop-types */
import {
  Flex,
  Stack,
  Text,
  HStack,
  GridItem,
  Grid,
  Center,
} from "@chakra-ui/react";
// import { PiClockAfternoon } from "react-icons/pi";

export default function DataIconTile({ title, value, unit, icon }) {
  return (
    <Stack w="140px" h="77px" borderRadius="15px" border="1px">
      <Flex
        // me="20px"
        direction="column"
        align="center"
        justify="center"
      >
        <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(3, 1fr)">
          <GridItem rowSpan={3} colSpan={1} mt="10px" mr={2}>
            <Center h="100%" w="100%">
              {icon}
            </Center>
          </GridItem>
          <GridItem rowSpan={2} colSpan={2} mt="10px">
            <Flex
              // me="20px"
              direction="column"
              align="start"
              justify="start"
            >
              <HStack>
                <Text lineHeight="100%" fontSize="25px" fontWeight="700">
                  {value}{" "}
                  <Text as="span" fontSize="15px" fontWeight="300">
                    {unit}
                  </Text>
                </Text>
              </HStack>
            </Flex>
          </GridItem>
          <GridItem colSpan={1}>
            <Text mb="2px" fontSize="sm" fontWeight="300">
              {title}
            </Text>
          </GridItem>
        </Grid>
      </Flex>
    </Stack>
  );
}
