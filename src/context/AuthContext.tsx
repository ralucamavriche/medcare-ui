import { createContext } from "react";
import { IUser } from "../types/dto/user";

interface AuthContext {
    user: IUser | null;
    isAuthenticated: boolean;
    setIsAuthenticated: (state: boolean) => void;
    setUser: (user: IUser | null) => void;
}

export const AuthContext = createContext<AuthContext>({
    user: null,
    isAuthenticated: false,
    setUser: () => { },
    setIsAuthenticated: () => { }
});


