/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Tooltip, useToast } from "@chakra-ui/react";
import { createContext, useState, useEffect } from "react";

import AlertPopup from "../components/alerts/AlertPopup";
import checkout from "components/pages/diving/checkout";
import equipment from "lib/constants/equipment.json";
import * as gtag from "lib/data/gtag";

export const DivingContext = createContext();

export const DivingProvider = ({ children }) => {
  const [diverName, setDiverName] = useState();
  const [diverEmail, setDiverEmail] = useState();
  const [diverCert, setDiverCert] = useState();
  const [lastDive, setLastDive] = useState();
  const [notes, setNotes] = useState();
  const initialState = [];
  const [equipmentList, setEquipmentList] = useState([]);
  const [cartItems, setCartItems] = useState(initialState);

  const toast = useToast();

  // Local Storage: setting & getting data
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cartItems"));
    // console.log("localStorage1", localStorage);
    // console.log("cartData", cartData);
    if (cartData) {
      setCartItems(cartData);
    }
  }, []);

  useEffect(() => {
    if (cartItems !== initialState) {
      typeof window !== "undefined"
        ? localStorage.setItem("cartItems", JSON.stringify(cartItems))
        : null;
    }
  }, [cartItems]);

  // Add items to cart
  function addToCart(newItem) {
    const alreadyInCart = cartItems.some(
      (item) => item.name + item.id === newItem.name + newItem.id
    );
    console.log("newItem", newItem);
    if (alreadyInCart) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="warning"
            text="Item was already added"
            subtext="Select a different dive"
          />
        ),
      });
      return;
    }
    // if (!(newItem.diveDate instanceof Date) || newItem.diveDate !== null) {
    if (isNaN(newItem.diveDate.getTime())) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="warning"
            text="No Date Provided"
            subtext="Please select a date before adding your dive"
          />
        ),
      });
      return;
    }
    if (!newItem.title) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="warning"
            text="No Course Selected"
            subtext="Please select a course before adding to cart"
          />
        ),
      });
      return;
    }
    if (!newItem.centreName) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="warning"
            text="No Dive Centre Selected"
            subtext="Please select a dive centre before adding to cart"
          />
        ),
      });
      return;
    }

    setCartItems((prevItems) => [...prevItems, newItem]);
    toast({
      position: "top",
      render: () => (
        <AlertPopup
          type="success"
          text={`Dive Added: ${newItem.title}`}
          subtext="View Shopping Cart to complete your order"
        />
      ),
    });
    gtag.event({
      action: "add-to-cart",
      category: "button",
      label: "Add item to cart",
      value: newItem.title,
    });
  }

  // Remove from Cart
  function removeFromCart(id, name) {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast({
      position: "top",
      render: () => (
        <AlertPopup type="success" text="Item Removed" subtext={name} />
      ),
    });
  }

  // Clear Cart
  function clearCart() {
    setCartItems(initialState);
    typeof window !== "undefined"
      ? localStorage.setItem("cartItems", "[]")
      : null;
    toast({
      position: "top",
      render: () => <AlertPopup type="success" text="Cart Cleared" />,
    });
  }

  // Create Stripe line items
  const lineItems = cartItems.map((item) => {
    // console.log("line item", item);
    return {
      price: item.priceId,
      quantity: 1,
    };
  });

  equipmentList.forEach((item) => {
    // console.log("line item", item);
    lineItems.push({
      price: item.priceId,
      quantity: 1,
    });
  });

  const custMetadata = {
    diverCert,
    lastDive,
    notes,
  };

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

  const sessionMetadata = { ...cartMetadata, ...equipmentMetadata };

  // console.log(equipmentList);
  // console.log("context dives", { ...cartItems });
  // console.log("context sessionMetadata", sessionMetadata);

  const redirectToCheckout = async () => {
    gtag.event({
      action: "start-stripe-checkout",
      category: "button",
      label: "Stripe Checkout Start",
      // value:
    });
    checkout({
      lineItems,
      equipmentList,
      diverName,
      diverEmail,
      custMetadata,
      sessionMetadata,
    });
  };

  return (
    <DivingContext.Provider
      value={{
        diverName,
        setDiverName,
        diverEmail,
        setDiverEmail,
        diverCert,
        setDiverCert,
        lastDive,
        setLastDive,
        notes,
        setNotes,
        equipmentList,
        setEquipmentList,
        redirectToCheckout,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </DivingContext.Provider>
  );
};
