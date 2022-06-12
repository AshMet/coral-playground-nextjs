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
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router'
import AdminLayout from "layouts/admin";
import Card from "components/card/Card";
import Banner from "components/pages/activities/Banner";
import Content from "components/pages/activities/Content";
import Stripe from "stripe";

export default function Invoice({session}) {

  // Chakra Color Mode
  return (
    <Card mt={{ base: "130px", md: "80px", xl: "80px" }} maxW="920px" mx="auto">
      <Flex direction="column" width="stretch">
        <Banner sessionId={session.id} status={session.payment_status} />
        <Content amountSubtotal={(session.amount_subtotal/100).toFixed(2)} amountTotal={(session.amount_total/100).toFixed(2)} />
      </Flex>
    </Card>
  );
}

export const getServerSideProps = async (context) => {
  const { session_id } = context.query;
  const stripeKey = process.env.STRIPE_SECRET_KEY || "ERROR!!! NO KEY";
  const stripe = new Stripe(stripeKey, {
    apiVersion: "2020-08-27",
  });
  const session = await stripe.checkout.sessions.retrieve(session_id);
  // const lineItems = await stripe.checkout.sessions.listLineItems(
  //   'cs_test_a1F8XNLYfw8B2GFcBlL4fUiqmtL0agRxddGEL0tUcVlxj8olGfVoxXPBwF',
  //   { limit: 5 },
  //   function(err, lineItems) {
  //     // asynchronously called
  //   }
  // );
  return { props: { session: session } };
};

Invoice.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
