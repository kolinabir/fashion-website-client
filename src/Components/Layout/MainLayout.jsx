import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../../page/Footer/Footer";


const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;