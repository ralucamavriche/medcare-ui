import { Person, PersonAddAlt1, Lock, Home, Create } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";

const items = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: (
      <SvgIcon fontSize="small">
        <Home />
      </SvgIcon>
    ),
    disabled: false,
    external: false
  },
  {
    title: "Appointment",
    path: "/dashboard/appointment",
    icon: (
      <SvgIcon fontSize="small">
        <Create />
      </SvgIcon>
    ),
    disabled: false,
    external: false
  },
  {
    title: "Account",
    path: "/dashboard/account",
    icon: (
      <SvgIcon fontSize="small">
        <Person />
      </SvgIcon>
    ),
    disabled: false,
    external: false
  },
  {
    title: "Login",
    path: "/auth/login",
    icon: (
      <SvgIcon fontSize="small">
        <Lock />
      </SvgIcon>
    ),
    disabled: false,
    external: false
  },
  {
    title: "Register",
    path: "/auth/register",
    icon: (
      <SvgIcon fontSize="small">
        <PersonAddAlt1 />
      </SvgIcon>
    ),
    disabled: false,
    external: false
  },
];

export default items;
