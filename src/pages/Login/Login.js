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
        <div className="Login-Body">
            <div className="Login-Container">
                <div className="Logo">
                    <img src={KitaImage} alt="Kita-Bild" className="KitaImage"/>
                </div>
                <div className="KitaTitle">
                    Kita-Notbetreuung
                </div>
                <div className="KitaDescription">
                    Mit Kita-Notbetreuung bist du und dein Kind auf der sicheren Seite.
                    <br/>Worauf wartest du noch?
                    <br/>Organisier deine Notbetreuung kinderleicht!
                </div>
                <br/>
                <br/>
                <div className="Login">
                    <form onSubmit={handleLogin}>
                        <div className="Benutzername">
                            <label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Benutzername"
                                    required
                                />
                            </label>
                        </div>
                        <br/>
                        <div className="Passwort">
                            <label>
                                <input
                                    type="password"
                                    value={passwort}
                                    onChange={(e) => setPasswort(e.target.value)}
                                    placeholder="Passwort"
                                    required
                                />
                            </label>
                        </div>
                        <br/>
                        <button className="Anmeldeknopf" type="submit">Anmelden</button>
                        {loginError && <p className="error">{loginError}</p>}
                        <div>
                            <br/>
                            Noch kein Benutzer? Hier geht es zur <Link to="/registrieren">Registrierung</Link>.
                        </div>
                    </form>
                    <br/>
                </div>
            </div>
        </div>
    );
}

export default Login;
