import { createContext, useState, useEffect } from "react";

const AuthContext = createContext()

export { AuthContext }

export const AuthProvider = ({children}) => {
    return (
        <AuthContext.Provider value={{'username':'Laweciarz'}}>
            {children}
        </AuthContext.Provider>
    )

}