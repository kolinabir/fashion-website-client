import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";


const PrivetsRoutes = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useContext(AuthContext);
    console.log(user);

    if (loading) {
        return <span className="loading loading-ball loading-lg"></span>;
    }

    if (user) {
        return children;
    }

    setTimeout(() => {
        return <Navigate state={location.pathname} to="/login" />;
    }, 3000); // 3-second delay

    return null;
};

export default PrivetsRoutes;