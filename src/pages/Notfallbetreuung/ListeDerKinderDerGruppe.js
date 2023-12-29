import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./Notfallbetreuung.css"

function ListeDerKinderDerGruppe() {
    const [data, setData] = useState([]);
    const [id, setId] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/notfall', {withCredentials: true});
                setId(response.data.userId);
                setData(response.data.kinder);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    function notbetreuungTeilnehmen(kindId) {
        axios.post(`http://localhost:8080/notfall/${kindId}`)
            .then(response => {
                const updatedData = data.map(kind =>
                    kind.id === kindId ? {...kind, teilnahmeNotbetreuung: true, counter: kind.counter + 1} : kind
                );
                setData(updatedData);
            })
            .catch(error => console.error('Error', error));
    }

    function nichtTeilnehmen(kindId) {
        axios.post(`http://localhost:8080/notfall/aendern/${kindId}`)
            .then(response => {
                const updatedData = data.map(kind =>
                    kind.id === kindId ? {...kind, teilnahmeNotbetreuung: false, counter: kind.counter - 1} : kind
                );
                setData(updatedData);
            })
            .catch(error => console.error('Error', error));
    }

    function teilnahmeAendern(kindId) {
        const bestaetigen = window.confirm("Bitte bestätige die nicht-Teilnahme deines Kindes. Eine Änderung ist dannach nur noch durch den Administrator möglich");
        if (bestaetigen) {
            axios.post(`http://localhost:8080/notfall/teilnahme/${kindId}`)
                .then(response => {
                    const temporalData = data.filter(kind => kind.id !== kindId);
                    setData(temporalData);
                })
                .catch(error => console.error('Error', error));
        }
    }

    const teilnehmendeKinder = data.filter(kind => kind.teilnahmeNotbetreuung);
    const nichtTeilnehmendeKinder = data.filter(kind => !kind.teilnahmeNotbetreuung);

    // Berechnen, wie viele Kinder den Button angezeigt bekommen
    const maxAnzeigeButtons = 5 - teilnehmendeKinder.length;
    data.sort((a, b) => a.counter - b.counter);


    return (
        <div className="kindergruppe-container">
            <h1 className="kindergruppe-title">Liste der Kinder der Gruppe</h1>

            <div className="kindergruppe-section">
                <h2 className="kindergruppe-section-title">An Notbetreuung teilnehmend:</h2>
                <table className="kindergruppe-table">
                    <thead>
                    {teilnehmendeKinder.length > 0 && (
                        <tr>
                            <th className="kind">Kind</th>
                            <th className="teilnahmen">Teilnahmen</th>
                            <th className="aktion">Aktion</th>
                        </tr>
                    )}
                    </thead>
                    <tbody>
                    {teilnehmendeKinder.map((kind, index) => (
                        <tr key={index}>
                            <td className="kind">{kind.vorname} {kind.nachname}</td>
                            <td className="teilnahmen">{kind.counter}</td>
                            <td className="aktion">
                                <button className="button button-danger" onClick={() => nichtTeilnehmen(kind.id)}>Teilnahme zurückziehen</button>
                            </td>
                        </tr>
                    ))}
                    {teilnehmendeKinder.length === 0 && (
                        <tr>
                            <td colSpan="3" className="no-kinder-message">Es nehmen keine Kinder an der Notbetreuung teil.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <div className="kindergruppe-section">
                <h2 className="kindergruppe-section-title">Kinder der Gruppe:</h2>
                <table className="kindergruppe-table">
                    <thead>
                    {nichtTeilnehmendeKinder.length > 0 && (
                        <tr>
                            <th className="kind">Kind</th>
                            <th className="teilnahmen">Bisherige Teilnahmen</th>
                            <th className="aktion">Aktion</th>
                        </tr>
                    )}
                    </thead>
                    <tbody>
                    {nichtTeilnehmendeKinder.map((kind, index) => (
                        kind.notbetreuungNichtNotwendig === false &&
                        <tr key={kind.id}>
                            <td className="kind">{kind.vorname} {kind.nachname}</td>
                            <td className="teilnahmen">{kind.counter}</td>
                            <td className="aktion">
                                {index < maxAnzeigeButtons && id === kind.id && (
                                    <button className="button" onClick={() => notbetreuungTeilnehmen(kind.id)}>Teilnehmen</button>
                                )}
                                {id === kind.id && (
                                    <button className="button button-danger" onClick={() => teilnahmeAendern(kind.id)}>Nicht teilnehmen</button>
                                )}
                            </td>
                        </tr>
                    ))}
                    {nichtTeilnehmendeKinder.length === 0 && (
                        <tr>
                            <td colSpan="3" className="no-kinder-message">Es sind keine Kinder in dieser Gruppe.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}



export default ListeDerKinderDerGruppe;
