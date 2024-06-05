import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useAuthGuard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.email) {
            navigate("/auth/login");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.email]);
};

export default useAuthGuard