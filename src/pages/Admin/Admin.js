import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Admin() {
    const [elternListe, setElternListe] = useState([]);
    const [neuerElternName, setNeuerElternName] = useState('');
    const [kindZuElternVorname, setKindZuElternVorname] = useState('');
    const [kindZuElternNachname, setKindZuElternNachname] = useState('');
    const [selectedParentId, setSelectedParentId] = useState('');

    useEffect(() => {
        elternAbrufen();
    }, []);

    function elternAbrufen() {
        axios.get('http://localhost:8080/admin/eltern', {withCredentials: true})
            .then(response => {
                setElternListe(response.data.elternMitKindern); // Anpassung an die neue Antwortstruktur
            })
            .catch(error => {
                alert('Fehler beim Abrufen der Eltern');
            });
    }

    function elternteilHinzufuegen() {
        axios.post('http://localhost:8080/admin/eltern', {
            name: neuerElternName,
            kindVorname: kindZuElternVorname,
            kindNachname: kindZuElternNachname
        }, {withCredentials: true})
            .then(() => {
                setNeuerElternName('');
                setKindZuElternVorname('');
                setKindZuElternNachname('');
                elternAbrufen();
            })
            .catch(() => {
                alert('Fehler beim Hinzufügen des Elternteils');
            });
    }

    function elternteilLoeschen(parentId) {
        axios.delete(`http://localhost:8080/admin/eltern/${parentId}`, {withCredentials: true})
            .then(() => {
                elternAbrufen();
            })
            .catch(() => {
                alert('Fehler beim Löschen des Elternteils');
            });
    }

    function kindZuElternHinzufuegen() {
        if (!selectedParentId || !kindZuElternVorname || !kindZuElternNachname) {
            alert('Bitte wählen Sie einen Elternteil und geben Sie Vor- und Nachnamen des Kindes ein');
            return;
        }
        axios.post(`http://localhost:8080/admin/eltern/${selectedParentId}/kind-hinzufuegen`, {
            vorname: kindZuElternVorname,
            nachname: kindZuElternNachname
        }, {withCredentials: true})
            .then(() => {
                setKindZuElternVorname('');
                setKindZuElternNachname('');
                elternAbrufen();
            })
            .catch(() => {
                alert('Fehler beim Hinzufügen des Kindes');
            });
    }

    return (
        <div>
            <h1>Admin-Seite</h1>
            <div>
                <h2>Elternteil hinzufügen</h2>
                <input
                    type="text"
                    value={neuerElternName}
                    onChange={(e) => setNeuerElternName(e.target.value)}
                    placeholder="Name des Elternteils"
                />
                <input
                    type="text"
                    value={kindZuElternVorname}
                    onChange={(e) => setKindZuElternVorname(e.target.value)}
                    placeholder="Vorname des Kindes"
                />
                <input
                    type="text"
                    value={kindZuElternNachname}
                    onChange={(e) => setKindZuElternNachname(e.target.value)}
                    placeholder="Nachname des Kindes"
                />
                <button onClick={elternteilHinzufuegen}>Neues Elternteil hinzufügen</button>
            </div>
            <div>
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
                        value={kindZuElternVorname}
                        onChange={(e) => setKindZuElternVorname(e.target.value)}
                        placeholder="Vorname des Kindes"
                        style={{marginRight: '10px'}}
                    />
                    <input
                        type="text"
                        value={kindZuElternNachname}
                        onChange={(e) => setKindZuElternNachname(e.target.value)}
                        placeholder="Nachname des Kindes"
                        style={{marginRight: '10px'}}
                    />
                    <button onClick={kindZuElternHinzufuegen}>Kind hinzufügen</button>
                </div>
            </div>

            <div>
                <h2>Elternliste</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Elternteil</th>
                        <th>Kind</th>
                        <th>Aktionen</th>
                        <th>Counter</th>
                    </tr>
                    </thead>
                    <tbody>
                    {elternListe.map((elternteil) => (
                        <tr key={elternteil.elternId}>
                            <td>{elternteil.elternName}</td>
                            <td>
                                {elternteil.kinder.map((kind, index) => (
                                    <div key={index}>{kind.vorname} {kind.nachname}</div>
                                ))}
                            </td>
                            <td>
                                <button onClick={() => elternteilLoeschen(elternteil.elternId)}>Elternteil löschen
                                </button>
                            </td>
                            <td>{/* Counter und Logik zur Aktualisierung hier einfügen */}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;
