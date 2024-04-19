import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export interface User {
    id: string;
    name: string;
    email: string;
    authToken?: string;
}

const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    const addUser = (user: User) => {
        setUser(user);
    };

    const removeUser = () => {
        setUser(null);
    };

    return { user, addUser, removeUser };
};

export default useAuth