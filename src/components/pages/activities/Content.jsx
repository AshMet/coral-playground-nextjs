/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import React from "react";

// Chakra imports
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";
import InvoiceTable from "components/pages/activities/InvoiceTable";
import { HSeparator } from "components/separator/Separator";

export default function Content(props) {
  const {
    diverName,
    diveDate,
    diveTime,
    certLevel,
    amountTotal,
    amountSubtotal,
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
    {
      Header: "Rate",
      accessor: "rate",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
  ];

  const tableDataInvoice = [
    {
      item: "Diver Certification Course",
      quantity: "1",
      rate: amountTotal,
      amount: amountSubtotal,
    },
  ];

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const bgCard = useColorModeValue("white", "navy.700");
  // let total = 0;
  // for (let i = 0; i < tableDataInvoice.length; i++) {
  //   total += tableDataInvoice[i].amount;
  // }
  const total = amountTotal;
  const paid = amountTotal;
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
              Address 1
              <br /> Address 2
            </Text>
          </Flex>
          <Flex direction="column">
            <Text
              w="max-content"
              mb="4px"
              fontSize="md"
              color="secondaryGray.600"
              fontWeight="400"
            >
              Booking Date
            </Text>
            <Text color={textColor} fontSize="36px" fontWeight="700">
              {diveTime}
            </Text>
            <Text
              w="max-content"
              mb="10px"
              fontSize="md"
              p="6px 12px"
              bg="linear-gradient(108.54deg, #FF416C 6.56%, #FF4B2B 95.2%)"
              color="white"
              borderRadius="10px"
              fontWeight="700"
            >
              {diveDate}
            </Text>
          </Flex>
        </Flex>
      </Card>
      <InvoiceTable
        tableData={tableDataInvoice}
        columnsData={tableColumnsInvoice}
      />
      <Flex mt="70px" direction={{ base: "column", md: "row" }}>
        <Box me="auto" mb={{ base: "40px", md: "0px" }}>
          <Text fontSize="lg" fontWeight="700" color={textColor}>
            Note
          </Text>
          <Text
            fontSize="md"
            fontWeight="400"
            color="secondaryGray.600"
            maxW="292px"
          >
            Thank you very much for booking with Coral Playground. Note that all
            bookings are 100% refunudable up to 48 hours prior to the booking
            time. Any cancellations later than that will incur a 25% penalty.
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
              ${total}
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
              ${paid}
            </Text>
          </Flex>
          <HSeparator my="20px" />
          <Flex align="center" justifyContent="space-between">
            <Text
              me="70px"
              fontWeight="400"
              textAlign="end"
              color={textColor}
              fontSize="lg"
            >
              Amount to pay
            </Text>
            <Text color={textColor} fontSize="lg" fontWeight="700" maxW="292px">
              ${total - paid}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
