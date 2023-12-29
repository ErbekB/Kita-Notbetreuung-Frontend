import React, {useState, useEffect} from "react";
import axios from "axios";
import "./Admin.css"

function Admin() {
    const [elternListe, setElternListe] = useState([]);
    const [neuerElternName, setNeuerElternName] = useState("");
    const [neuesKindVornameEltern, setNeuesKindVornameEltern] = useState("");
    const [neuesKindNachnameEltern, setNeuesKindNachnameEltern] = useState("");
    const [neuesKindVorname, setNeuesKindVorname] = useState("");
    const [neuesKindNachname, setNeuesKindNachname] = useState("");
    const [selectedParentId, setSelectedParentId] = useState("");

    useEffect(() => {
        elternAbrufen();
    }, []);

    function elternAbrufen() {
        axios.get("http://localhost:8080/admin/eltern", {withCredentials: true})
            .then(response => {
                setElternListe(response.data.elternMitKindern);
            })
            .catch(error => {
                alert('Fehler beim Abrufen der Eltern');
            });
    }

    function elternteilHinzufuegen() {
        axios.post("http://localhost:8080/admin/eltern", {
            name: neuerElternName,
            kindVorname: neuesKindVornameEltern,
            kindNachname: neuesKindNachnameEltern
        }, {withCredentials: true})
            .then(() => {
                setNeuerElternName("");
                setNeuesKindVornameEltern("");
                setNeuesKindNachnameEltern("");
                elternAbrufen();
            })
            .catch(() => {
                alert("Fehler beim Hinzufügen des Elternteils");
            });
    }

    function elternLoeschen(parentId) {
        if (window.confirm("Sind Sie sicher, dass Sie diesen Elternteil löschen möchten?")) {
            axios.delete(`http://localhost:8080/admin/eltern/${parentId}`, {withCredentials: true})
                .then(() => {
                    elternAbrufen();
                })
                .catch(() => {
                    alert("Fehler beim Löschen des Elternteils");
                });
        }
    }

    function kindZuElternHinzufuegen() {
        if (!selectedParentId || !neuesKindVorname || !neuesKindNachname) {
            alert("Bitte wählen Sie einen Elternteil und geben Sie Vor- und Nachnamen des Kindes ein");
            return;
        }
        axios.post(`http://localhost:8080/admin/eltern/${selectedParentId}`, {
            vorname: neuesKindVorname,
            nachname: neuesKindNachname
        }, {withCredentials: true})
            .then(() => {
                setNeuesKindVorname("");
                setNeuesKindNachname("");
                elternAbrufen();
            })
            .catch(() => {
                alert("Fehler beim Hinzufügen des Kindes");
            });
    }

    function counterAktualisieren(kindId, neuerCounter) {
        if (window.confirm("Sind Sie sicher, dass Sie den Counter verändern möchten?")) {
            axios.put(`http://localhost:8080/admin/kind-counter/${kindId}`, {neuerCounter}, {withCredentials: true})
                .then(() => {
                    elternAbrufen();
                })
                .catch(() => {
                    alert("Fehler beim Aktualisieren des Counters");
                });
        }
    }

    return (
        <div className="admin-container">
            <h1 className="admin-title">Admin-Seite</h1>
            <div className="admin-section">
                <h2>Elternteil hinzufügen</h2>
                <input
                    type="text"
                    value={neuerElternName}
                    onChange={(e) => setNeuerElternName(e.target.value)}
                    placeholder="Name des Elternteils"
                />
                <input
                    type="text"
                    value={neuesKindVornameEltern}
                    onChange={(e) => setNeuesKindVornameEltern(e.target.value)}
                    placeholder="Vorname des Kindes"
                />
                <input
                    type="text"
                    value={neuesKindNachnameEltern}
                    onChange={(e) => setNeuesKindNachnameEltern(e.target.value)}
                    placeholder="Nachname des Kindes"
                />
                <button onClick={elternteilHinzufuegen}>Neues Elternteil hinzufügen</button>
            </div>
            <div className="admin-section">
                <h2>Kind zu Elternteil hinzufügen</h2>
                <div>
                    <select onChange={(e) => setSelectedParentId(e.target.value)} value={selectedParentId}
                            style={{marginRight: '10px'}}>
                        <option value="">Elternteil auswählen</option>
                        {elternListe.map((elternteil) => (
                            <option key={elternteil.elternId}
                                    value={elternteil.elternId}>{elternteil.elternName}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={neuesKindVorname}
                        onChange={(e) => setNeuesKindVorname(e.target.value)}
                        placeholder="Vorname des Kindes"
                        style={{marginRight: '10px'}}
                    />
                    <input
                        type="text"
                        value={neuesKindNachname}
                        onChange={(e) => setNeuesKindNachname(e.target.value)}
                        placeholder="Nachname des Kindes"
                        style={{marginRight: "10px"}}
                    />
                    <button onClick={kindZuElternHinzufuegen}>Kind hinzufügen</button>
                </div>
            </div>

            <div className="admin-section">
                <h2>Eltern und ihre Kinder</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Elternteil</th>
                        <th>Kind</th>
                        <th>Counter</th>
                        <th></th>
                        <th>Aktionen</th>
                    </tr>
                    </thead>
                    <tbody>
                    {elternListe.map((elternteil) => (
                        elternteil.kinder.map((kind, index) => (
                            <tr key={kind.kindId}>
                                {index === 0 && (
                                    <td rowSpan={elternteil.kinder.length}>
                                        {elternteil.elternName}
                                    </td>
                                )}
                                <td>{kind.vorname} {kind.nachname}</td>
                                <td className="counter-value">
                                    {kind.counter}
                                </td>
                                <td>
                                    <button className="button button-orange" onClick={() => counterAktualisieren(kind.kindId, kind.counter + 1)}>+
                                    </button>
                                    <button className="button button-dark-orange" onClick={() => counterAktualisieren(kind.kindId, kind.counter - 1)}>-
                                    </button>
                                </td>
                                {index === 0 && (
                                    <td rowSpan={elternteil.kinder.length}>
                                        <button className="button button-danger" onClick={() => elternLoeschen(elternteil.elternId)}>Mitglied Löschen
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;
