import axios from "axios";
import { useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";

function Authenticator({ setIstEingeloggt }) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                await axios.get("http://localhost:8080/auth-status", { withCredentials: true });
                setIstEingeloggt(true);
            } catch (error) {
                setIstEingeloggt(false);
                // Prüfen, ob der aktuelle Pfad nicht '/register' ist, bevor zur Login-Seite umgeleitet wird
                if (location.pathname !== "/registrieren") {
                    navigate("/login");
                }
            }
        };

        checkAuthStatus();
    }, [setIstEingeloggt, navigate, location.pathname]);

    return null;
}

export default Authenticator;

