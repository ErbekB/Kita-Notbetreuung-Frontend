import React, {useState} from 'react';
import axios from "axios";
import {redirect} from "react-router-dom";

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
        <div>
            <h2>Profil verwalten</h2>

            <br/>
            <form onSubmit={neuenNamenUebernehmen}>
                <label htmlFor="">neuer Benutzername: </label>
                <br/>
                <input type="name"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                />
                <br/>
                <label htmlFor="">neuen Namen bestätigen: </label>
                <br/>
                <input type="name"
                       value={nameBestaetigen}
                       onChange={(e) => setNameBestaetigen(e.target.value)}
                />
                <br/>
                <br/>
                <button type="submit">bestätigen</button>

            </form>
            <br/>
            <form onSubmit={neuesPasswortUebernehmen}>
                <label htmlFor="">neues Passwort: </label>
                <br/>
                <input type="password"
                       value={passwort}
                       onChange={(e) => setPasswort(e.target.value)}
                />
                <br/>
                <label htmlFor="">neues Passwort bestätigen</label>
                <br/>
                <input type="password"
                       value={passwortBestaetigen}
                       onChange={(e) => setPasswortBestaetigen(e.target.value)}
                />
                <br/>
                <br/>
                <button type="submit">bestätigen</button>

            </form>
            <hr/>
            <br/>
            <button onClick={benutzerLoeschen}>Benutzer löschen</button>
        </div>
    )
        ;
}

export default ProfilBearbeiten;