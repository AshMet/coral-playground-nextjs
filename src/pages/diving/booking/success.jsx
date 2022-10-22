/* eslint-disable react/prop-types */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___  
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \ 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/ 
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Flex } from "@chakra-ui/react";
// Custom components
// import { getServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Stripe from "stripe";

import Card from "components/card/Card";
import Banner from "components/pages/diving/Banner";
import Content from "components/pages/diving/Content";
import AdminLayout from "layouts/admin";

export default function Invoice({ session, lineItems }) {
  // console.log("session", session);
  // console.log("line items", lineItems);

  const tripMetadata = Object.values(session.metadata);
  const trips = tripMetadata.map((trip) => JSON.parse(trip));
  return (
    <>
      <NextSeo
        title="Booking Success"
        description="Your dive booking has completed successfully"
      />
      <Card
        mt={{ base: "130px", md: "80px", xl: "80px" }}
        maxW="920px"
        mx="auto"
      >
        <Flex direction="column" width="stretch">
          <Banner sessionId={session.id} />
          <Content
            diverName={session.customer_details.name}
            email={session.customer_details.email}
            siteName={session.metadata.siteName}
            diveDate={session.metadata.dive_date}
            diveTime={session.metadata.dive_time}
            diverCert={session.customer.metadata.diverCert}
            lastDive={session.customer.metadata.lastDive}
            cert={session.metadata.cert}
            lineItems={lineItems.data}
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
  return <AdminLayout>{page}</AdminLayout>;
};
