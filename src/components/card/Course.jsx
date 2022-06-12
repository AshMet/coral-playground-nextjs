/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
// Chakra imports
import { Box, Flex, Text, useColorModeValue, Button } from "@chakra-ui/react";
// Custom components
import { useRouter } from "next/router";
import { useState } from "react";

// import { createCheckoutSession } from "next-stripe/client";

import Image from "components/actions/NextChakraImg";
import Card from "components/card/Card";
import checkout from "components/pages/activities/checkout";

// interface CourseProps {
//   imageUrl: string;
//   title: string;
//   description: string;
//   agency: string;
//   price: string;
//   duration: string;
//   bgBox: string;
//   priceId: string;
// }

export default function Course(props) {
  const {
    imageUrl,
    title,
    description,
    agency,
    price,
    duration,
    bgBox,
    priceId,
  } = props;
  const textColor = useColorModeValue("navy.700", "white");
  const textBrand = useColorModeValue("brand.500", "white");
  // const bgBadge = useColorModeValue("secondaryGray.300", "whiteAlpha.50");

  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const lineItems = [
    {
      price: priceId, // eg: "price_1KuasdfaWasdfasdfasfnsF4fi",
      quantity: 1,
    },
  ];

  console.log(router.pathname);

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");
    checkout({ lineItems });
    setLoading(false);
  };

  // const onClick = async (priceId) => {
  //   setLoading(true);
  //   const session = await createCheckoutSession({
  //     success_url: window.location.href,
  //     cancel_url: window.location.href,
  //     line_items: [{ price: priceId, quantity: 1 }],
  //     payment_method_types: ["card"],
  //     method: "payment",
  //   });
  //   console.log(session);
  //   const stripePublicKey =
  //     process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "ERROR!!! NO KEY";
  //   const stripe = await loadStripe(stripePublicKey);
  //   if (stripe) {
  //     stripe.redirectToCheckout({ sessionId: session.id });
  //   }
  //   setLoading(false);
  // };

  return (
    <Card p="20px" h="max-content" minH={{ md: "450px", xl: "auto" }}>
      <Flex direction={{ base: "column", md: "column", xl: "row" }}>
        <Flex direction="column" pr="20px">
          <Box
            bg={bgBox}
            minW={{ base: "100%", xl: "270px" }}
            minH={{ base: "200px", xl: "270px" }}
            borderRadius="20px"
            me="34px"
            width="100%"
            height="100%"
            position="relative"
          >
            <Image src={imageUrl} layout="fill" />
          </Box>
          <Button
            variant="darkBrand"
            color="white"
            fontSize="sm"
            fontWeight="500"
            borderRadius="70px"
            mt="20px"
            onClick={() => redirectToCheckout()}
            isLoading={isLoading}
          >
            Book Now
          </Button>
        </Flex>
        <Flex
          justify="space-between"
          flexDirection="column"
          mb="auto"
          pb={{ base: "0px", md: "0px" }}
        >
          <Flex display={{ base: "block", xl: "flex" }}>
            <Box direction="column" w="100%" mb="5px">
              <Text
                color={textColor}
                fontSize={{
                  base: "xl",
                  md: "xl",
                  xl: "xl",
                  "2xl": "28px",
                }}
                mb="10px"
                fontWeight="700"
              >
                {title}
              </Text>
              <Text
                color="secondaryGray.600"
                fontSize={{
                  base: "md",
                }}
                fontWeight="400"
                me="14px"
                mb="10px"
              >
                {description}
              </Text>
              <Flex justify="space-between" w="100%">
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    {agency}
                  </Text>
                  <Text color={textBrand} fontSize="sm" fontWeight="normal">
                    Agency
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    {duration}
                  </Text>
                  <Text color={textBrand} fontSize="sm" fontWeight="normal">
                    Duration
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    {price}
                  </Text>
                  <Text color={textBrand} fontSize="sm" fontWeight="normal">
                    Price
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
