export enum ROLES {
  ADMIN = "ADMIN",
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
}

export enum RESOURCES {
  DASHBOARD = "/",
  APPOINTEMNT = "appointment",
  ACCOUNT = "account",
  DOCTORS_REQUESTS = "doctors-requests",
  DOCTOR_AVAILABLE = "available-doctors",
  PATIENT_REQUEST = "patient-requests",
  MY_PATIENTS = "my-patients",
}

export const PERMISSIONS = {
  [RESOURCES.DASHBOARD]: [ROLES.ADMIN, ROLES.PATIENT, ROLES.DOCTOR],
  [RESOURCES.APPOINTEMNT]: [ROLES.ADMIN, ROLES.PATIENT, ROLES.DOCTOR],
  [RESOURCES.ACCOUNT]: [ROLES.ADMIN, ROLES.PATIENT, ROLES.DOCTOR],
  [RESOURCES.DOCTORS_REQUESTS]: [ROLES.ADMIN],
  [RESOURCES.DOCTOR_AVAILABLE]: [ROLES.ADMIN, ROLES.PATIENT],
  [RESOURCES.PATIENT_REQUEST]: [ROLES.ADMIN, ROLES.DOCTOR],
  [RESOURCES.MY_PATIENTS]: [ROLES.DOCTOR],
};

export const getPermission = (role: ROLES, resource: RESOURCES) => {
  if (!role || !resource) {
    return false;
  }

  const resourcePermissions = PERMISSIONS[resource];

  if (!resourcePermissions) {
    return false;
  }

  const hasRole = resourcePermissions.includes(role);
  return hasRole;
};
