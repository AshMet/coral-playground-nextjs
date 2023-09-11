/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import rrulePlugin from "@fullcalendar/rrule";

function EventCalendar(props) {
  const { initialDate, calendarDives } = props;

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, rrulePlugin]}
      headerToolbar={{
        start: "today prev next",
        center: "title",
        end: "dayGridMonth dayGridWeek dayGridDay",
      }}
      initialView="dayGridMonth"
      views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
      contentHeight="600px"
      events={calendarDives}
      initialDate={initialDate}
      editable
      minHeight="400px"
      height="100%"
      slotWidth={10}
      customIcons={false}
    />
  );
}

export default EventCalendar;
