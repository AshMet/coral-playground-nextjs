/* eslint-disable react/prop-types */
import {
  Box,
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext } from "react";

import { DivingContext } from "../../../contexts/DivingContext";
import Card from "../../card/Card";
import TripSummary from "../../dataDisplay/TripSummary";

export default function SummaryTable() {
  const { dives } = useContext(DivingContext);
  return (
    <Card>
      <Box>
        <TableContainer>
          <Table variant="simple">
            {/* <TableCaption> Caption </TableCaption> */}
            <Thead>
              <Tr>
                <Th>Item #</Th>
                <Th>Details</Th>
                <Th>Quantity</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Pay Now</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dives.length > 0 ? (
                dives.map((dive, index) => (
                  <Tr>
                    <Td>{index + 1}</Td>
                    <Td>
                      <TripSummary
                        siteName={dive.siteName}
                        centreName={dive.centreName}
                        diveDate={dive.diveDate}
                      />
                    </Td>
                    <Td>1</Td>
                    <Td isNumeric>€{dive.price / 100}</Td>
                    <Td isNumeric>€15</Td>
                  </Tr>
                ))
              ) : (
                <Center w="100%">
                  <Text mx="auto" my="10">
                    No dives selected
                  </Text>
                </Center>
              )}
            </Tbody>
            {/* <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot> */}
          </Table>
        </TableContainer>
        <Text
          ms="auto"
          color="gray.500"
          fontSize="sm"
          mt="20px"
          fontWeight="300"
        >
          Note that all trips are subject to weather and ocean conditions and
          could be cancelled at any time at the discretion of the Dive Centre.
          In the event of a cencellation, customers can receive a full refund or
          credit towards their next dive.
        </Text>
      </Box>
    </Card>
  );
}
