import React, {useState} from 'react';
import axios from "axios";
import {redirect} from "react-router-dom";

function ProfilBearbeiten(props) {
    const parentId = props
    const [name, setName] = useState("")
    const [passwort, setPasswort] = useState("")



    function benutzerLoeschen() {
        if (window.confirm("Sind Sie sicher, dass Sie Ihren Account löschen möchten?")) {
            axios.delete(`http://localhost:8080/userloeschen`, {withCredentials: true})
                .then(() => {
                    redirect("/login")
                })
                .catch(() => {
                    alert("Fehler beim Löschen des Accounts");
                });
        }
    }

  async  function neuenNamenUebernehmen(event) {
        /*axios.post("http://localhost:8080/abc", {username : name}, {withCredentials: true})
            .then(() => {

            })
            .catch(() => {
                alert("Fehler");
            });*/
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/abc", {
                username: name,

            }, {withCredentials: true});

        } catch (error) {

        }
    }

    function neuesPasswortUebernehmen() {
        axios.post(`http://localhost:8080/passwortAendern`, {passwort: passwort}, {withCredentials: true})
            .then(() => {
                redirect("/home")
            })
            .catch(() => {
                alert("Fehler");
            });
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
                <label htmlFor="">Benutzername bestätigen</label>
                <br/>
                <input type="name"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
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
                <label htmlFor="">Passwort bestätigen</label>
                <br/>
                <input type="password"
                       value={passwort}
                       onChange={(e) => setPasswort(e.target.value)}
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