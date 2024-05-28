import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Helmet from "react-helmet";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/Home";
import AppointmentPage from "./pages/Appointment";
import AuthLayout from "./layouts/Auth/AuthLayout";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import NotFoundPage from "./pages/NotFound";
import AccountPage from "./pages/Account";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthContext } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { AuthService } from "./services";
import { IUser } from "./types/dto/user";
import useAuthGuard from "./hooks/useAuthGuard";
import Spinner from "./components/Spinner/Spinner";
import DoctorValidationPage from "./pages/Doctors/DoctorsValidationPage";
import DoctorAssignmentListPage from "./pages/Doctors/DoctorAssignmentListPage";
import PatientRequestsForDoctorPage from "./pages/Patient/PatientRequestsForDoctorPage";

const Fonts = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700&display=swap"
    />
  </>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<IUser | null>(null)

  const setUserData = (user: IUser | null) => {
    setUser(user)
  }

  useEffect(() => {
    (async () => {
      const { error, user } = await AuthService.getUserDetails()

      if (error) {
        console.error(error)
      } else if (user) {
        setUserData(user)
      }
      setIsLoading(false)
    })()
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Helmet>
        <Fonts />
      </Helmet>
      <BrowserRouter>
        <AuthContext.Provider value={{ user, setUser: setUserData }}>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="appointment" element={<AppointmentPage />} />
              <Route path="account" element={<AccountPage />} />
              <Route path="doctors-requests" element={<DoctorValidationPage />} />
              <Route path="accepted-doctors" element={<DoctorAssignmentListPage />} />
              <Route path="patient-requests" element={<PatientRequestsForDoctorPage />} />

            </Route>
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
};

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

function DashboardLayout() {
  useAuthGuard()

  return (
    <div>
      <Navbar />
      <Sidebar />
      <LayoutRoot>
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </LayoutRoot>
      <ToastContainer />
    </div>
  );
}

function HomeLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
