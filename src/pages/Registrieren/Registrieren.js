import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
            <h1>Registrieren</h1>
            <form onSubmit={registrieren}>
                <div>
                    <label>Kita:</label>
                    <input
                        type="text"
                        value={kita}
                        onChange={(e) => setKita(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Postleitzahl:</label>
                    <input
                        type="number"
                        value={postleitzahl}
                        onChange={(e) => setPostleitzahl(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Kitagruppe:</label>
                    <input
                        type="text"
                        value={kitaGruppe}
                        onChange={(e) => setKitaGruppe(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit">Registrieren</button>
                {registerError && <p className="error">{registerError}</p>}
            </form>
        </div>
    );
}

export default Register;
