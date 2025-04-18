/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { useToast } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import { usePostHog } from "posthog-js/react";
import { createContext, useState, useEffect } from "react";

import AlertPopup from "../components/alerts/AlertPopup";
// import equipment from "lib/constants/equipment.json";
// import * as gtag from "lib/data/gtag";
import * as sendinblue from "lib/data/sendinblue";
import { createDateTimeFromPicker } from "utils/helpers/diveCentresHelper";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [diverName, setDiverName] = useState();
  const [diverEmail, setDiverEmail] = useState();
  const [diverCert, setDiverCert] = useState("Open Water");
  const [lastDive, setLastDive] = useState("6 months");
  const [notes, setNotes] = useState();
  const [equipmentList, setEquipmentList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const toast = useToast();
  const posthog = usePostHog();
  const user = useUser();

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
    if (cartItems !== []) {
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

    const tripDate = createDateTimeFromPicker(
      newItem.startDate,
      newItem.startTime,
      "Africa/Cairo",
      { hours: 0 }
    );

    // console.log("newItem", newItem);
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
    // if (!(newItem.startDate instanceof Date) || newItem.startDate !== null) {
    if (!isNaN(tripDate) && newItem.itemType === "diveTrip") {
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
          text={`Item Added: ${newItem.title}`}
          subtext="View Shopping Cart to complete your order"
        />
      ),
    });
    // gtag.event({
    //   action: "add-to-cart",
    //   category: "button",
    //   label: "Add item to cart",
    //   value: newItem.title,
    // });
    posthog.capture("Added Item to cart", {
      Item: newItem.title,
      type: newItem.itemType,
      "Dive Centre": newItem.centreName,
    });
    sendinblue.track("add-to-cart", {
      EMAIL: user?.email,
      FIRSTNAME: user?.user_metadata.first_name,
      LASTNAME: user?.user_metadata.last_name,
    });
  }

  // Remove from Cart
  function removeFromCart(cartItem) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== cartItem.id)
    );
    toast({
      position: "top",
      render: () => (
        <AlertPopup
          type="success"
          text="Item Removed"
          subtext={cartItem.title}
        />
      ),
    });
    posthog.capture("Removed Item from cart", {
      Item: cartItem.title,
      type: cartItem.itemType,
      "Dive Centre": cartItem.centreName,
    });
  }

  // Clear Cart
  function clearCart() {
    setCartItems([]);
    typeof window !== "undefined"
      ? localStorage.setItem("cartItems", "[]")
      : null;
    toast({
      position: "top",
      render: () => <AlertPopup type="success" text="Cart Cleared" />,
    });
  }

  // console.log("equipmentList", equipmentList);
  // console.log("cartItems", cartItems);
  // console.log("context sessionMetadata", sessionMetadata);

  return (
    <CartContext.Provider
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
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
