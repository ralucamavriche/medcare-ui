import * as api from "../api/api";

const MEDCARE_TOKEN = "medcartoken";

const saveToken = (token: string) => {
  return localStorage.setItem(MEDCARE_TOKEN, token);
};

const getToken = () => {
  return localStorage.getItem(MEDCARE_TOKEN);
};

export const getUserDetails = async () => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("Token is not found");
    }

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api.get("/auth/me", options);

    if (response.status !== 200) {
      throw new Error("Failed to get user details");
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    if (response.status !== 200) {
      throw new Error("Failed to login");
    }

    saveToken(response.data.token);
    return response.data.user;
  } catch (error) {
    console.error(error);
  }
};

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  medicalLicenseNumber: string,
  role: string
) => {
  try {
    const response = await api.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
      medicalLicenseNumber,
      role,
    });

    if (response.status !== 201) {
      throw new Error("Failed to register");
    }

    saveToken(response.data.token);
    return response.data.user;
  } catch (error: any) {
    console.error(error);
  }
};

export const logout = () => {
  return localStorage.removeItem(MEDCARE_TOKEN);
};
