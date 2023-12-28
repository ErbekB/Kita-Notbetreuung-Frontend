import React, { useEffect, useState } from 'react';
import axios from "axios";

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


    function teilnahmeNichtNotwendig(kindId) {
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
        <div>
            <div>
                <h2>An Notbetreuung teilnehmend:</h2>
                {teilnehmendeKinder.length > 0 ? (
                    teilnehmendeKinder.map((kind, index) => (
                        <p key={index}>{kind.vorname} bisherige Teilnahmen: {kind.counter}
                            <button onClick={() => nichtTeilnehmen(kind.id)}>Teilnahme zurückziehen</button>
                        </p>
                    ))
                ) : <p>Es nehmen keine Kinder an der Notbetreuung teil.</p>}
            </div>
            <hr />
            <div>
                <h2>Kinder der Gruppe:</h2>
                {nichtTeilnehmendeKinder.length > 0 ? (
                    nichtTeilnehmendeKinder.map((kind, index) => (
                        <p key={kind.id}>
                            {kind.vorname} bisherige Teilnahmen: {kind.counter}
                            {index < maxAnzeigeButtons && id === kind.id && (
                                <button onClick={() => notbetreuungTeilnehmen(kind.id)}>Notbetreuung für Kind {kind.vorname} in Anspruch nehmen</button>
                            )}
                            {id === kind.id && (
                                <button onClick={() => teilnahmeAendern(kind.id)}>Nicht teilnehmen</button>
                            )}
                        </p>
                    ))
                ) : <p>Es sind keine Kinder in dieser Gruppe.</p>}
            </div>
        </div>
    );
}

export default ListeDerKinderDerGruppe;
