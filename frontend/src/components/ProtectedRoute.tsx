import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import SignUpPage from "../pages/SignUpPage";

const ProtectedRoute = ({children}: {children: ReactNode}) => {
    const auth = useContext(AuthContext)
    return auth?.isLoggedIn ? children : <SignUpPage />
}
 
export default ProtectedRoute;