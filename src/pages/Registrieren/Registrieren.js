import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Registrieren.css"
import axios from "axios";
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
        <div className="Register">
            <form onSubmit={registrieren}>
                <div className="Logo">
                    <img src={KitaImage} alt="Kita-Bild" className="KitaImage"/>
                </div>
                <div className="title1">
                    Registrieren
                </div>
                <div>
                    <input
                        type="text"
                        value={kita}
                        onChange={(e) => setKita(e.target.value)}
                        placeholder="Kita"
                        required
                    />
                </div>
                <br/>
                <div>
                    <input
                        type="number"
                        value={postleitzahl}
                        onChange={(e) => setPostleitzahl(e.target.value)}
                        placeholder="Postleitzahl"
                        required
                    />
                </div>
                <br/>
                <div>
                    <input
                        type="text"
                        value={kitaGruppe}
                        onChange={(e) => setKitaGruppe(e.target.value)}
                        placeholder="Kitagruppe"
                        required
                    />
                </div>
                <br/>
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Benutzername"
                        required
                    />
                </div>
                <br/>
                <div>
                    <input
                        type="password"
                        value={passwort}
                        onChange={(e) => setPasswort(e.target.value)}
                        placeholder="Passwort"
                        required
                    />
                </div>
                <br/>
                <button type="submit">Registrieren</button>
                {registerError && <p className="error">{registerError}</p>}
                <div>
                    <br/>
                    Zurück zum <Link to="/login">Login</Link>.
                </div>
            </form>
            <br/>
            <form className="Bedienungsanleitung">
                <div className="title2">
                    Bedienungsanleitung
                </div>
                <div className="Schritte">
                    <div>
                        1. Sprich dich mit deiner Kitagruppe ab.
                    </div>
                    <br/>
                    <div>
                        2. Registriere dich und erstelle die Kitagruppe.
                    </div>
                    <br/>
                    <div>
                        3. Du bist jetzt der Admin der Kitagruppe
                    </div>
                    <br/>
                    <div>
                        4. Lade nun alle Eltern der Kitagruppe ein.
                    </div>
                    <br/>
                    <div>
                        5. Meldet euch mit den Namen eurer Kinder an.
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;
