import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./Notfallbetreuung.css"

function ListeDerKinderDerGruppe() {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState(0);
    const [status, setStatus] = useState(false)
    const [abstimmungAbgeschlossen, setAbstimmungAbgeschlossen] = useState(false);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8080/notfall', {withCredentials: true});
                if (Array.isArray(response.data.kinder)) {
                    // Sortieren Sie die Daten, bevor Sie sie setzen
                    const sortedData = response.data.kinder.sort((a, b) => a.counter - b.counter);
                    setData(sortedData);
                } else {
                    // Setzen Sie Daten als leeres Array, wenn die Antwort kein Array ist
                    setData([]);
                }
                setUserId(response.data.userId);
                setStatus(response.data.statusNotbetreuung);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        async function statusAbstimmungNotbetreuung() {
            try {
                const response = await axios.get('http://localhost:8080/notfall/notbetreuung', {withCredentials: true});
                setAbstimmungAbgeschlossen(response.data.abstimmungAbgeschlossen);
            } catch (error) {
                console.error('Error fetching abstimmung status:', error);
            }
        }

        fetchData();
        statusAbstimmungNotbetreuung();
    }, []);


    function notbetreuungTeilnehmen(kindId) {
        axios.post(`http://localhost:8080/notfall/${kindId}`, {}, {withCredentials: true})
            .then(response => {
                const updatedData = data.map(kind =>
                    kind.id === kindId ? {...kind, teilnahmeNotbetreuung: true, counter: kind.counter + 1} : kind
                );
                setData(updatedData);
            })
            .catch(error => console.error('Error', error));
    }

    // function nichtTeilnehmen(kindId) {
    //     axios.post(`http://localhost:8080/notfall/aendern/${kindId}`, {}, {withCredentials: true})
    //         .then(response => {
    //             const updatedData = data.map(kind =>
    //                 kind.id === kindId ? {...kind, teilnahmeNotbetreuung: false, counter: kind.counter - 1} : kind
    //             );
    //             setData(updatedData);
    //         })
    //         .catch(error => console.error('Error', error));
    // }

    function teilnahmeAusschliessen(kindId) {
        const bestaetigen = window.confirm("Bitte bestätige die nicht-Teilnahme deines Kindes. Eine Änderung ist dannach nur noch durch den Administrator möglich");
        if (bestaetigen) {
            axios.post(`http://localhost:8080/notfall/teilnahme/${kindId}`, {}, {withCredentials: true})
                .then(response => {
                    const temporalData = data.filter(kind => kind.id !== kindId);
                    setData(temporalData);
                })
                .catch(error => console.error('Error', error));
        }
    }

    const abstimmungAbschließen = () => {
        axios.post('http://localhost:8080/notfall/notbetreuung', {}, {withCredentials: true})
            .then(response => {
                setAbstimmungAbgeschlossen(true);
            })
            .catch(error => {
                console.error('Fehler beim Senden der Abstimmung', error);
            });
    };


    const teilnehmendeKinder = data ? data.filter(kind => kind.teilnahmeNotbetreuung) : [];
    const nichtTeilnehmendeKinder = data ? data.filter(kind => !kind.teilnahmeNotbetreuung) : [];

    // Berechnen, wie viele Kinder den Button angezeigt bekommen
    const maxAnzeigeButtons = 5 - teilnehmendeKinder.length;

    const verlaufSpeichern = async () => {
        try {
            await axios.post('http://localhost:8080/verlauf/speichern', '', {withCredentials: true});

        } catch (error) {
            console.error('Fehler speichern des Verlaufs', error);
        }
    };
    const buttonVereinen =  () =>{
        const bestaetigen = window.confirm("Bitte bestätige den Abschluss der Abstimmung. Eine Änderung ist danach nicht mehr möglich");
        if (bestaetigen){
        abstimmungAbschließen()
        verlaufSpeichern()
    }
    }

    return (
        <div>
            {data.length > 0 ? (
                <>
                    <div>{status === true && (
                        <div>
                            <div className="kindergruppe-body">
                                <div className="kindergruppe-container">
                                    <h1 className="kindergruppe-title">Notbetreuung</h1>


                                    <div className="kindergruppe-section">
                                        <div>
                                            {!abstimmungAbgeschlossen && (
                                                <button onClick={buttonVereinen}>Abstimmung für Notbetreuung
                                                    abschließen</button>
                                            )}

                                            {abstimmungAbgeschlossen && (
                                                <div>Die Abstimmung für die heutige Notbetreuung ist
                                                    abgeschlossen.</div>
                                            )}
                                        </div>
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
                                                        {!abstimmungAbgeschlossen && (
                                                            <button className="button button-danger"
                                                                    onClick={() => teilnahmeAusschliessen(kind.id)}>Teilnahme
                                                                zurückziehen
                                                            </button>)}
                                                    </td>
                                                </tr>
                                            ))}
                                            {teilnehmendeKinder.length === 0 && (
                                                <tr>
                                                    <td colSpan="3" className="no-kinder-message">Es nehmen keine Kinder
                                                        an der
                                                        Notbetreuung
                                                        teil.
                                                    </td>
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
                                                        {!abstimmungAbgeschlossen && (
                                                            <>
                                                                {index < maxAnzeigeButtons && userId === kind.elternId && (
                                                                    <button className="button"
                                                                            onClick={() => notbetreuungTeilnehmen(kind.id)}>Teilnehmen</button>
                                                                )}
                                                                {userId === kind.elternId && (
                                                                    <button className="button button-danger"
                                                                            onClick={() => teilnahmeAusschliessen(kind.id)}>Nicht
                                                                        teilnehmen</button>
                                                                )}
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                            {nichtTeilnehmendeKinder.length === 0 && (
                                                <tr>
                                                    <td colSpan="3" className="no-kinder-message">Es sind keine Kinder
                                                        in dieser
                                                        Gruppe.
                                                    </td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                        {status === false &&
                            <div className="kindergruppe-body">
                                <div className="kindergruppe-container">
                                    <h1 className="title">Heute findet keine Notbetreuung statt</h1>
                                </div>
                            </div>
                        }
                    </div>
                </>
            ) : (
                <div className="kindergruppe-body">
                    <div className="kindergruppe-container">
                        <h1 className="kindergruppe-title">Notbetreuung</h1>
                        <div className="anleitung-text">
                            <h3>Keine Kinder in der KitaGruppe vorhanden</h3>
                            <p>Um die Funktionalitäten der Plattform nutzen zu können, muss der registrierte
                                Administrator
                                zuerst Kinder zur KitaGruppe hinzufügen. Befolgen Sie diese Schritte, um Kinder
                                hinzuzufügen:</p>
                            <ol>
                                <li>Loggen Sie sich mit Ihrem Admin-Konto ein.</li>
                                <li>Navigieren Sie zum <strong>Admin-Panel</strong>, indem Sie auf den
                                    Reiter <strong><i
                                        className="fas fa-user-cog"></i></strong> oben in der Menüleiste
                                    klicken.
                                </li>
                                <li>Im <strong>Admin-Panel</strong> finden Sie den Bereich <strong>"Kind zu
                                    Elternteil
                                    hinzufügen"</strong>.
                                </li>
                                <li>Fügen Sie zuerst Ihr eigenes Kind hinzu, um die Grundfunktionalitäten
                                    freizuschalten.
                                </li>
                                <li>Nachdem Sie Ihr Kind hinzugefügt haben, können Sie weitere Kinder der
                                    KitaGruppe sowie
                                    jeweils ein Elternteil für jedes Kind im Bereich <strong>"Elternteil
                                        hinzufügen"</strong> hinzufügen.
                                </li>
                                <li>Die neu erstellten Eltern können sich mit dem Benutzernamen und dem Namen
                                    der KitaGruppe als
                                    Passwort einloggen. Es wird dringend empfohlen, dass sie ihr Passwort nach
                                    dem ersten Login
                                    unter dem Reiter <strong>Profil verwalten</strong> ändern.
                                </li>
                            </ol>
                            <p>Bitte beachten Sie, dass nur registrierte Administratoren diese Aktionen
                                durchführen können.</p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );


}

export default ListeDerKinderDerGruppe;
