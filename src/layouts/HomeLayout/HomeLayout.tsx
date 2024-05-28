import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const HomeLayout = () => (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
);

export default HomeLayout