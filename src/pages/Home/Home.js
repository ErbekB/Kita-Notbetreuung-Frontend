import React, {useEffect, useState} from 'react';
import './Home.css';
import axios from 'axios';

function Home() {
    const [data, setData] = useState([]);
    const [admin, setAdmin] = useState();
    const [notbetreuung, setNotbetreuung] = useState(false);
    const [verlauf, setVerlauf] = useState([]);
    const [anzeigen, setAnzeigen] = useState(false);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8080/index', {withCredentials: true});
                setData(response.data.kindList);
                setAdmin(response.data.admin);
                setNotbetreuung(response.data.notbetreuung);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        async function statusVerlauf() {
            try {
                const response = await axios.get('http://localhost:8080/verlauf', {withCredentials: true});
                setVerlauf(response.data.verläufe);
                if (response.data.verläufe) {
                    setVerlauf(response.data.verläufe);
                } else {
                    setVerlauf([]);
                }
            } catch (error) {
                console.error('Error fetching Statusverlauf:', error);
            }
        }

        fetchData();
        statusVerlauf();
    }, []);

    const toggleNotbetreuung = async () => {
        try {
            await axios.post('http://localhost:8080/index', '', {withCredentials: true});
            setNotbetreuung((notbetreuung) => !notbetreuung);
        } catch (error) {
            console.error('Fehler beim Umschalten der Notbetreuung:', error);
        }
    };

    data.sort((a, b) => a.counter - b.counter);


    function aufklappen() {
        setAnzeigen(!anzeigen);
    }

    return (
        <div className="home-body">
            <div className="home-container">
                <h1 className="home-title">Startseite</h1>
                {data.length > 0 ? (
                    <>
                        <h2 className={notbetreuung ? "notbetreuung-anzeige red-text" : "notbetreuung-anzeige standard-text"}>
                            {notbetreuung ? "Heute findet die Notbetreuung statt" : "Keine Notbetreuung"}
                        </h2>
                        {admin ? <button onClick={toggleNotbetreuung}>Notbetreuung umschalten</button> : ''}
                        <br/>
                        <table className="kindergruppe-table">
                            <thead>
                            <tr>
                                <th className="kind">Name</th>
                                <th className="kind">Nachname</th>
                                <th className="teilnahmen">Teilnahme/n</th>
                                <th className="punkt"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((kind, index) => (
                                <tr key={index}>
                                    <td className="kind">{kind.vorname}</td>
                                    <td className="kind">{kind.nachname}</td>
                                    <td className="teilnahmen">{kind.counter}</td>
                                    {index < 5 && <td className="punkt">🟢</td>}
                                    {index >= 5 && index < 8 && <td className="punkt">🟡</td>}
                                    {index >= 8 && <td className="punkt">🔴</td>}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <div className="anleitung-text">
                        <h3>Keine Kinder in der KitaGruppe vorhanden</h3>
                        <p>Um die Funktionalitäten der Plattform nutzen zu können, muss der registrierte Administrator zuerst Kinder zur KitaGruppe hinzufügen. Befolgen Sie diese Schritte, um Kinder hinzuzufügen:</p>
                        <ol>
                            <li>Loggen Sie sich mit Ihrem Admin-Konto ein.</li>
                            <li>Navigieren Sie zum <strong>Admin-Panel</strong>, indem Sie auf den Reiter <strong><i className="fas fa-user-cog"></i></strong> oben in der Menüleiste klicken.</li>
                            <li>Im <strong>Admin-Panel</strong> finden Sie den Bereich <strong>"Kind zu Elternteil hinzufügen"</strong>.</li>
                            <li>Fügen Sie zuerst Ihr eigenes Kind hinzu, um die Grundfunktionalitäten freizuschalten.</li>
                            <li>Nachdem Sie Ihr Kind hinzugefügt haben, können Sie weitere Kinder der KitaGruppe sowie jeweils ein Elternteil für jedes Kind im Bereich <strong>"Elternteil hinzufügen"</strong> hinzufügen.</li>
                            <li>Die neu erstellten Eltern können sich mit dem Benutzernamen und dem Namen der KitaGruppe als Passwort einloggen. Es wird dringend empfohlen, dass sie ihr Passwort nach dem ersten Login unter dem Reiter <strong>Profil verwalten</strong> ändern.</li>
                        </ol>
                        <p>Bitte beachten Sie, dass nur registrierte Administratoren diese Aktionen durchführen können.</p>
                    </div>

                )}

                <br/>
                {verlauf && verlauf.length > 0 &&
                    <table>
                        <thead>
                        <tr>
                            <th className="historie">Historie</th>
                        </tr>
                        </thead>
                        <tbody>
                        {verlauf.map((eintrag) => (
                            <tr>
                                <td>
                                    <span className="datum" onClick={aufklappen}>{eintrag.datum}</span>
                                    {anzeigen && <span>{eintrag.kinder.map((kind) => (
                                        <p>{kind.vorname} {kind.nachname}</p>))}</span>}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>}
            </div>
        </div>
    );
}


export default Home;

