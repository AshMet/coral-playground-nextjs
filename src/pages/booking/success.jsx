/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
// Custom components
// import { getServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useContext, useEffect } from "react";
import Stripe from "stripe";

import Card from "components/card/Card";
// import SummaryTable from "components/pages/bookings/SummaryTable";
import Banner from "components/pages/diving/Banner";
import Content from "components/pages/diving/Content";
import { CartContext } from "contexts/CartContext";
import DivingLayout from "layouts/DivingLayout";

export default function Invoice({ session, lineItems }) {
  // console.log("session", session);
  // console.log("line items", lineItems);

  const tripMetadata = Object.values(session.metadata);
  // const userId = tripMetadata.pop();
  const orderJson = tripMetadata.pop();
  const order = JSON.parse(orderJson);
  const trips = tripMetadata.map((trip) => JSON.parse(trip));
  trips.sort((a, b) => a.priceId.localeCompare(b.priceId));
  const stripeLineItems = lineItems.data;
  stripeLineItems.sort((a, b) => a.price.id.localeCompare(b.price.id));
  // console.log("trips", trips);
  // console.log("tripMetadata", tripMetadata);
  // console.log("stripeLineItems", stripeLineItems);
  // console.log("session metadata", session.metadata);
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <>
      <NextSeo
        title="Booking Success"
        description="Your dive booking has completed successfully"
        canonical="https://www.coralplayground.com/booking"
      />
      <Box textAlign="center" pb={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Congrats, you&apos;re going diving!
        </Heading>
        <Text>
          Your payment has been processed, and you will be receiving an email
          directly from the dive centre / guide once your booking is confirmed.
          Your deposit is fully refundable / transferrable for up to 48 hours
          prior to your first dive date. For any changes to your dive schedule,
          please contact your guide directly.
        </Text>
      </Box>
      <Card maxW="920px" mx="auto">
        <Flex direction="column" width="stretch">
          <Banner orderId={order.id} />
          {/* <SummaryTable cartItems={trips} /> */}
          <Content
            userId={order.user_id}
            diverName={session.customer_details.name}
            email={session.customer_details.email}
            title={session.metadata.title}
            diverCert={order.diving_cert}
            lastDive={order.last_dive}
            notes={order.notes}
            lineItems={stripeLineItems}
            currency={session.currency}
            metadata={trips}
            amountSubtotal={(session.amount_subtotal / 100).toFixed(2)}
            amountTotal={(session.amount_total / 100).toFixed(2)}
            status={session.payment_status}
          />
        </Flex>
      </Card>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const sessionId = context.query.session_id;
  const stripeKey = process.env.STRIPE_SECRET_KEY || "ERROR!!! NO KEY";
  const stripe = new Stripe(stripeKey, {
    apiVersion: "2020-08-27",
  });
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["customer"],
  });
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
    limit: 10,
  });
  return { props: { session, lineItems } };
};

Invoice.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
