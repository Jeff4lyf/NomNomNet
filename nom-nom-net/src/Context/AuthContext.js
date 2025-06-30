// @ts-nocheck

import { createContext, useState, useContext, useEffect} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // user = { id, token, name, etc. }

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
        setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
