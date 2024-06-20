import { Helmet } from "react-helmet";
import Calendar from "../../modules/Appointment/Calendar";
import useAuth from "../../hooks/useAuth";
import { REQUEST_STATUSES } from "../../constants/common.constants";
import MessageBox from "../../components/MessageBox";
import { Container, Typography } from "@mui/material";
import { ROLES } from "../../permissions";

const AppointmentPage = () => {
  const { user } = useAuth();

  const requestedDoctorStatus = user?.requestedDoctorStatus;
  const doctorId = user?.doctorId;
  const role = user?.role;

  const isDoctor = role === ROLES.DOCTOR;
  const isPatient = role === ROLES.PATIENT;

  const hasValidDoctorContract =
    isPatient &&
    requestedDoctorStatus === REQUEST_STATUSES.ACCEPTED &&
    doctorId;
  const hasDoctorRequestPending =
    isPatient && requestedDoctorStatus === REQUEST_STATUSES.SENT && doctorId;
  const hasNoRequest =
    isPatient && requestedDoctorStatus === REQUEST_STATUSES.NOT_SENT;

  return (
    <>
      <Helmet>
        <title>Calendar</title>
      </Helmet>
      {hasDoctorRequestPending && (
        <MessageBox
          title="Doctor Request Pending"
          message="It seems you have an opened request to a doctor. Please wait. You are not able to make an appointment yet."
        />
      )}
      {isDoctor && (
        <Container>
        <Typography sx={{ my: 2 }} variant="h3">
          Manage Appointments
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Streamlining Appointment Requests for Efficient Patient Care
        </Typography>
        <Calendar />
      </Container>
      )}
      {hasValidDoctorContract && (
        <Container>
          <Typography sx={{ my: 2 }} variant="h3">
            Book Your Appointment
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Secure Your Time with Our Trusted Doctor for Personalized Care and
            Peace of Mind
          </Typography>
          <Calendar />
        </Container>
      )}
      {hasNoRequest && (
        <MessageBox
          title="No Doctor Request"
          message="You have no request made to a doctor. Please go to the doctor request
         page to make one"
          linkTo="/available-doctors"
          lintTitle="Available Doctors Page"
        />
      )}
    </>
  );
};

export default AppointmentPage;
