import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { IUser } from "../types/dto/user";
import { AuthService } from "../services";

const useAuth = () => {
    const { user, isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext);

    const addUser = (user: IUser) => {
        setUser(user);
        setIsAuthenticated(true)
    };

    const removeUser = () => {
        AuthService.logout()
        setUser(null);
        setIsAuthenticated(false)
    };

    return { user, isAuthenticated, addUser, removeUser };
};

export default useAuth