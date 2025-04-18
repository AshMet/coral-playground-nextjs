/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { Button, useToast } from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import axios from "axios";
import { useRouter } from "next/router";
import { usePostHog } from "posthog-js/react";
import { useContext } from "react";

import AlertPopup from "components/alerts/AlertPopup";
import { CartContext } from "contexts/CartContext";
// import * as gtag from "lib/data/gtag";

export default function CheckoutButton() {
  const {
    diverName,
    diverEmail,
    cartItems,
    equipmentList,
    diverCert,
    lastDive,
    notes,
  } = useContext(CartContext);
  // console.log("certItems", cartItems);

  const supabase = useSupabaseClient();
  const user = useUser();
  const toast = useToast();
  const router = useRouter();
  const posthog = usePostHog();

  async function checkout() {
    let stripePromise = null;

    // --------- Calculate Totals ----------
    function calcTotalPaid() {
      const cartPrice = cartItems
        .map((item) => item.deposit)
        .reduce((partialSum, a) => partialSum + a, 0);
      const equipmentPrice = equipmentList
        .map((item) => item.deposit)
        .reduce((partialSum, a) => partialSum + a, 0);
      // console.log("cartPrice", cartPrice);
      return parseFloat(cartPrice + equipmentPrice);
    }
    function calcTotalCost() {
      const cartPrice = cartItems
        .map((item) => item.price)
        .reduce((partialSum, a) => partialSum + a, 0);
      const equipmentPrice = equipmentList
        .map((item) => item.price)
        .reduce((partialSum, a) => partialSum + a, 0);
      // console.log("cartPrice2", cartPrice);
      return parseFloat(cartPrice + equipmentPrice);
    }

    // --------- Create Order ----------
    async function createOrder() {
      const { data: order, error: createOrderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user.id,
            diving_cert: diverCert,
            last_dive: lastDive,
            notes,
            amount_paid: calcTotalPaid(),
            amount_total: calcTotalCost(),
            currency: "eur",
            status: "pending",
            // stripe_customer_id: custId,
            // stripe_session_id: sessionId,
          },
        ])
        .select()
        .single();

      if (createOrderError) {
        posthog.capture("Stripe Checkout Failed", {
          Error: createOrderError.message,
        });
      } else if (order) {
        posthog.capture("Stripe Checkout", {
          "Order Id": order.id,
          "Amount Paid": order.amount_paid / 100,
          "Amount Total": order.amount_total / 100,
        });
      }
      // console.log("calcTotalPaid", calcTotalPaid());
      // console.log("order", order);
      return order;
    }

    // --------- Create Order Line Items ----------
    async function createOrderLineItems(order) {
      // --------- Create Order Trips ----------
      const insertDataTrip = cartItems
        .filter((item) => item.itemType === "diveTrip")
        .map((item) => ({
          order_id: order.id,
          dive_trip_id: item.id,
          user_selected_time: item.startDate,
          quantity: 1,
        }));
      // Format insert Data as array only for multiple items
      const { error: tripLineItemError } = await supabase
        .from("order_trips")
        .insert(
          insertDataTrip.length === 1 ? insertDataTrip[0] : insertDataTrip
        )
        .select();
      if (tripLineItemError) {
        // console.log(
        //   `Line Item Save Failed: ${JSON.stringify(tripLineItemError)}`
        // );
      }
      // console.log("insertDataTrip", insertDataTrip);

      // --------- Create Order Certs ----------
      const insertDataCert = cartItems
        .filter((item) => item.itemType === "certification")
        .map((item) => ({
          order_id: order.id,
          certification_id: item.id,
          user_selected_time: item.startDate,
          quantity: 1,
        }));
      const { error: certLineItemError } = await supabase
        .from("order_certs")
        .insert(
          insertDataCert.length === 1 ? insertDataCert[0] : insertDataCert
        )
        .select();
      if (certLineItemError) {
        // console.log(
        //   `Line Item Save Failed: ${JSON.stringify(certLineItemError)}`
        // );
      }
      // console.log("insertDataCert", insertDataCert);

      // --------- Create Order Eqiupment ----------
      const insertDataEquipment = equipmentList
        .filter((item) => item.itemType === "equipment")
        .map((item) => ({
          order_id: order.id,
          equipment_id: item.id,
          quantity: 1,
        }));
      const { error: equipLineItemError } = await supabase
        .from("order_equipment")
        .insert(
          insertDataEquipment.length === 1
            ? insertDataEquipment[0]
            : insertDataEquipment
        )
        .select();
      if (equipLineItemError) {
        // console.log(
        //   `Line Item Save Failed: ${JSON.stringify(equipLineItemError)}`
        // );
      }
      // console.log("insertDataEquipment", insertDataEquipment);
      return order;
    }

    // --------- Create Stripe Checkout ----------
    async function createStripeCheckout(order) {
      // Create Stripe customer
      const {
        data: { id: custId },
      } = await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/stripe/create_customer`,
        {
          name: diverName, // get from json
          email: diverEmail, // get from json
          metadata: { user_id: user.id },
        }
      );

      // Format data for Stripe line items & metadata
      const stripeLineItems = cartItems.map((item) => {
        return {
          price: item.priceId,
          quantity: 1,
        };
      });

      equipmentList.forEach((item) => {
        // console.log("line item", item);
        stripeLineItems.push({
          price: item.priceId,
          quantity: 1,
        });
      });

      const cartMetadata = cartItems.reduce(
        (a, v) => ({
          ...a,
          [`dive_${v.id.toString().substr(0, 10)}`]: JSON.stringify(v),
        }),
        {}
      );

      const equipmentMetadata = equipmentList.reduce(
        (a, v) => ({ ...a, [`equipment_${v.id}`]: JSON.stringify(v) }),
        {}
      );

      const sessionMetadata = {
        order: JSON.stringify(order),
        ...cartMetadata,
        ...equipmentMetadata,
      };

      // Create Stripe session
      const {
        data: { id: sessionId },
      } = await axios.post(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/stripe/checkout_sessions`,
        {
          items: stripeLineItems,
          metadata: sessionMetadata,
          customer: custId,
        }
      );

      // Update user with stripe_id
      await supabase.auth.updateUser({
        data: {
          stripe_customer_id: custId,
          certification: diverCert,
        },
      });

      // console.log("updated user", data);
      // console.log("updated user error", error);

      // Redirect to checkout
      const getStripe = () => {
        if (!stripePromise) {
          stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
        }
        return stripePromise;
      };
      const stripe = await getStripe();
      await stripe.redirectToCheckout({ sessionId });
    }

    createOrder()
      .then((order) => createOrderLineItems(order))
      .then((order) => createStripeCheckout(order));
  }

  async function redirectToCheckout() {
    if (!user) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup type="warning" text="Please login to complete checkout" />
        ),
      });
      return null;
    }
    // gtag.event({
    //   action: "start-stripe-checkout",
    //   category: "button",
    //   label: "Stripe Checkout Start",
    //   // value:
    // });
    checkout();
  }

  return (
    <Button
      variant="darkBrand"
      fontSize="sm"
      borderRadius="16px"
      w={{ base: "128px", md: "148px" }}
      h="46px"
      onClick={
        user ? () => redirectToCheckout() : () => router.push("/auth/login")
      }
    >
      {user ? "Go to Payment" : "Login to Checkout"}
    </Button>
  );
}
