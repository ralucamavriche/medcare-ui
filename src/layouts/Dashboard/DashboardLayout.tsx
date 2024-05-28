import { styled } from "@mui/material/styles";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { RESOURCES, ROLES, getPermission } from "../../permissions";
import { BASE_PATH, LOGIN_PAGE, NOT_FOUND_PAGE, UNAUTHORIZED_PAGE, enabledRoutes, pagesWithPermissions } from "./config";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
    display: "flex",
    flex: "1 1 auto",
    maxWidth: "100%",
    [theme.breakpoints.up("lg")]: {
        paddingLeft: SIDE_NAV_WIDTH,
    },
}));

const LayoutContainer = styled("div")({
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    width: "100%",
});


const DashboardLayout = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        const pathname = location.pathname as string;
        const isPageWithPermission = pagesWithPermissions.includes(pathname);

        if(!isAuthenticated) {
            return navigate(LOGIN_PAGE)
        }

        if(!isPageWithPermission) {
            return
        }

        const role = user?.role as ROLES
        const resource = pathname.replace(`${BASE_PATH}/`, '') as RESOURCES
        const hasPermission = getPermission(role, resource)

        if(!hasPermission) {
            navigate(UNAUTHORIZED_PAGE)
        }
    }, [location.pathname, navigate, isAuthenticated, user])

    useEffect(() => {
        if (isAuthenticated && !enabledRoutes.includes(location.pathname)) {
            navigate(NOT_FOUND_PAGE)
        }
    }, [location.pathname, isAuthenticated, navigate])

    return (
        <>
            <Navbar />
            <Sidebar />
            <LayoutRoot>
                <LayoutContainer>
                    <Outlet />
                </LayoutContainer>
            </LayoutRoot>
            <ToastContainer />
        </>
    );
}

export default DashboardLayout