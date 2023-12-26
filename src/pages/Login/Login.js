import React, {useEffect, useState} from 'react';
import './Login.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login({istEingeloggt, setIstEingeloggt}) {
    const [name, setName] = useState("");
    const [passwort, setPasswort] = useState("");
    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (istEingeloggt) {
            navigate("/");
        }
    }, [istEingeloggt, navigate]);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/login", {
                name: name,
                passwort: passwort
            }, { withCredentials: true });
            setIstEingeloggt(true);
            navigate("/")
        } catch (error) {
            setLoginError("Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.");
        }
    };

    return (
        <div className="Login">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Benutzername:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Passwort:</label>
                    <input
                        type="password"
                        value={passwort}
                        onChange={(e) => setPasswort(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Einloggen</button>
                {loginError && <p className="error">{loginError}</p>}
            </form>
        </div>
    );
}

export default Login;