import { useEffect, useState } from "react";
import moment from "moment";
import {
  Box,
  Button,
  Link,
  Typography,
  Modal,
  TextField,
  Stack,
  useTheme,
  SvgIcon,
} from "@mui/material";
import { useFormik } from "formik";
import * as ReactRouter from "react-router-dom";
import * as Yup from "yup";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { EventInput } from "@fullcalendar/core";
import { Delete } from "@mui/icons-material";
import { EventImpl } from "@fullcalendar/core/internal";
import { toast } from "react-toastify";
import { DateTimeValidationError } from "@mui/x-date-pickers";
import { isValidDuration } from "../../utils/date";
import {
  OperationEvent,
  REQUEST_STATUSES,
} from "../../constants/common.constants";

interface EventModalProps {
  event: EventInput;
  open: boolean;
  handleOnCreate: (event: EventInput) => void;
  handleOnClose: () => void;
  handleOnRemove: (event: EventImpl) => void;
  handleOnUpdate: (event: EventImpl, newEvent: EventInput) => void;
  handleOnManage: (event: EventImpl, status: REQUEST_STATUSES) => void;
}
interface InitialValuesProps {
  title: string;
  description: string;
  start?: any;
  end?: any;
}
interface DateErrors {
  start?: string | null;
  end?: string | null;
}

const INITIAL_VALUES: InitialValuesProps = {
  title: "",
  description: "",
};

const generateDateError = (error?: string | null) => {
  switch (error) {
    case "minDate":
    case "maxDate":
      return "Max Date reached";
    case "disablePast":
      return "Date cannot be in the past";
    case "invalidDate":
      return "Invalid Date";
    default:
      return error;
  }
};

const VALIDATION_SCHEMA = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  start: Yup.date().required("Start date is required"),
  end: Yup.date().required("End date is required"),
});

