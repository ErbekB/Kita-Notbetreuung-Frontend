import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import "./Registrieren.css"
import axios from 'axios';
import KitaImage from "../../images/Logo.png";

function Register({istEingeloggt}) {
    const [name, setName] = useState("");
    const [passwort, setPasswort] = useState("");
    const [kita, setKita] = useState("");
    const [postleitzahl, setPostleitzahl] = useState("");
    const [kitaGruppe, setKitaGruppe] = useState("");
    const [registerError, setRegisterError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (istEingeloggt) {
            navigate("/");
        }
    }, [istEingeloggt, navigate]);

    const valide = () => {
        if (name.length < 3 || name.length > 12) {
            setRegisterError("Benutzername muss zwischen 3 und 12 Zeichen lang sein.");
            return false;
        }
        if (kita.length < 3 || kita.length > 12) {
            setRegisterError("Kita-Name muss zwischen 3 und 12 Zeichen lang sein.");
            return false;
        }
        if (!/^\d{5}$/.test(postleitzahl)) {
            setRegisterError("Postleitzahl muss eine gültige 5-stellige Zahl sein.");
            return false;
        }
        if (kitaGruppe.length < 3 || kitaGruppe.length > 12) {
            setRegisterError("Kitagruppe muss zwischen 3 und 12 Zeichen lang sein.");
            return false;
        }
        return true;
    };

    const registrieren = async (event) => {
        event.preventDefault();
        if (!valide()) {
            return;
        }
        try {
            await axios.post("http://localhost:8080/registrieren", {
                name: name,
                passwort: passwort,
                kita: kita,
                postleitzahl: postleitzahl,
                kitaGruppe: kitaGruppe
            });
            navigate("/login");
        } catch (error) {
            setRegisterError("error");
        }
    };

    return (
        <div className="register-body">
            <div className="register-container">
                <form className="register-form" onSubmit={registrieren}>
                    <div className="register-logo">
                        <img src={KitaImage} alt="Kita-Bild" className="kitaImage"/>
                    </div>
                    <h1 className="register-title">Registrieren</h1>
                    <br/>
                    <div className="register-section">
                        <input
                            type="text"
                            value={kita}
                            onChange={(e) => setKita(e.target.value)}
                            placeholder="Kita"
                            required
                        />
                        <input
                            type="number"
                            value={postleitzahl}
                            onChange={(e) => setPostleitzahl(e.target.value)}
                            placeholder="Postleitzahl"
                            required
                        />
                        <br/>
                        <input
                            type="text"
                            value={kitaGruppe}
                            onChange={(e) => setKitaGruppe(e.target.value)}
                            placeholder="Kitagruppe"
                            required
                        />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Benutzername"
                            required
                        />
                        <input
                            type="password"
                            value={passwort}
                            onChange={(e) => setPasswort(e.target.value)}
                            placeholder="Passwort"
                            required
                        />
                        <button type="submit">Registrieren</button>
                        {registerError && <p className="error">{registerError}</p>}
                    </div>
                </form>
                <p>
                    Zurück zum <Link to="/login">Login</Link>.
                </p>
            </div>

            <div className="register-container">
                <h1 className="register-title">Bedienungsanleitung</h1>
                <div className="Schritte">
                    <br/>
                    <br/>
                    1. Sprich dich mit deiner Kitagruppe ab.
                    <br/>
                    <br/>
                    2. Registriere dich und erstelle die Kitagruppe.
                    <br/>
                    <br/>
                    3. Du bist jetzt der Admin der Kitagruppe
                    <br/>
                    <br/>
                    4. Lade nun alle Eltern der Kitagruppe ein.
                    <br/>
                    <br/>
                    5. Meldet euch mit den Namen eurer Kinder an.
                </div>
            </div>
        </div>
    );
}

export default Register;
