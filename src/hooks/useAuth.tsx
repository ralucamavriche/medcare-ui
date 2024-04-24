import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "../models/User";
import { AuthService } from "../services";

const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    const addUser = (user: User) => {
        setUser(user);
    };

    const removeUser = () => {
        AuthService.logout()
        setUser(null);
    };

    return { user, addUser, removeUser };
};

export default useAuth