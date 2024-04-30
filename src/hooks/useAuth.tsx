import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { IUser } from "../types/dto/user";
import { AuthService } from "../services";

const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    const addUser = (user: IUser) => {
        setUser(user);
    };

    const removeUser = () => {
        AuthService.logout()
        setUser(null);
    };

    return { user, addUser, removeUser };
};

export default useAuth