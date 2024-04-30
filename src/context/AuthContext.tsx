import { createContext } from "react";
import { IUser } from "../types/dto/user";

interface AuthContext {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}

export const AuthContext = createContext<AuthContext>({
    user: null,
    setUser: () => { },
});


