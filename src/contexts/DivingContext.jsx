/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { ethers } from "ethers";
import { createContext, useState, useEffect } from "react";
// import { useMoralis, useMoralisQuery, useMoralisWeb3Api } from "react-moralis";

import checkout from "components/pages/diving/checkout";
import equipment from "lib/constants/equipment.json";

export const DivingContext = createContext();

export const DivingProvider = ({ children }) => {
  const [diverName, setDiverName] = useState();
  const [diverEmail, setDiverEmail] = useState();
  const [diverCert, setDiverCert] = useState();
  const [lastDive, setLastDive] = useState();
  const [notes, setNotes] = useState();
  const [dives, setDives] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);

  // function toggleArrayItem(arr, item) {
  //   arr.includes(item)
  //     ? setEquipmentList(arr.filter((i) => i !== item)) // remove item
  //     : setEquipmentList([...arr, item]); // add item
  // }

  // function addDive(mapLocation, selectedDate, diveTime) {
  //   // if (!mapLocation.name || !selectedDate || !diveTime) {
  //   //   return;
  //   // }
  //   const dive = {
  //     id: mapLocation.location_id,
  //     siteName: mapLocation.name,
  //     diveDate: selectedDate,
  //     diveTime,
  //     priceId: mapLocation.stripePriceId,
  //   };

  //   const newDiveList = [dive, ...dives];
  //   setDives(newDiveList);
  // }

  // const lineItems = dives.map((dive) => {
  //   return {
  //     price: dive.priceId, // eg: "price_1KuasdfaWasdfasdfasfnsF4fi",
  //     quantity: 1,
  //   };
  // });

  const lineItems = dives.map((dive) => {
    return {
      price: "price_1LBLSVAvLPvC9h7xk0HEvL3f", // eg:, dive.priceId,
      // price_data: {
      //   unit_amount: dive.price,
      //   currency: "usd",
      //   // product: getProductId(dive.siteCount),
      //   product: dive.priceId,
      // },
      quantity: 1,
    };
  });

  const custMetadata = {
    diverCert,
    lastDive,
    notes,
  };

  // Convert dives array of objects into an object of objects, eg:
  // dive1: JSON.stringify(dives[0]),
  const sessionMetadata = dives.reduce(
    (a, v) => ({ ...a, [`dive_${v.id}`]: JSON.stringify(v) }),
    {}
  );

  // console.log(equipmentList);
  // console.log(dives);

  console.log(equipmentList);
  console.log("context dives", { ...dives });
  console.log("context sessionMetadata", sessionMetadata);

  const redirectToCheckout = async () => {
    checkout({
      lineItems,
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
        dives,
        setDives,
        // addDive,
        equipmentList,
        setEquipmentList,
        redirectToCheckout,
      }}
    >
      {children}
    </DivingContext.Provider>
  );
};
