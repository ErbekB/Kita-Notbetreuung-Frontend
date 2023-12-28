import React, { useEffect, useState } from 'react';
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
                    kind.id === kindId ? { ...kind, teilnahmeNotbetreuung: true, counter: kind.counter + 1 } : kind
                );
                setData(updatedData);
            })
            .catch(error => console.error('Error', error));
    }

    function nichtTeilnehmen(kindId) {
        axios.post(`http://localhost:8080/notfall/aendern/${kindId}`)
            .then(response => {
                const updatedData = data.map(kind =>
                    kind.id === kindId ? { ...kind, teilnahmeNotbetreuung: false, counter: kind.counter - 1 } : kind
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

    return (
        <div className="list-container">
            <h2 className="list-title">An Notbetreuung teilnehmend:</h2>
            <table className="kinder-table">
                <tbody>
                {teilnehmendeKinder.length > 0 ? (
                    teilnehmendeKinder.map((kind, index) => (
                        <tr key={index}>
                            <td>{kind.vorname} - bisherige Teilnahmen: {kind.counter}</td>
                            <td>
                                <button className="button button-danger" onClick={() => nichtTeilnehmen(kind.id)}>Teilnahme zurückziehen</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="2" className="no-kinder-message">Es nehmen keine Kinder an der Notbetreuung teil.</td>
                    </tr>
                )}
                </tbody>
            </table>

            <h2 className="list-title">Kinder der Gruppe:</h2>
            <table className="kinder-table">
                <tbody>
                {nichtTeilnehmendeKinder.length > 0 ? (
                    nichtTeilnehmendeKinder.map((kind, index) => (
                        kind.notbetreuungNichtNotwendig === false &&
                        <tr key={kind.id}>
                            <td>{kind.vorname} - bisherige Teilnahmen: {kind.counter}</td>
                            <td>
                                {index < maxAnzeigeButtons && id === kind.id && (
                                    <button className="button" onClick={() => notbetreuungTeilnehmen(kind.id)}>Notbetreuung für Kind {kind.vorname} in Anspruch nehmen</button>
                                )}
                                {id === kind.id && (
                                    <button className="button button-danger" onClick={() => teilnahmeAendern(kind.id)}>Nicht teilnehmen</button>
                                )}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="2" className="no-kinder-message">Es sind keine Kinder in dieser Gruppe.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}



export default ListeDerKinderDerGruppe;
