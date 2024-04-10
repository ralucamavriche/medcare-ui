import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Stack,
  useTheme,
  SvgIcon,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DateInput, EventInput } from "@fullcalendar/core";
import { Delete } from "@mui/icons-material";
import { OperationEvent } from "../../constants";
import { EventImpl } from "@fullcalendar/core/internal";

interface EventModalProps {
  event: EventInput;
  open: boolean;
  handleOnConfirm: (event: EventInput) => void;
  handleOnClose: () => void;
  handleOnRemove: (event: EventImpl) => void;
  handleOnUpdate: (event: EventImpl, newEvent: EventInput) => void;
}
interface InitialValuesProps {
  title: string;
  description: string;
  start: DateInput;
  end: DateInput;
}

const initialValues: InitialValuesProps = {
  title: "",
  description: "",
  start: moment().format(),
  end: moment().format(),
};

const EventModal = ({
  open,
  event,
  handleOnClose,
  handleOnConfirm,
  handleOnRemove,
  handleOnUpdate,
}: EventModalProps) => {
  const theme = useTheme();
  const shadowMedium = theme.shadows[5];
  const backgroundColorEvent = theme.palette;

  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    setValues({
      title: event.title!,
      description: event.description,
      start: event.start!,
      end: event.end!,
    });
  }, [event]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    p: 4,
    borderRadius: "20px",
    boxShadow: shadowMedium,
  };

  const onConfirm = () => {
    const { title, start, description, end } = values;

    const event: EventInput = {
      title,
      start,
      description,
      end,
      color: "white",
      backgroundColor: backgroundColorEvent.warning.main,
    };

    handleOnConfirm(event);
    setValues(initialValues);
  };

  const onUpdate = () => {
    const { title, start, description, end } = values;

    const newEvent: EventInput = {
      title,
      start,
      description,
      end,
      backgroundColor: backgroundColorEvent.error.main,
    };

    handleOnUpdate(event.eventImpl, newEvent);
    setValues(initialValues);
  };

  const { title, start, description, end } = values;

  return (
    <Modal
      open={open}
      onClose={handleOnClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          variant="h5"
          sx={{
            mb: 5,
            mt: 2,
            textAlign: "center",
          }}
        >
          {event.type === OperationEvent.ADD ? "Add Event" : "Edit Event"}
        </Typography>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={title}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) =>
              setValues({
                ...values,
                title: event.target.value,
              })
            }
            type="text"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={description}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) =>
              setValues({
                ...values,
                description: event.target.value,
              })
            }
            type="text"
          />
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              value={start ? moment(start) : moment()}
              onChange={(data) => {
                const newDate = data ? data.format() : moment().format();
                setValues({
                  ...values,
                  start: newDate,
                });
              }}
              label="Start Date"
            />
          </DemoContainer>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              value={end ? moment(end) : moment()}
              onChange={(data) => {
                const newDate = data ? data.format() : moment().format();
                setValues({
                  ...values,
                  start: newDate,
                });
              }}
              label="End Date"
            />
          </DemoContainer>

          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            {event.type === OperationEvent.EDIT && (
              <Button onClick={() => handleOnRemove(event.eventImpl)}>
                <SvgIcon fontSize="medium">
                  <Delete />
                </SvgIcon>
              </Button>
            )}
            <Stack direction="row" spacing={2}>
              <Button onClick={handleOnClose}>Cancel</Button>
              <Button
                variant="contained"
                onClick={
                  event.type === OperationEvent.ADD ? onConfirm : onUpdate
                }
              >
                Confirm
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EventModal;
