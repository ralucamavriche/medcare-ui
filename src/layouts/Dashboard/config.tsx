import { Person, Home, Create } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import { RESOURCES } from "../../permissions";

export const BASE_PATH = '/dashboard'
export const UNAUTHORIZED_PAGE = '/unauthorized'
export const NOT_FOUND_PAGE = '/not-found'

export const enabledRoutes = [
  BASE_PATH,
  `${BASE_PATH}/`,
  `${BASE_PATH}/${RESOURCES.APPOINTEMNT}`,
  `${BASE_PATH}/${RESOURCES.ACCOUNT}`,
  `${BASE_PATH}/${RESOURCES.DOCTORS_REQUESTS}`,
  `${BASE_PATH}/${RESOURCES.DOCTOR_AVAILABLE}`,
  `${BASE_PATH}/${RESOURCES.PATIENT_REQUEST}`,
  `${BASE_PATH}/${RESOURCES.MY_PATIENTS}`
]

export const pagesWithPermissions = [
  `${BASE_PATH}/${RESOURCES.DOCTORS_REQUESTS}`,
  `${BASE_PATH}/${RESOURCES.DOCTOR_AVAILABLE}`,
  `${BASE_PATH}/${RESOURCES.PATIENT_REQUEST}`,
  `${BASE_PATH}/${RESOURCES.MY_PATIENTS}`
]

export const dashboardItems = [
  {
    title: "Dashboard",
    path: `${BASE_PATH}/`,
    icon: (
      <SvgIcon fontSize="small">
        <Home />
      </SvgIcon>
    ),
    resource: RESOURCES.DASHBOARD,
    disabled: false,
    external: false
  },
  {
    title: "Appointment",
    path: `${BASE_PATH}/${RESOURCES.APPOINTEMNT}`,
    icon: (
      <SvgIcon fontSize="small">
        <Create />
      </SvgIcon>
    ),
    resource: RESOURCES.APPOINTEMNT,
    disabled: false,
    external: false
  },
  {
    title: "Account",
    path: `${BASE_PATH}/${RESOURCES.ACCOUNT}`,
    icon: (
      <SvgIcon fontSize="small">
        <Person />
      </SvgIcon>
    ),
    resource: RESOURCES.ACCOUNT,
    disabled: false,
    external: false
  },
  {
    title: "Doctors Request",
    path:  `${BASE_PATH}/${RESOURCES.DOCTORS_REQUESTS}`,
    icon: (
      <SvgIcon fontSize="small">
        <Person />
      </SvgIcon>
    ),
    resource: RESOURCES.DOCTORS_REQUESTS,
    disabled: false,
    external: false
  },
  {
    title: "Available Doctor",
    path: `${BASE_PATH}/${RESOURCES.DOCTOR_AVAILABLE}`,
    icon: (
      <SvgIcon fontSize="small">
        <Person />
      </SvgIcon>
    ),
    resource: RESOURCES.DOCTOR_AVAILABLE,
    disabled: false,
    external: false
  },
  {
    title: "Patient Requests",
    path: `${BASE_PATH}/${RESOURCES.PATIENT_REQUEST}`,
    icon: (
      <SvgIcon fontSize="small">
        <Person />
      </SvgIcon>
    ),
    resource: RESOURCES.PATIENT_REQUEST,
    disabled: false,
    external: false
  },
  {
    title: "My Patients",
    path: `${BASE_PATH}/${RESOURCES.MY_PATIENTS}`,
    icon: (
      <SvgIcon fontSize="small">
        <Person />
      </SvgIcon>
    ),
    resource: RESOURCES.MY_PATIENTS,
    disabled: false,
    external: false
  }
];
