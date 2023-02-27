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

import Card from "components/card/Card";
import TripSummary from "components/dataDisplay/TripSummary";

export default function SummaryTable({ lineItems }) {
  // const { lineItems } = useContext(CartContext);
  // console.log(lineItems);
  return (
    <Card p="30px">
      <Text fontSize="2xl" fontWeight="700" mb="20px">
        Price Summary
      </Text>
      <Text color="grey.500" fontSize="md" fontWeight="500" mb="20px">
        Please review prices carefully. <br />
        Payments on Coral Playground are only a deposit with the rest owing to
        the dive centre
      </Text>
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
              {lineItems.length > 0 ? (
                lineItems.map((item, index) => (
                  <Tr key={item.title}>
                    <Td>{index + 1}</Td>
                    <Td>
                      <TripSummary
                        title={item.title}
                        centreName={item.centreName}
                        diveDate={item.diveDate}
                      />
                    </Td>
                    <Td>1</Td>
                    <Td isNumeric>€{item.price / 100}</Td>
                    <Td isNumeric>€{item.payNow / 100}</Td>
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
      {/* <Flex justify="space-between" mt="24px">
        <Button
          variant="light"
          fontSize="sm"
          borderRadius="16px"
          w={{ base: "128px", md: "148px" }}
          h="46px"
          onClick={() => equipmentTab.current.click()}
        >
          Prev
        </Button>
        <Button
          variant="darkBrand"
          fontSize="sm"
          borderRadius="16px"
          w={{ base: "128px", md: "148px" }}
          h="46px"
          isActive={lineItems.length > 0}
          onClick={() => diverInfoTab.current.click()}
        >
          Next
        </Button>
      </Flex> */}
    </Card>
  );
}
