import { Box, Button, Container, Stack, SvgIcon } from "@mui/material";
import { DateSelectArg, EventClickArg, EventInput } from "@fullcalendar/core";
import { Helmet } from "react-helmet";
import Calendar from "./Calendar";
import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { INITIAL_EVENTS } from "./event-utils";
import { Add } from "@mui/icons-material";
import EventModal from "../../../modals/EventModal";
import moment from "moment";
import { OperationEvent } from "../../../constants";
import { EventImpl } from "@fullcalendar/core/internal";
import {
  getAppointmentById,
  createAppointment,
} from "../../../services/appointment.service";

const defaultEventInput: EventInput = {
  type: OperationEvent.ADD,
  title: "",
  description: "",
  start: moment().format(),
  end: moment().format(),
  allDay: false,
  eventImpl: null,
};

const CalendarModule = () => {
  //SET appointment
  const [appointment, setAppointment] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [events, setEvents] = useState<EventInput[]>([]);
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] =
    useState<EventInput>(defaultEventInput);

  const calendarRef = useRef<FullCalendar | null>(null);

  useEffect(() => {
    setEvents(INITIAL_EVENTS);
    setIsloading(true);
    //GET appointment by ID
    const fetchAppointmentById = async () => {
      try {
        const appointment = await getAppointmentById(
          "65e1ee5b6f2427e980093f31"
        );
        setAppointment(appointment);
      } catch (error) {
        console.log(error);
      }
    };


    fetchAppointmentById();
    // createAppointmentEvent();
  }, []);

  const handleOnCreateEvent = () => {
    setShowEventModal(true);
  };

  const handleOnConfirmEvent = async (event: EventInput) => {
    //TO DO: typescript interface
    const payload = {
      title: event.title,
      description: event.description,
      startDate: event.start,
      endDate: event.end,
      author: "Tomas Popescu",
    };

    //Start loding
    try {
      await createAppointment(payload);
      // setAppointment(appointment);
      calendarRef.current?.getApi().addEvent(event);
      setShowEventModal(false);
      setCurrentEvent(defaultEventInput);
    } catch (error) {
      console.log(error);
    }
    //End loding
    // console.log("right before add", event);
    // calendarRef.current?.getApi().addEvent(event);
    // setShowEventModal(false);
    // setCurrentEvent(defaultEventInput);
  };

  const handleOnRemoveEvent = (eventImpl: EventImpl) => {
    setShowEventModal(false);
    setCurrentEvent(defaultEventInput);
    eventImpl.remove();
  };

  const handleOnUpdateEvent = (event: EventImpl, newEventInfo: EventInput) => {
    const { title, start, end, description, backgroundColor } = newEventInfo;

    setShowEventModal(false);
    setCurrentEvent(defaultEventInput);
    event.setProp("title", title);
    event.setExtendedProp("description", description);
    event.setStart(start!);
    event.setEnd(end!);
    event.setProp("backgroundColor", backgroundColor);
  };

  const handleOnDateSelect = (selectInfo: DateSelectArg) => {
    const calendarApi = selectInfo.view.calendar;
    const { startStr, endStr, allDay } = selectInfo;

    calendarApi.unselect();

    const newEvent: EventInput = {
      ...defaultEventInput,
      start: startStr,
      end: endStr,
      allDay,
    };

    setCurrentEvent(newEvent);
    setShowEventModal(true);
  };

  const handleOnEventClick = (clickInfo: EventClickArg) => {
    const { title, startStr, endStr, allDay, extendedProps } = clickInfo.event;
    const { description } = extendedProps;

    const newEvent: EventInput = {
      ...defaultEventInput,
      type: OperationEvent.EDIT,
      eventImpl: clickInfo.event,
      title,
      description,
      start: startStr,
      end: endStr,
      allDay,
    };

    setCurrentEvent(newEvent);
    setShowEventModal(true);
  };

  if (!isLoading) {
    // TODO: Add Loading spin
    return <span>loading</span>;
  }

  return (
    <>
      <Helmet>
        <title>Calendar</title>
      </Helmet>
      {JSON.stringify({ appointment })}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 10,
          pb: 10,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={2}>
            <Stack
              display="flex"
              justifyContent="flex-end"
              sx={{
                flexDirection: "row",
              }}
            >
              <Stack direction="row" spacing={1}>
                <Button variant="contained" onClick={handleOnCreateEvent}>
                  <SvgIcon fontSize="small">
                    <Add />
                  </SvgIcon>
                  New Event
                </Button>
              </Stack>
            </Stack>
            <Calendar
              handleOnEventClick={handleOnEventClick}
              handleOnDateSelect={handleOnDateSelect}
              initialEvents={events}
              ref={calendarRef}
            />
          </Stack>
          <EventModal
            open={showEventModal}
            event={currentEvent}
            handleOnClose={() => setShowEventModal(false)}
            handleOnConfirm={handleOnConfirmEvent}
            handleOnRemove={handleOnRemoveEvent}
            handleOnUpdate={handleOnUpdateEvent}
          />
        </Container>
      </Box>
    </>
  );
};

export default CalendarModule;