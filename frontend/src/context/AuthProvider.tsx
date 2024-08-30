import { ReactNode, createContext, useEffect, useState } from "react";
import { checkAuthStatus } from "../helpers/backendCommicators";

interface User {
    username: String
}

interface UserAuth {
    user: User | null,
    isLoggedIn: Boolean
}

const AuthContext = createContext<UserAuth | null>(null)

const AuthProvider = ({children}: {children: ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false)
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        const initialAuthCheck = async () => {
            try {
                const res = await checkAuthStatus() // uses verifyToken middleware to validate jwt
                // console.log(res)
                setIsLoggedIn(true)
                setUser(res.data)
            } catch (e) {
                console.log("Initial auth check failed; user must log in")
            }
        }
        initialAuthCheck()
    }, [])

    return <AuthContext.Provider value={{user, isLoggedIn}}>{children}</AuthContext.Provider>
}
 
export default AuthProvider;

export { AuthContext }