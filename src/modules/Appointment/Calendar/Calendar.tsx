import { forwardRef, LegacyRef } from "react";
import {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventInput,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Paper, useTheme } from "@mui/material";
import "./index.css";

interface CalendarProps {
  initialEvents: EventInput[];
  handleOnDateSelect: (selectInfo: DateSelectArg) => void;
  handleOnEventClick: (clickInfo: EventClickArg) => void;
}

const renderEventContent = ({
  timeText,
  event: { title },
}: EventContentArg) => {
  // TODO: This is where you style the event eg. 3ad
  // const startDate = start;
  // const formattedStartDate = startDate.toLocaleDateString('en-US', {
  //   weekday: 'long',
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric'
  // });
  console.log(timeText);
  return (
    <>
      {/* <b>{timeText}</b> */}
      <i>{title}</i>
    </>
  );
};

const Calendar = forwardRef(
  (
    { initialEvents, handleOnDateSelect, handleOnEventClick }: CalendarProps,
    ref: LegacyRef<FullCalendar> | undefined
  ) => {
    const theme = useTheme();
    const shadowMedium = theme.shadows[5];

    return (
      <Paper
        elevation={1}
        sx={{
          backgroundColor: "white",
          color: "neutral.900",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          boxShadow: shadowMedium,
          backgroundImage: "none",
          overflow: "hidden",
          borderRadius: "20px",
        }}
      >
        <FullCalendar
          ref={ref}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            start: "title",
            center: "prev,next today",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          businessHours={{
            // days of week. an array of zero-based day of week integers (0=Sunday)
            daysOfWeek: [1, 2, 3, 4, 5], // Monday - Thursday
            startTime: "10:00", // a start time (10am in this example)
            endTime: "18:00", // an end time (6pm in this example)
          }}
          allDaySlot={false}
          slotMinTime={"10:00:00"}
          slotMaxTime={"18:00:00"}
          height={"auto"}
          scrollTime={"10:00:00"}
          hiddenDays={[0, 6]}
          initialView="timeGridWeek"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={initialEvents}
          select={handleOnDateSelect}
          eventContent={renderEventContent}
          eventClick={handleOnEventClick}
        />
      </Paper>
    );
  }
);

export default Calendar;
