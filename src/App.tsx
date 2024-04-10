import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Helmet from "react-helmet";

import HomePage from "./containers/Home";
import AppointmentPage from "./containers/Appointment";
import AuthLayout from "./layouts/Auth/AuthLayout";
import LoginPage from "./containers/Auth/LoginPage";
import RegisterPage from "./containers/Auth/RegisterPage";
import NotFoundPage from "./containers/NotFound";
import AccountPage from "./containers/Account";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./containers/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
  return (
    <>
      <Helmet>
        <Fonts />
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="appointment" element={<AppointmentPage />} />
            <Route path="account" element={<AccountPage />} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
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
  return (
    <div>
      <Navbar />
      <Sidebar />
      <LayoutRoot>
        <LayoutContainer>
          <Outlet />
        </LayoutContainer>
      </LayoutRoot>
    </div>
  );
}

function HomeLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer/>
    </div>
  );
}

export default App;
