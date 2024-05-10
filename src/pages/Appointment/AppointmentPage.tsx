import { Helmet } from "react-helmet";
import Calendar from "../../modules/Appointment/Calendar";

const AppointmentPage = () => {
  return (
    <>
      <Helmet>
        <title>Calendar</title>
      </Helmet>
      <Calendar />
    </>
  );
};

export default AppointmentPage;
