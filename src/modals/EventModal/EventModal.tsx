import { useEffect, useState } from "react";
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
import { useFormik } from "formik";
import * as Yup from "yup";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { EventInput } from "@fullcalendar/core";
import { Delete } from "@mui/icons-material";
import { EventImpl } from "@fullcalendar/core/internal";
import { toast } from "react-toastify";
import { DateTimeValidationError } from "@mui/x-date-pickers";
import { isValidDuration } from "../../utils/date";
import { OperationEvent } from "../../constants/common.constants";

interface EventModalProps {
  event: EventInput;
  open: boolean;
  handleOnCreate: (event: EventInput) => void;
  handleOnClose: () => void;
  handleOnRemove: (event: EventImpl) => void;
  handleOnUpdate: (event: EventImpl, newEvent: EventInput) => void;
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
    case 'minDate':
    case 'maxDate':
      return 'Max Date reached'
    case 'disablePast': 
      return 'Date cannot be in the past'
    case 'invalidDate':
        return 'Invalid Date'
    default:
      return error
  }
}

const VALIDATION_SCHEMA = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  start: Yup.date().required('Start date is required'),
  end: Yup.date().required('End date is required')
})

const EventModal = ({
  open,
  event,
  handleOnClose,
  handleOnCreate,
  handleOnRemove,
  handleOnUpdate,
}: EventModalProps) => {
  const theme = useTheme();
  const shadowMedium = theme.shadows[5];
  const backgroundColorEvent = theme.palette;

  const [dateErrors, setDateErrors] = useState<DateErrors>({})
  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: async (values) => {
      try {
        console.log(values)
      } catch (error) {
        toast.error(`Error occured while submiting the form: ${(error as Error)?.message}`);
      }
    }
  })

  useEffect(() => {
    if(event) {
      formik.setValues({
        ...formik.values,
        title: event.title!,
        description: event.description,
        start: moment(event.start),
        end: moment(event.end)
      })
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
              {event.type === OperationEvent.ADD ? "Add Event" : "Edit Event"}
            </Typography>
            <Stack spacing={2}>
              <TextField
                error={!!(formik.touched.title && formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                fullWidth
                label="Title"
                name="title"
                type="text"
                value={formik.values.title}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <TextField
                error={!!(formik.touched.description && formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
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
                  onChange={(value: any) => {
                    setDateErrors({
                      ...dateErrors,
                      'start': ''
                    })
                    if(value && formik.values.end){
                      const isValidRange = isValidDuration(value, formik.values.end)
                      if(!isValidRange) {
                        setDateErrors({
                          ...dateErrors,
                          'start': 'The appointment time needs to be 30 minutes'
                        })
                      }
                    }
                    return formik.setFieldValue('start', value)
                  }}
                  onError={(error: DateTimeValidationError) => {
                    setDateErrors({
                      ...dateErrors,
                      'start': error
                    })
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
                  onChange={(value: any) => {
                    setDateErrors({
                      ...dateErrors,
                      'end': ''
                    })
                    if(value && formik.values.start){
                      const isValidRange = isValidDuration(formik.values.start, value)
                      if(!isValidRange) {
                        setDateErrors({
                          ...dateErrors,
                          'end': 'The appointment time needs to be 30 minutes'
                        })
                      }
                    }
                    return formik.setFieldValue('end', value)}}
                  onError={(error: DateTimeValidationError) => setDateErrors({
                    ...dateErrors,
                    'end': error
                  })}
                  slotProps={{
                    textField: {
                      helperText: generateDateError(dateErrors.end),
                    },
                  }}
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
                    disabled={!formik.isValid || !!dateErrors.end || !!dateErrors.start}
                    onClick={
                      event.type === OperationEvent.ADD ? onCreate : onUpdate
                    }
                  >
                    {event.type === OperationEvent.ADD ? 'Create' : 'Update'}
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Modal>

      </form>

    </>
  );
};

export default EventModal;
