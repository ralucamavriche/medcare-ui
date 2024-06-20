import { useEffect, useRef, useState } from "react";
import { Box, Button, Stack, SvgIcon } from "@mui/material";
import { DateSelectArg, EventClickArg, EventInput } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import { toast } from "react-toastify";
import { Add } from "@mui/icons-material";
import { EventImpl } from "@fullcalendar/core/internal";

import Calendar from "./Calendar";
import EventModal from "../../../modals/EventModal";
import { AppointmentService } from "../../../services";
import Spinner from "../../../components/Spinner/Spinner";
import useAuth from "../../../hooks/useAuth";
import { RequestAppointment } from "../../../types/dto/appointment";
import {
  OperationEvent,
  REQUEST_STATUSES,
} from "../../../constants/common.constants";
import { ROLES } from "../../../permissions";
import moment from "moment";

const BACKGROUND_COLOR_BASED_ON_STATUS = {
  [REQUEST_STATUSES.PENDING]: {
    backgroundColor: "#FFA500",
    borderColor: "#FFA500",
    textColor: "white",
  },
  [REQUEST_STATUSES.REJECTED]: {
    backgroundColor: "red",
    borderColor: "red",
    textColor: "white",
  },
  [REQUEST_STATUSES.ACCEPTED]: {
    backgroundColor: "green",
    borderColor: "green",
    textColor: "white",
  },
  [REQUEST_STATUSES.NOT_SENT]: {
    backgroundColor: "green",
    borderColor: "green",
    textColor: "white",
  },
  [REQUEST_STATUSES.SENT]: {
    backgroundColor: "green",
    borderColor: "green",
    textColor: "white",
  },
};

const DEFAULT_EVENT_INPUT: EventInput = {
  type: OperationEvent.ADD,
  title: "",
  description: "",
  allDay: false,
  eventImpl: null,
};

