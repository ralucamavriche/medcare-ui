import { REQUEST_STATUSES } from "../../constants/common.constants";

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  role?: string;
  id?: string;
  requestedDoctorStatus?: REQUEST_STATUSES.NOT_SENT | REQUEST_STATUSES.SENT;
  doctorId?: string;
  medicalLicenseNumber?: string;
}
