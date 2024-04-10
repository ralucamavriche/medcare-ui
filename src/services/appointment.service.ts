import * as api from "../api/api";
const GENERAL_ERROR = {
  error: "Something went wrong!",
  code: 500,
};

const handleError = (message?: string, code?: number) => {
  return {
    error: message || GENERAL_ERROR.error,
    code: code || GENERAL_ERROR.code,
  };
};

export const getAppointments = async () => {
  try {
    const response = await api.get("/appointment");
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data.appointments;
  } catch (error: any) {
    console.error(error);
    return handleError(
      "Failed to retrieve the list of appointments!",
      error.code
    );
  }
};

export const getAppointmentById = async (id: string) => {
  try {
    const response = await api.get(`/appointment/${id}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data.appointment;
  } catch (error: any) {
    console.error(error);
    return handleError("Failed to retrieve the appointment by ID!", error.code);
  }
};

export const createAppointment = async (body: any) => {
  try {
    const response = await api.post(`/appointment`, body);
    if (response.status !== 201) {
      throw new Error(response.statusText);
    }
    return response.data.appointment;
  } catch (error: any) {
    console.error(error);
    return handleError("Failed to create the appointment!", error.code);
  }
};

export const updateAppointment = async (id: string, body: any) => {
  try {
    const response = await api.post(`/appointment/${id}`, body);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data.appointment;
  } catch (error: any) {
    console.error(error);
    return handleError("Failed to update the appointment!", error.code);
  }
};

export const deleteAppointment = async (id: string) => {
  try {
    const response = await api.remove(`/appointment/${id}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data.appointment;
  } catch (error: any) {
    console.error(error);
    return handleError("Failed to delete the appointment!", error.code);
  }
};