const CalendarModule = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [events, setEvents] = useState<EventInput[] | null>(null);
  const [currentEvent, setCurrentEvent] =
    useState<EventInput>(DEFAULT_EVENT_INPUT);

  const calendarRef = useRef<FullCalendar | null>(null);

  const { firstName, lastName, role } = user || {};

  const userId = user?.id;
  const doctorId = user?.doctorId;
  const isDoctor = role === ROLES.DOCTOR;
  const isPatient = role === ROLES.PATIENT;

  useEffect(() => {
    setIsLoading(true);
    const fetchAppointments = async (id: string, isDoctor: boolean) => {
      try {
        const serviceFunction = isDoctor
          ? AppointmentService.getAppointmentsByDoctorId
          : AppointmentService.getAppointmentsByUserId;

        const appointments = await serviceFunction(id);

        const formattedAppointments: Partial<EventInput>[] = appointments.map(
          ({ id, title, startDate, endDate, description, status, userId }) => ({
            id,
            title,
            start: startDate,
            end: endDate,
            description,
            status,
            userId: userId.id,
            userName: `${userId.firstName} ${userId.lastName}`,
            ...BACKGROUND_COLOR_BASED_ON_STATUS[status as REQUEST_STATUSES],
          })
        );

        setEvents(formattedAppointments);
      } catch (error) {
        setEvents([]);
        console.error(
          `Failed to fetch appointments in calendarModule: ${
            (error as Error)?.message
          }`
        );
        toast.error(`Something went wrong:  ${(error as Error)?.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    userId && fetchAppointments(userId, isDoctor);
  }, [userId, isDoctor]);

  const handleOnCreateEvent = async (event: EventInput) => {
    const payload: RequestAppointment = {
      title: event.title || "",
      description: event.description,
      startDate: event.start,
      endDate: event.end,
      userId: userId,
      doctorId: doctorId,
      status: REQUEST_STATUSES.PENDING,
    };

    const eventStyle =
      BACKGROUND_COLOR_BASED_ON_STATUS[REQUEST_STATUSES.PENDING];
    const { backgroundColor, borderColor, textColor } = eventStyle;

    event.backgroundColor = backgroundColor;
    event.borderColor = borderColor;
    event.textColor = textColor;

    try {
      const appointment = await AppointmentService.createAppointment(payload);
      event.id = appointment.id;

      calendarRef.current?.getApi().addEvent({
        ...event,
        start: moment(event.start).utc().format(),
        end: moment(event.end).utc().format(),
      });
      setShowEventModal(false);
      setCurrentEvent(DEFAULT_EVENT_INPUT);
      toast.success("Appointment Successfully created!");
    } catch (error) {
      console.error(
        `Failed to AppointmentService.createAppointment: ${
          (error as Error)?.message
        }`
      );
      toast.error(
        `Failed to create the appointment! ${(error as Error)?.message}`
      );
    }
  };

  const handleOnUpdateEvent = async (
    eventImpl: EventImpl,
    eventInput: EventInput
  ) => {
    const { id } = eventImpl;
    const { title, start, end, description } = eventInput;

    try {
      if (!id) {
        throw new Error("Id not defined");
      }

      const status = REQUEST_STATUSES.PENDING;
      const payload: RequestAppointment = {
        title: eventInput.title || "",
        description: eventInput.description,
        startDate: eventInput.start,
        endDate: eventInput.end,
        author: `${firstName} ${lastName}`,
        status: status,
      };
      await AppointmentService.updateAppointment(id, payload);

      eventImpl.setProp("title", title);
      eventImpl.setExtendedProp("description", description);
      eventImpl.setStart(start!);
      eventImpl.setEnd(end!);
      eventImpl.setProp(
        "backgroundColor",
        BACKGROUND_COLOR_BASED_ON_STATUS[status]
      );

      setShowEventModal(false);
      toast.success("Appointment Successfully updated!");
    } catch (error) {
      console.error(
        `Failed to update the appointment: ${(error as Error)?.message}`
      );
      toast.error(
        `Failed to update the appointment: ${(error as Error)?.message}`
      );
    } finally {
    }
  };

  const handleOnRemoveEvent = async (eventImpl: EventImpl) => {
    const { id } = eventImpl;

    try {
      if (!id) {
        throw new Error("Id not found");
      }

      await AppointmentService.deleteAppointment(id);

      eventImpl.remove();

      setShowEventModal(false);
      toast.success("Appointment Successfully deleted!");
    } catch (error) {
      console.error(
        `Failed to delete the appointment: ${(error as Error)?.message}`
      );
      toast.error(
        `Failed to delete the appointment: ${(error as Error)?.message}`
      );
    }
  };

  const handleOnDateSelect = (selectInfo: DateSelectArg) => {
    if (!isPatient) {
      return;
    }

    const calendarApi = selectInfo.view.calendar;
    const { startStr, endStr, allDay } = selectInfo;

    calendarApi.unselect();

    const newEvent: EventInput = {
      ...DEFAULT_EVENT_INPUT,
      start: startStr,
      end: endStr,
      allDay,
    };

    setCurrentEvent(newEvent);
    setShowEventModal(true);
  };

  const handleOnEventClick = (clickInfo: EventClickArg) => {
    console.log(clickInfo.event);
    const { title, startStr, endStr, allDay, extendedProps } = clickInfo.event;
    const { description } = extendedProps;

    const newEvent: EventInput = {
      ...DEFAULT_EVENT_INPUT,
      type: isDoctor ? OperationEvent.MANANGE : OperationEvent.EDIT,
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

  const handleOnManage = async (
    eventImpl: EventImpl,
    status: REQUEST_STATUSES
  ) => {
    const { id } = eventImpl;

    try {
      if (!id) {
        throw new Error("Id not defined");
      }

      const payload: RequestAppointment = {
        status,
      };

      await AppointmentService.updateAppointment(id, payload);

      const eventStyle = BACKGROUND_COLOR_BASED_ON_STATUS[status];
      const { backgroundColor, borderColor, textColor } = eventStyle;

      eventImpl.setProp("backgroundColor", backgroundColor);
      eventImpl.setProp("borderColor", borderColor);
      eventImpl.setProp("textColor", textColor);
      eventImpl.setExtendedProp("status", status);

      setShowEventModal(false);
      toast.success(
        `Appointment Successfully ${
          status === REQUEST_STATUSES.ACCEPTED ? "Accepted" : "Rejected"
        }!`
      );
    } catch (error) {
      console.error(
        `Failed to manage the appointment: ${(error as Error)?.message}`
      );
      toast.error(
        `Failed to manage the appointment: ${(error as Error)?.message}`
      );
    }
  };

  if (isLoading || !events) {
    return <Spinner />;
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        pt: 1,
        pb: 10,
      }}
    >
      <>
        <Stack spacing={2}>
          <Stack
            display="flex"
            justifyContent="flex-end"
            sx={{
              flexDirection: "row",
            }}
          >
            {isPatient && (
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  onClick={() => setShowEventModal(true)}
                >
                  <SvgIcon fontSize="small">
                    <Add />
                  </SvgIcon>
                  New Event
                </Button>
              </Stack>
            )}
          </Stack>
          <Calendar
            handleOnEventClick={handleOnEventClick}
            handleOnDateSelect={handleOnDateSelect}
            initialEvents={events}
            ref={calendarRef}
          />
        </Stack>
        {showEventModal && (
          <EventModal
            open={showEventModal}
            event={currentEvent}
            handleOnClose={() => {
              setShowEventModal(false);
              setCurrentEvent(DEFAULT_EVENT_INPUT);
            }}
            handleOnManage={handleOnManage}
            handleOnCreate={handleOnCreateEvent}
            handleOnRemove={handleOnRemoveEvent}
            handleOnUpdate={handleOnUpdateEvent}
          />
        )}
      </>
    </Box>
  );
};

export default CalendarModule;
