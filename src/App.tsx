import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AppointmentPage from "./pages/Appointment";
import AuthLayout from "./layouts/Auth/AuthLayout";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import NotFoundPage from "./pages/NotFound";
import AccountPage from "./pages/Account";
import DashboardPage from "./pages/Dashboard";
import { AuthContext } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { AuthService } from "./services";
import { IUser } from "./types/dto/user";
import Spinner from "./components/Spinner/Spinner";
import DoctorValidationPage from "./pages/Admin/DoctorRequestsPage";
import AvailableDoctors from "./pages/Patient/DoctorsAssignmentPage";
import PatientRequestsForDoctorPage from "./pages/Doctors/PatientRequestsPage";
import MyPatientsPage from "./pages/Doctors/MyPatientsPage";
import DashboardLayout from "./layouts/Dashboard/DashboardLayout";
import Unauthorized from "./pages/Unauthorized";
import HomeLayout from "./layouts/HomeLayout/HomeLayout";
import UserAccountPage from "./pages/Account/UserAccountPage";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const setUserData = (user: IUser | null) => {
    setUser(user);
    setIsAuthenticated(!!user?.id);
  };

  useEffect(() => {
    (async () => {
      const { error, user } = await AuthService.getUserDetails();

      if (!error) {
        setUserData(user);
      }

      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            user,
            setUser: setUserData,
            isAuthenticated,
            setIsAuthenticated,
          }}
        >
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="appointment" element={<AppointmentPage />} />
              <Route path="account" element={<AccountPage />} />
              <Route
                path="doctors-requests"
                element={<DoctorValidationPage />}
              />
              <Route path="available-doctors" element={<AvailableDoctors />} />
              <Route
                path="patient-requests"
                element={<PatientRequestsForDoctorPage />}
              />
              <Route path="my-patients" element={<MyPatientsPage />} />
              <Route path="user-account" element={<UserAccountPage />} />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
