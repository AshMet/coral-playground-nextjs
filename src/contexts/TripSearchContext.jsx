/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { createContext, useState, useEffect, useMemo } from "react";

export const TripSearchContext = createContext();

export const TripSearchProvider = ({ children }) => {
  const today = new Date();
  const nextMonth = new Date(today.setMonth(today.getMonth() + 3));
  const [dateRange, onChange] = useState([new Date(), nextMonth]);

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

  const filterByDateRange = useMemo(() => {
    return (trips, range) => {
      const start = new Date();
      const end = new Date(today.setMonth(today.getMonth() + 3));
      if (!trips) return null;

      return trips
        .filter((trip) => trip?.startDate !== null)
        .filter(
          (trip) =>
            new Date(trip?.startDate).getTime() >=
              new Date(dateRange ? range[0] : start).getTime() &&
            new Date(trip?.startDate).getTime() <=
              new Date(dateRange ? range[1] : end).getTime()
        );
    };
  });

  const filterByCity = useMemo(() => {
    return (trips, city) => {
      if (!trips) return null;
      if (city === 0 || city === "All Cities") {
        return trips;
      }
      if (trips[0].diveCentreCity) {
        return trips.filter((trip) => trip.diveCentreCity === city);
      }
      if (trips[0].city) {
        return trips.filter((trip) => trip.city === city);
      }
      return trips.filter((trip) => trip.city === city);
    };
  });

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
      filterByDateRange,
      filterByCity,
    }),
    [dateRange, setDateRange]
  );

  return (
    <TripSearchContext.Provider value={searchParams}>
      {children}
    </TripSearchContext.Provider>
  );
};
