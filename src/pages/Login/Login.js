// Deine React-Komponente
import React, {useEffect, useState} from 'react';
import './Login.css';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import KitaImage from '../../images/Logo.png';

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
            }, {withCredentials: true});
            setIstEingeloggt(true);
            navigate("/")
        } catch (error) {
            setLoginError("Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten.");
        }
    };

    return (
        <div className="login-body">
            <div className="login-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="login-logo">
                        <img src={KitaImage} alt="Kita-Bild" className="kitaImage"/>
                    </div>
                    <h1 className="login-title">Anmelden</h1>
                    <br/>
                    <div className="login-section">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Benutzername"
                            required
                        />
                        <br/>
                        <input
                            type="password"
                            value={passwort}
                            onChange={(e) => setPasswort(e.target.value)}
                            placeholder="Passwort"
                            required
                        />
                        <br/>
                        <button type="submit">Anmelden</button>
                        {loginError && <p className="error">{loginError}</p>}
                    </div>
                </form>
                <p>
                    Noch kein Benutzer? Hier geht es zur <Link to="/registrieren">Registrierung</Link>.
                </p>
            </div>
        </div>
    );
}

export default Login;
