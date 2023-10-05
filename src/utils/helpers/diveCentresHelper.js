/* eslint-disable @typescript-eslint/no-unused-expressions */
import { datetime, RRule, RRuleSet } from "rrule";

export const today = new Date();
export const in3Months = new Date(
  new Date().setMonth(new Date().getMonth() + 3)
);

export const combineDateAndTime = (date, time, duration = 0) => {
  const formattedDate = new Date(date);
  // console.log("date", formattedDate);
  const year = formattedDate.getFullYear();
  const month = formattedDate.getMonth(); // Jan is 0, dec is 11
  const day = formattedDate.getDate();
  const hours = Number(time.split(":")[0]) + duration;
  const minutes = time.split(":")[1];
  return new Date(year, month, day, hours, minutes, 0);
};

export const getRruleFreq = (freq) => {
  switch (freq) {
    case "Daily":
      return RRule.DAILY;
    case "Weekly":
      return RRule.WEEKLY;
    case "Monthly":
      return RRule.MONTHLY;
    case "One Time":
      return RRule.YEARLY;
    default:
      return RRule.MONTHLY;
  }
};

export const getRruleDays = (oldArr = []) => {
  const newArr = [];
  if (oldArr?.includes("MO")) {
    newArr.push(RRule.MO);
  }
  if (oldArr?.includes("TU")) {
    newArr.push(RRule.TU);
  }
  if (oldArr?.includes("WE")) {
    newArr.push(RRule.WE);
  }
  if (oldArr?.includes("TH")) {
    newArr.push(RRule.TH);
  }
  if (oldArr?.includes("FR")) {
    newArr.push(RRule.FR);
  }
  if (oldArr?.includes("SA")) {
    newArr.push(RRule.SA);
  }
  if (oldArr?.includes("SU")) {
    newArr.push(RRule.SU);
  }
  return newArr;
};

export const getTileColor = ({ date, view }, tripRules) =>
  view === "month" &&
  tripRules
    ?.map((item) => new Date(item).toISOString().split("T")[0])
    .includes(new Date(date).toISOString().split("T")[0])
    ? "trip-calendar-selectable"
    : "trip-calendar-nonselectable";

export const getDisabledTiles = ({ date }, tripRules) =>
  !tripRules
    ?.map((item) => new Date(item).toISOString().split("T")[0])
    .includes(new Date(date).toISOString().split("T")[0]);

// const getTileContent = ({ date, view }) =>
//   view === "month" &&
//   tripsRule
//     .map((item) => new Date(item).toISOString().split("T")[0])
//     .includes(new Date(date).toISOString().split("T")[0]) ? (
//     <StatusIndicator />
//   ) : null;

export const getRRule = (trip, options) =>
  new RRule({
    ...options,
    freq: getRruleFreq(trip.frequency),
    byweekday: getRruleDays(trip.recurDays),
    tzid: trip.timezone,
    dtstart: new Date(trip.startDate ? trip.startDate : today),
    until: new Date(trip.recurEndDate ? trip.recurEndDate : in3Months),
    ...(trip.frequency === "One Time" && { interval: 1 }),
  });
const getGenericRRule = (trip, range, options) =>
  new RRule({
    ...options,
    freq: RRule.DAILY,
    tzid: trip.timezone,
    dtstart: new Date(today),
    until: new Date(in3Months),
  });

export const getFilteredRules = (trip, range) => {
  const ruleSet = new RRuleSet();
  const start = new Date(range ? range[0] : today);
  const end = new Date(range ? range[1] : in3Months);
  const filterStart = datetime(
    start.getFullYear(),
    start.getMonth() + 1,
    start.getDate()
  );
  const filterEnd = datetime(
    end.getFullYear(),
    end.getMonth() + 1,
    end.getDate()
  );
  trip.generic
    ? ruleSet.rrule(getGenericRRule(trip, {}))
    : ruleSet.rrule(getRRule(trip, {}));
  return ruleSet.between(filterStart, filterEnd);
};

export const getGenericDives = (diveTrips) => {
  return diveTrips?.filter((trip) => trip.generic === true);
};

export const getCalendarDives = (diveTrips) => {
  // const today = new Date();
  // const in6Months = new Date(today.setMonth(today.getMonth() + 3));

  return diveTrips?.length > 0
    ? diveTrips
        ?.filter((trip) => trip.generic === false)
        .map((trip) => ({
          title: trip.name,
          borderColor: "transparent",
          // start: combineDateAndTime(trip.start_date, trip.start_time, 0),
          // start_time: trip.start_time,
          // end: combineDateAndTime(
          //   trip.start_date,
          //   trip.start_time,
          //   trip.duration
          // ),
          // endTime: combineDateAndTime(trip.start_date, trip.start_time, 8),
          allDay: false,
          // backgroundColor: trip.frequency === "Daily" ? "#7551FF" : "#435345",
          className: trip.frequency === "Daily" ? "info" : "",
          duration: trip.duration,
          // url: `${process.env.NEXT_PUBLIC_SITE_URL}/dive_trips/${trip.slug}`,
          rrule: {
            freq: trip.frequency === "One Time" ? "Yearly" : trip.frequency,
            tzid: trip.timezone,
            byweekday: trip.recur_days || trip.recurDays || [],
            dtstart: combineDateAndTime(
              trip.start_date || trip.startDate,
              trip.start_time || trip.startTime,
              0
            ), // will also accept '20120201T103000'
            until: trip.recur_end_date || trip.recurEndDate,
            // count: 30,
            // interval: 1,
            // tileDisabled: () => new Date(2023, 10, 10),
            ...(trip.frequency === "One Time" && { count: 1 }),
          },
        }))
    : [];
};
