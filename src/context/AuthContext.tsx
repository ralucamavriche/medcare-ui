import { createContext } from "react";

export interface User {
    id: string;
    name: string;
    email: string;
    authToken?: string;
}

interface AuthContext {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContext>({
    user: null,
    setUser: () => { },
});


