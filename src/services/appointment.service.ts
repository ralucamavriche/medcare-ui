import * as api from "../api/api";
import { Appointment, RequestAppointment } from "../types/dto/appointment";
// const GENERAL_ERROR = {
//   error: "Something went wrong!",
//   code: 500,
// };

// const handleError = (message?: string, code?: number) => {
//   return {
//     error: message || GENERAL_ERROR.error,
//     code: code || GENERAL_ERROR.code,
//   };
// };

export const getAppointments = async (): Promise<Appointment[]> => {
  const response = await api.get("/appointment");
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response.data.appointments;
};

export const getAppointmentById = async (id: string): Promise<Appointment> => {
  const response = await api.get(`/appointment/${id}`);
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response.data.appointment;
};

export const getAppointmentsByDoctorIdAndUserId = async (
  doctorId?: string,
  userId?: string
): Promise<Appointment[]> => {
  const response = await api.get(
    `/appointment/doctor2/${doctorId}/appointments/${userId}`
  );
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response.data.appointments;
};

export const getAppointmentsByUserId = async (
  userId: string
): Promise<Appointment[]> => {
  const response = await api.get(`/appointment/user/${userId}/appointments`);
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response.data.appointments;
};

export const getAppointmentsByDoctorId = async (
  doctorId: string
): Promise<Appointment[]> => {
  const response = await api.get(
    `/appointment/doctor/${doctorId}/appointments`
  );
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response.data.appointments;
};

export const createAppointment = async (
  payload: RequestAppointment
): Promise<Appointment> => {
  const response = await api.post(`/appointment`, payload);
  if (response.status !== 201) {
    throw new Error(response.statusText);
  }

  return response.data.appointment;
};

export const updateAppointment = async (
  id: string,
  payload: RequestAppointment
): Promise<Appointment> => {
  const response = await api.patch(`/appointment/${id}`, payload);

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response.data.appointment;
};

export const deleteAppointment = async (id: string): Promise<void> => {
  const response = await api.remove(`/appointment/${id}`);
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return;
};
