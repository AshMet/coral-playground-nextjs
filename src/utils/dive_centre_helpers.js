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

export const getDailyDives = (diveTrips) => {
  return diveTrips?.filter((trip) => trip.start_date === null);
};

export const getCalendarDives = (diveTrips) => {
  // .filter((trip) => trip.start_date !== null)
  return diveTrips?.length > 0
    ? diveTrips?.map((trip) => ({
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
        backgroundColor: "#7551FF",
        // className: "info",
        duration: trip.dur,
        // url: `${process.env.NEXT_PUBLIC_SITE_URL}/dive_trips/${trip.slug}`,
        rrule: {
          freq: trip.frequency === "One Time" ? "Yearly" : trip.frequency,
          count: trip.frequency === "One Time" ? 1 : trip.recur_count,
          tzid: "Africa/Cairo",
          // byweekday: ["mo", "fr"],
          dtstart: combineDateAndTime(trip.start_date, trip.start_time, 0), // will also accept '20120201T103000'
          // until: "2023-11-08", // will also accept '20120201'
          tileDisabled: () => new Date(2023, 10, 10),
        },
      }))
    : [];
};
