/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import React from "react";

// Chakra imports
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import SummaryTable from "../bookings/SummaryTable";
import Card from "components/card/Card";
import InvoiceTable from "components/pages/diving/InvoiceTable";
import { HSeparator } from "components/separator/Separator";

export default function Content(props) {
  const {
    diverName,
    email,
    title,
    diveDate,
    diveTime,
    diverCert,
    lastDive,
    certLevel,
    lineItems,
    currency,
    metadata,
    amountTotal,
    amountSubtotal,
    status,
  } = props;
  const tableColumnsInvoice = [
    {
      Header: "Item",
      accessor: "item",
    },
    {
      Header: "Quantity",
      accessor: "quantity",
    },
    // {
    //   Header: "Per Unit",
    //   accessor: "perUnit",
    // },
    {
      Header: "Total Cost",
      accessor: "totalCost",
    },
    {
      Header: "Paid",
      accessor: "paid",
    },
    {
      Header: "Pay to Dive Centre",
      accessor: "remaining",
    },
  ];

  const tableDataInvoice = lineItems.map((item, index) => {
    return {
      // item: item.description,
      item: metadata[index].title,
      quantity: item.quantity,
      // perUnit: item.amount_subtotal / 100,
      paid: item.amount_total / 100,
      currency: item.currency,
      totalCost: metadata[index].price / 100,
      remaining: (metadata[index].price - item.amount_total) / 100,
    };
  });

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const bgCard = useColorModeValue("white", "navy.700");
  // let paid = 0;
  // for (let i = 0; i < tableDataInvoice.length; i++) {
  //   paid += tableDataInvoice[i].deposit;
  // }
  const paid = amountTotal;
  const total = metadata
    .map((item) => item.price / 100)
    .reduce((partialSum, a) => partialSum + a, 0);

  return (
    <Flex direction="column" p={{ base: "10px", md: "60px" }}>
      <Card
        backgroundRepeat="no-repeat"
        bg={bgCard}
        p="30px"
        mb="30px"
        mt="-100px"
      >
        <Flex direction={{ base: "column", md: "row" }}>
          <Flex direction="column" me="auto" mb={{ base: "30px", md: "0px" }}>
            <Text
              w="max-content"
              mb="8px"
              fontSize="md"
              color="secondaryGray.600"
              fontWeight="400"
            >
              Receipt for:
              {/* {lineItems[0].description} */}
            </Text>
            <Text color={textColor} fontSize="xl" fontWeight="700">
              {diverName}
            </Text>
            <Text
              w="max-content"
              mb="10px"
              fontSize="md"
              color="secondaryGray.600"
              fontWeight="400"
              lineHeight="26px"
            >
              {email}
              {/* <br /> Address 2 */}
            </Text>
          </Flex>
          <Flex direction="column">
            <Text
              w="max-content"
              mb="10px"
              fontSize="md"
              color="secondaryGray.600"
              fontWeight="400"
            >
              Booking Status
            </Text>
            <Text color={textColor} fontSize="36px" fontWeight="700">
              {diveTime}
            </Text>
            <Text
              w="max-content"
              mb="10px"
              fontSize="md"
              p="6px 12px"
              bg="linear-gradient(108.54deg, #08a743 6.56%, #08c999 95.2%)"
              color="black"
              borderRadius="10px"
              fontWeight="700"
            >
              {status.toUpperCase()}
            </Text>
          </Flex>
        </Flex>
      </Card>
      {/* <InvoiceTable
        tableData={tableDataInvoice}
        columnsData={tableColumnsInvoice}
        currency={currency}
      /> */}
      <SummaryTable cartItems={metadata} />
      <Flex mt="70px" direction={{ base: "column", md: "row" }}>
        <Box me="auto" mb={{ base: "40px", md: "0px" }}>
          <Text fontSize="lg" fontWeight="700" color={textColor}>
            Notes
          </Text>
          <Text
            fontSize="md"
            fontWeight="400"
            color="secondaryGray.600"
            maxW="292px"
          >
            {diverCert && `Current Certification: ${diverCert}`} <br />
            {lastDive && `Last Dive: ${lastDive}`}
          </Text>
        </Box>
        <Box>
          <Flex align="center" justifyContent="space-between" mb="12px">
            <Text
              textAlign="end"
              color={textColor}
              fontSize="lg"
              fontWeight="400"
            >
              Total
            </Text>
            <Text color={textColor} fontSize="lg" fontWeight="700" maxW="292px">
              {currency === "eur" ? "€" : "$"} {total.toFixed(2)}
            </Text>
          </Flex>
          <Flex align="center" justifyContent="space-between">
            <Text
              me="70px"
              fontWeight="400"
              textAlign="end"
              color={textColor}
              fontSize="lg"
            >
              Paid to date
            </Text>
            <Text color={textColor} fontSize="lg" fontWeight="700" maxW="292px">
              {currency === "eur" ? "€" : "$"} {paid}
            </Text>
          </Flex>
          <HSeparator my="20px" />
          <Flex align="center" justifyContent="space-between">
            <Text
              me="70px"
              fontWeight="400"
              textAlign="end"
              color="green.500"
              fontSize="lg"
            >
              Pay to Dive Centre
            </Text>
            <Text color="green.500" fontSize="lg" fontWeight="700" maxW="292px">
              {currency === "eur" ? "€" : "$"} {(total - paid).toFixed(2)}
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Text mt="50px" fontSize="md" fontWeight="400" color="secondaryGray.600">
        Thank you very much for booking with Coral Playground. Note that all
        bookings are 100% refunudable up to 48 hours prior to the booking time.
        Any cancellations later than that will incur a 25% penalty.
      </Text>
    </Flex>
  );
}
