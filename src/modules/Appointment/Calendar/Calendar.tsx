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

const Calendar = forwardRef(
  (
    { initialEvents, handleOnDateSelect, handleOnEventClick }: CalendarProps,
    ref: LegacyRef<FullCalendar> | undefined
  ) => {
    const theme = useTheme();
    const shadowMedium = theme.shadows[5];

    const renderEventContent = (eventContent: EventContentArg) => {
      return (
        <>
          <b>{eventContent.timeText}</b>
          <i>{eventContent.event.title}</i>
        </>
      );
    };

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
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          initialEvents={initialEvents}
          select={handleOnDateSelect}
          eventContent={renderEventContent}
          eventClick={handleOnEventClick}
        />
      </Paper>
    );
  }
);

export default Calendar;