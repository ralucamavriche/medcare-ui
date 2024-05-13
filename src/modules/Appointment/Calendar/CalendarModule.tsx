import { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Stack, SvgIcon } from "@mui/material";
import { DateSelectArg, EventClickArg, EventInput } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import { toast } from 'react-toastify';
import { Add } from "@mui/icons-material";
import moment from "moment";
import { EventImpl } from "@fullcalendar/core/internal";

import Calendar from "./Calendar";
import EventModal from "../../../modals/EventModal";
import { OperationEvent } from "../../../constants";
import { AppointmentService } from "../../../services";
import Spinner from "../../../components/Spinner/Spinner";
import useAuth from "../../../hooks/useAuth";
import { RequestAppointment } from "../../../types/dto/appointment";

const STATUSES = {
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  ACCEPTED: 'ACCEPTED'
}

const BACKGROUND_COLOR_BASED_ON_STATUS = {
  [STATUSES.PENDING]: {
    backgroundColor: '#FFA500',
    borderColor: '#FFA500',
    textColor: 'white'
  },
  [STATUSES.REJECTED]: {
    backgroundColor: 'red',
    borderColor: 'red',
    textColor: 'white'
  },
  [STATUSES.ACCEPTED]: {
    backgroundColor: 'green',
    borderColor: 'green',
    textColor: 'white'
  }
}

interface ICalendarModule {
}

const DEFAULT_EVENT_INPUT: EventInput = {
  type: OperationEvent.ADD,
  title: "",
  description: "",
  allDay: false,
  eventImpl: null,
};



const CalendarModule = (_: ICalendarModule) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [events, setEvents] = useState<EventInput[] | null>(null);
  const [currentEvent, setCurrentEvent] =
    useState<EventInput>(DEFAULT_EVENT_INPUT);

  const calendarRef = useRef<FullCalendar | null>(null);

  const { id: userId, firstName, lastName } = user || {}

  if (!userId) {
    throw new Error('User is not defined')
  }

  useEffect(() => {
    setIsLoading(true);
    const fetchApoimentsByUserId = async (userId: string) => {
      try {
        const appointments = await AppointmentService.getAppointmentsByUserId(userId);
        const status = 'PENDING'
        const formattedAppointments: Partial<EventInput>[] = appointments.map(({ id, title, startDate, endDate, description }) => ({
          id,
          title,
          start: startDate,
          end: endDate,
          description,
          status,
          ...BACKGROUND_COLOR_BASED_ON_STATUS[status]
        }))

        setEvents(formattedAppointments)
      } catch (error) {
        setEvents([])
        console.error(`Failed to AppointmentService.getAppointmentsByUserId: ${(error as Error)?.message}`);
        toast.error(`Something went wrong:  ${(error as Error)?.message}`);
      }
    }

    fetchApoimentsByUserId(userId)
  }, [userId]);

  const handleOnCreateEvent = async (event: EventInput) => {
    const payload: RequestAppointment = {
      title: event.title || '',
      description: event.description,
      startDate: event.start,
      endDate: event.end,
      author: `${firstName} ${lastName}`,
      userId: userId,
      status: 'PENDING'
    };

    try {
      // const validateTimeFrameAppointment = validateTimeRange(payload.startDate, payload.endDate);
        const appointment = await AppointmentService.createAppointment(payload);
        event.id = appointment.id

        calendarRef.current?.getApi().addEvent(event);
        setShowEventModal(false);
        setCurrentEvent(DEFAULT_EVENT_INPUT);
        toast.success("Appointment Successfully created!");

    } catch (error) {
      console.error(`Failed to AppointmentService.createAppointment: ${(error as Error)?.message}`)
      toast.error(`Failed to create the appointment! ${(error as Error)?.message}`);
    }
  };

  const handleOnUpdateEvent = async (eventImpl: EventImpl, eventInput: EventInput) => {
    const { id } = eventImpl
    const { title, start, end, description } = eventInput;

    try {
      if (!id) {
        throw new Error('Id not defined')
      }

      const status = 'REJECTED'
      const payload: RequestAppointment = {
        title: eventInput.title || '',
        description: eventInput.description,
        startDate: eventInput.start,
        endDate: eventInput.end,
        author: `${firstName} ${lastName}`,
        status: status
      };
      console.log(JSON.stringify(payload));

      await AppointmentService.updateAppointment(id, payload);

      eventImpl.setProp("title", title);
      eventImpl.setExtendedProp("description", description);
      eventImpl.setStart(start!);
      eventImpl.setEnd(end!);
      eventImpl.setProp("backgroundColor", BACKGROUND_COLOR_BASED_ON_STATUS[status]);

      setShowEventModal(false);
      toast.success("Appointment Successfully updated!");
    } catch (error) {
      console.error(`Failed to update the appointment: ${(error as Error)?.message}`)
      toast.error(`Failed to update the appointment: ${(error as Error)?.message}`);
    } finally {
    }
  };

  const handleOnRemoveEvent = async (eventImpl: EventImpl) => {
    const { id } = eventImpl

    try {
      if (!id) {
        throw new Error('Id not found')
      }

      await AppointmentService.deleteAppointment(id);

      eventImpl.remove();

      setShowEventModal(false);
      toast.success("Appointment Successfully deleted!");
    } catch (error) {
      console.error(`Failed to delete the appointment: ${(error as Error)?.message}`)
      toast.error(`Failed to delete the appointment: ${(error as Error)?.message}`);
    }

  };

  const handleOnDateSelect = (selectInfo: DateSelectArg) => {
    const calendarApi = selectInfo.view.calendar;
    const { startStr, endStr, allDay } = selectInfo;

    calendarApi.unselect();

    const newEvent: EventInput = {
      ...DEFAULT_EVENT_INPUT,
      start: startStr,
      end: endStr,
      allDay,
    };

    console.log(newEvent)

    setCurrentEvent(newEvent);
    setShowEventModal(true);
  };

  const handleOnEventClick = (clickInfo: EventClickArg) => {
    const { title, startStr, endStr, allDay, extendedProps } = clickInfo.event;
    const { description } = extendedProps;

    const newEvent: EventInput = {
      ...DEFAULT_EVENT_INPUT,
      type: OperationEvent.EDIT,
      eventImpl: clickInfo.event,
      title,
      description,
      start: startStr,
      end: endStr,
      allDay,
    };
    console.log(newEvent)

    setCurrentEvent(newEvent);
    setShowEventModal(true);
  };

  if (!isLoading || !events) {
    return <Spinner />
  }

  return (
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
              <Button variant="contained" onClick={() => setShowEventModal(true)}>
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
        {
          showEventModal && <EventModal
          open={showEventModal}
          event={currentEvent}
          handleOnClose={() => {
            setShowEventModal(false)
            setCurrentEvent(DEFAULT_EVENT_INPUT)
          }}
          handleOnCreate={handleOnCreateEvent}
          handleOnRemove={handleOnRemoveEvent}
          handleOnUpdate={handleOnUpdateEvent}
        />
        }
        
      </Container>
    </Box>
  );
};

export default CalendarModule;
