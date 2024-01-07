import React, {useState} from 'react';
import axios from "axios";
import './ProfilBearbeiten.css'

function ProfilBearbeiten() {
    const [name, setName] = useState("")
    const [passwort, setPasswort] = useState("")
    const [nameBestaetigen, setNameBestaetigen] = useState("")
    const [passwortBestaetigen, setPasswortBestaetigen] = useState("")


    function benutzerLoeschen() {
        if (window.confirm("Sind Sie sicher, dass Sie Ihren Account löschen möchten?")) {
            axios.delete(`http://localhost:8080/userloeschen`, {withCredentials: true})
                .then(() => {

                })
                .catch(() => {
                    alert("Admin kann sich nicht selber löschen. Bitte kontaktiere den Support");
                });
        }
    }

    async function neuenNamenUebernehmen(event) {
        event.preventDefault();
        if (name === nameBestaetigen) {
            axios.post("http://localhost:8080/abc", {username: name}, {withCredentials: true})
                .then(() => {
                    alert("Name geändert")

                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
        } else {
            alert("Eingaben stimmen nicht überein")
        }
    }

    function neuesPasswortUebernehmen() {
        if (passwort === passwortBestaetigen) {
            axios.post("http://localhost:8080/passwortAendern", {passwort: passwort}, {withCredentials: true})
                .then(() => {
                    alert("Passwort geändert")
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
        } else {
            alert("Eingaben stimmen nicht überein")
        }
    }

    return (
        <div className="profil-body">
            <div className="profil-container">
                <h1 className="profil-title">Profil verwalten</h1>
                <h2 className="profil-title2">Benutzername ändern</h2>
                <br/>
                <form onSubmit={neuenNamenUebernehmen}>
                    <input type="name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           placeholder="Neuer Benutzername"
                    />
                    <input type="name"
                           value={nameBestaetigen}
                           onChange={(e) => setNameBestaetigen(e.target.value)}
                           placeholder="Neuen Benutzernamen bestätigen"
                    />
                    <button type="submit">Bestätigen</button>
                </form>
                <br/>
                <br/>
                <br/>
                <h2 className="profil-title2">Passwort ändern</h2>
                <br/>
                <form onSubmit={neuesPasswortUebernehmen}>
                    <input type="password"
                           value={passwort}
                           onChange={(e) => setPasswort(e.target.value)}
                           placeholder="Neues Passwort"
                    />
                    <input type="password"
                           value={passwortBestaetigen}
                           onChange={(e) => setPasswortBestaetigen(e.target.value)}
                           placeholder="Neues Passwort bestätigen"
                    />
                    <button type="submit">Bestätigen</button>
                </form>
            </div>
            <div className="profil-container">
            <h2 className="profil-title">Benutzer löschen</h2>
                <br/>
                <button className="button button-danger" onClick={benutzerLoeschen}>Benutzer löschen</button>
            </div>
        </div>
    )
        ;
}

export default ProfilBearbeiten;