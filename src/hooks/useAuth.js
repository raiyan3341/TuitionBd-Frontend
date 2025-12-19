// src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../components/context/Authprovider";


const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;