// import { ReactNode, createContext, useContext, useEffect, useState } from "react";

// interface UserAuth {
//     username: String,
//     password: String
// }

// const AuthContext = createContext<UserAuth | null>(null) // TODO: set createContext generic type

// const AuthProvider = ({children}: {children: ReactNode}) => {
//     const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false)
//     const [user, setUser] = useState<UserAuth | null>(null)

//     useEffect(() => {
//         const initialAuthCheck = async () => {
//             try {
//                 const res = await checkAuthStatus() // this function will compare data of the cookie (that stores jwt)
//                 setUser(res.user)
//                 setIsLoggedIn(true)
//             } catch (e) {
//                 console.log("Initial auth check failed; user must log in")
//             }
//         }
//         initialAuthCheck()
//     }, [])

//     return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
// }
 
// export default AuthProvider;

// export { AuthContext }