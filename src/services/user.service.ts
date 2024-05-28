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

export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data.users;
  } catch (error: any) {
    console.error(error);
    return handleError("Failed to retrieve the list of users!", error.code);
  }
};

export const getDoctorAccountsBasedOnStatus = async (status: string) => {
  try {
    const response = await api.get(`/users/doctors/${status}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data.doctors
  } catch (error: any) {
    console.error(error);
    return handleError(`Failed to retrieve the list of doctors in ${status} status!`, error.code);
  }
};

export const getPatientBasedOnRequestedStatus = async (requestedStatus: string) => {
  try {
    const response = await api.get(`/users/patients/${requestedStatus}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data.patients
  } catch (error: any) {
    console.error(error);
    return handleError("Failed to retrieve the list of patients in SENT request state!", error.code);
  }
};

export const getPatientsByDoctorId = async (doctorId: string) => {
  try {
    const response = await api.get(`/users/patients/${doctorId}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data.patients
  } catch (error: any) {
    console.error(error);
    return handleError("Failed to retrieve the list of patients by Doctor ID!", error.code);
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await api.get(`/users/${id}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data.user;
  } catch (error: any) {
    console.error(error);
    return handleError("Failed to get the user!", error.code);
  }
};

export const createUser = async (payload: any) => {
  try {
    const response = await api.post(`/users`, payload);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data.user;
  } catch (error: any) {
    console.error(error);
    return handleError("Failed to create the user!", error.code);
  }
};

export const updateUser = async (id: string, payload: any) => {
  try {
    const response = await api.patch(`/users/${id}`, payload);
    console.log(response)
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data;
  } catch (error: any) {
    console.log(error);
    return handleError("Failed to update the user!", error.code);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await api.remove(`/users/${id}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data.user;
  } catch (error: any) {
    console.error(error);
    return handleError("Failed to delete the user!", error.code);
  }
};
