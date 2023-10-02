import { RRule } from "rrule";

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
    case "daily":
      return RRule.DAILY;
    case "weekly":
      return RRule.WEEKLY;
    case "monthly":
      return RRule.MONTHLY;
    case "once":
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

// export const getRrule = (trip) => {
//   const rule = new RRule({
//     freq: getRruleFreq(trip.frequency),
//     byweekday: getRruleDays(trip.recurDays || []),
//     tzid: trip.timezone,
//     dtstart: trip.startDate,
//     until: trip.recurEndDate,
//     ...(trip.frequency === "One Time" && { interval: 1 }),
//   });
//   return rule.all();
// };

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
