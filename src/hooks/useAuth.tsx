import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "../models/User";

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