export interface User {
    email: string,
    password: string
    firstName: string,
    lastName: string,
    phone?: string,
    address?: string,
    city?: string,
    country?: string,
    role?: string
}

export interface UserUpdate {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
