import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Authenticator({setIstEingeloggt }) {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                await axios.get("http://localhost:8080/auth-status", { withCredentials: true });
                setIstEingeloggt(true);
            } catch (error) {
                setIstEingeloggt(false);
                navigate('/login');
            }
        };

        checkAuthStatus();
    }, [setIstEingeloggt, navigate]);

    return null;
}

export default Authenticator;

