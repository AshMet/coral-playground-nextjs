/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { useRouter } from "next/router";
import { createContext, useState, useEffect, useMemo } from "react";

export const TripSearchContext = createContext();

export const TripSearchProvider = ({ children }) => {
  const router = useRouter();

  const today = new Date();
  const nextMonth = new Date(today.setMonth(today.getMonth() + 5));
  const [dateRange, onChange] = useState(
    router.query.length > 0 ? router.query : [new Date(), nextMonth]
  );

  const setDateRange = useMemo(() => {
    return (newDate) => {
      // setStartDate(newDate[0]);
      // setEndDate(newDate[1]);
      onChange(newDate);
      typeof window !== "undefined"
        ? localStorage.setItem("dateRange", newDate)
        : null;
    };
  }, []);

  // Local Storage: setting & getting data
  useEffect(() => {
    const dateData = JSON.parse(localStorage.getItem("dateRange"));
    // console.log("localStorage1", localStorage);
    if (dateData) {
      setDateRange(dateData);
    }
  }, []);

  useEffect(() => {
    if (dateRange !== []) {
      typeof window !== "undefined"
        ? localStorage.setItem("dateRange", JSON.stringify(dateRange))
        : null;
    }
  }, [dateRange]);

  const searchParams = useMemo(
    () => ({
      // city,
      // setCity,
      dateRange,
      setDateRange,
    }),
    [dateRange, setDateRange]
  );

  return (
    <TripSearchContext.Provider value={searchParams}>
      {children}
    </TripSearchContext.Provider>
  );
};
