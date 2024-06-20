import { REQUEST_STATUSES } from "../../constants/common.constants";
import { IUser } from "./user";

export interface Appointment {
  id: string;
  userId: IUser;
  title: string;
  description: string;
  startDate: DateInput;
  endDate: DateInput;
  author: string;
  status: string;
}

export interface RequestAppointment extends Partial<Appointment> {
  title?: string;
  description?: string;
  startDate?: DateInput;
  endDate?: DateInput;
  status?: string;
  userId?: string;
  doctorId?: string;
  status: REQUEST_STATUSES;
}
