import { Person, Home, Create } from "@mui/icons-material";
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
  }
];

export default items;