const EventModal = ({
  open,
  event,
  handleOnClose,
  handleOnCreate,
  handleOnRemove,
  handleOnUpdate,
  handleOnManage,
}: EventModalProps) => {
  const theme = useTheme();
  const shadowMedium = theme.shadows[5];
  const backgroundColorEvent = theme.palette;

  const [dateErrors, setDateErrors] = useState<DateErrors>({});
  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: async (values) => {
      try {
        console.log(values);
      } catch (error) {
        toast.error(
          `Error occured while submiting the form: ${(error as Error)?.message}`
        );
      }
    },
  });

  useEffect(() => {
    if (event) {
      formik.setValues({
        ...formik.values,
        title: event.title!,
        description: event.description,
        start: moment(event.start),
        end: moment(event.end),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const onCreate = () => {
    const { title, description, end } = formik.values;

    const event: EventInput = {
      title,
      start: formik.values?.start,
      description,
      end,
      color: "white",
      backgroundColor: backgroundColorEvent.warning.main,
    };

    handleOnCreate(event);
  };

  const onUpdate = () => {
    const { title, description } = formik.values;

    const updatedEvent: Partial<EventInput> = {
      title,
      start: formik.values?.start && formik.values?.start.format(),
      description,
      end: formik.values?.end && formik.values?.end.format(),
      color: "white",
      backgroundColor: backgroundColorEvent.error.main,
    };

    handleOnUpdate(event.eventImpl, updatedEvent);
  };

  const isAddMode = event.type === OperationEvent.ADD;
  const isEditMode = event.type === OperationEvent.EDIT;
  const isManageMode = event.type === OperationEvent.MANANGE;

  const isRejected =
    event?.eventImpl?.extendedProps?.status === REQUEST_STATUSES.REJECTED;
  const isAccepted =
    event?.eventImpl?.extendedProps?.status === REQUEST_STATUSES.ACCEPTED;

  const userId = event?.eventImpl?.extendedProps?.userId;
  const userName = event?.eventImpl?.extendedProps?.userName;

  return (
    <>
      <form>
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
              {isAddMode
                ? "Add Event"
                : isEditMode
                ? "Edit Event"
                : "Manage Event"}
            </Typography>
            <Stack spacing={2}>
              {isManageMode && (
                <Typography color="text.secondary" variant="body2">
                  Click to see patient &nbsp;
                  <Link
                    component={ReactRouter.Link}
                    to={`/dashboard/user-account?id=${userId}`}
                    underline="hover"
                    variant="subtitle2"
                    target="_blank"
                  >
                    {userName}
                  </Link>{" "}
                  account.
                </Typography>
              )}

              <TextField
                error={!!(formik.touched.title && formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                disabled={isManageMode || isRejected || isAccepted}
                fullWidth
                label="Title"
                name="title"
                type="text"
                value={formik.values.title}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <TextField
                disabled={isManageMode || isRejected || isAccepted}
                error={
                  !!(formik.touched.description && formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                fullWidth
                label="Description"
                name="description"
                type="text"
                value={formik.values.description}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Start Date"
                  disablePast
                  value={formik.values.start}
                  disabled={isManageMode || isRejected || isAccepted}
                  onChange={(value: any) => {
                    setDateErrors({
                      ...dateErrors,
                      start: "",
                    });
                    if (value && formik.values.end) {
                      const isValidRange = isValidDuration(
                        value,
                        formik.values.end
                      );
                      if (!isValidRange) {
                        setDateErrors({
                          ...dateErrors,
                          start: "The appointment time needs to be 30 minutes",
                        });
                      }
                    }
                    return formik.setFieldValue("start", value);
                  }}
                  onError={(error: DateTimeValidationError) => {
                    setDateErrors({
                      ...dateErrors,
                      start: error,
                    });
                  }}
                  slotProps={{
                    textField: {
                      error: generateDateError(dateErrors.start) ? true : false,
                      helperText: generateDateError(dateErrors.start),
                    },
                  }}
                />
              </DemoContainer>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="End Date"
                  disablePast
                  value={formik.values.end}
                  disabled={isManageMode || isRejected || isAccepted}
                  onChange={(value: any) => {
                    setDateErrors({
                      ...dateErrors,
                      end: "",
                    });
                    if (value && formik.values.start) {
                      const isValidRange = isValidDuration(
                        formik.values.start,
                        value
                      );
                      if (!isValidRange) {
                        setDateErrors({
                          ...dateErrors,
                          end: "The appointment time needs to be 30 minutes",
                        });
                      }
                    }
                    return formik.setFieldValue("end", value);
                  }}
                  onError={(error: DateTimeValidationError) =>
                    setDateErrors({
                      ...dateErrors,
                      end: error,
                    })
                  }
                  slotProps={{
                    textField: {
                      helperText: generateDateError(dateErrors.end),
                    },
                  }}
                />
              </DemoContainer>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Button onClick={handleOnClose}>Cancel</Button>
                {isRejected && (
                  <Stack direction="row" spacing={2}>
                    <Typography
                      variant="body1"
                      sx={{
                        pt: 1,
                        textAlign: "center",
                      }}
                    >
                      Status:
                    </Typography>
                    <Typography
                      color={"primary"}
                      variant="h6"
                      sx={{
                        pt: 1,
                        textAlign: "center",
                      }}
                    >
                      Rejected
                    </Typography>
                  </Stack>
                )}
                {isAccepted && (
                  <Stack direction="row" spacing={2}>
                    <Typography
                      variant="body1"
                      sx={{
                        pt: 1,
                        textAlign: "center",
                      }}
                    >
                      Status:
                    </Typography>
                    <Typography
                      color={"primary"}
                      variant="h6"
                      sx={{
                        pt: 1,
                        textAlign: "center",
                      }}
                    >
                      Accepted
                    </Typography>
                  </Stack>
                )}
                {isManageMode && !isRejected && !isAccepted && (
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      color="warning"
                      disabled={
                        !formik.isValid ||
                        !!dateErrors.end ||
                        !!dateErrors.start
                      }
                      onClick={() =>
                        handleOnManage(
                          event.eventImpl,
                          REQUEST_STATUSES.REJECTED
                        )
                      }
                    >
                      Reject
                    </Button>
                    <Button
                      variant="contained"
                      disabled={
                        !formik.isValid ||
                        !!dateErrors.end ||
                        !!dateErrors.start
                      }
                      onClick={() =>
                        handleOnManage(
                          event.eventImpl,
                          REQUEST_STATUSES.ACCEPTED
                        )
                      }
                    >
                      Accept
                    </Button>
                  </Stack>
                )}
                {isEditMode && !isRejected && !isAccepted && (
                  <Stack direction="row" spacing={2}>
                    <Button onClick={() => handleOnRemove(event.eventImpl)}>
                      <SvgIcon fontSize="medium">
                        <Delete />
                      </SvgIcon>
                    </Button>
                    <Button
                      variant="contained"
                      disabled={
                        !formik.isValid ||
                        !!dateErrors.end ||
                        !!dateErrors.start
                      }
                      onClick={onUpdate}
                    >
                      Update
                    </Button>
                  </Stack>
                )}
                {isAddMode && !isRejected && !isAccepted && (
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      disabled={
                        !formik.isValid ||
                        !!dateErrors.end ||
                        !!dateErrors.start
                      }
                      onClick={isAddMode ? onCreate : onUpdate}
                    >
                      {isAddMode ? "Create" : "Update"}
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Box>
        </Modal>
      </form>
    </>
  );
};

export default EventModal;
