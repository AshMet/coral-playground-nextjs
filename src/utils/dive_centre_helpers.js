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
  return diveTrips.filter((trip) => trip.start_date === null);
};

export const getCalendarDives = (diveTrips) => {
  return diveTrips
    .filter((trip) => trip.start_date !== null)
    .map((trip) => ({
      title: trip.name,
      borderColor: "transparent",
      start: combineDateAndTime(trip.start_date, trip.start_time, 0),
      // start_time: trip.start_time,
      end: combineDateAndTime(trip.start_date, trip.start_time, trip.duration),
      // endTime: combineDateAndTime(trip.start_date, trip.start_time, 8),
      allDay: false,
      backgroundColor: "#7551FF",
      className: "info",
    }));
};
