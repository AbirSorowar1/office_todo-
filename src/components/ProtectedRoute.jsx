import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    if (!auth.currentUser) return <Navigate to="/login" />;
    return children;
}

export default ProtectedRoute;
