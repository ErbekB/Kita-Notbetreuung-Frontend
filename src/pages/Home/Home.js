import React, {useEffect, useState} from 'react';
import './Home.css';
import axios from 'axios';

function Home() {
    const [data, setData] = useState([]);
    const [admin, setAdmin] = useState();
    const [kitaGruppe, setKitagruppe] = useState();
    const [notbetreuung, setNotbetreuung] = useState();

    useEffect(() => {
        return async function fetchData() {
            await axios
                .get('http://localhost:8080/index', {withCredentials: true})
                .then((response) => {
                    setData(response.data.kindList);
                    setAdmin(response.data.admin);
                    setKitagruppe(response.data.name);
                    setNotbetreuung(response.data.notbetreuung);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        };
    },);

    const toggleNotbetreuung = async () => {
        try {
            await axios.post('http://localhost:8080/index', '', {withCredentials: true});
            setNotbetreuung((notbetreuung) => !notbetreuung);
        } catch (error) {
            console.error('Fehler beim Umschalten der Notbetreuung:', error);
        }
    };

    data.sort((a, b) => a.counter - b.counter);

    const getRowColor = (index) => {
        if (index < 5) {
            return 'green-row'; // CSS class for green rows
        } else if (index < 10) {
            return 'yellow-row'; // CSS class for yellow rows
        } else {
            return 'red-row'; // CSS class for red rows
        }
    };

    return (
        <div className="home-body">
            <div className="home-container">
                <h1 className="home-title">Startseite</h1>
                <h2 className={notbetreuung ? "notbetreuung-anzeige red-text" : "notbetreuung-anzeige standard-text"}>
                    {notbetreuung ? "Morgen ist Notbetreuung" : "Keine Notbetreuung"}
                </h2>
                {admin ? <button onClick={toggleNotbetreuung}>Notbetreuung</button> : ''}
                <br/>
                <p>{kitaGruppe}</p>
                <table className="kindergruppe-table">
                    <thead>
                    <tr>
                        <th className="kind">Name</th>
                        <th className="kind">Nachname</th>
                        <th className="teilnahmen">Teilnahme</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((kind, index) => (
                        <tr key={index} className={getRowColor(index)}>
                            <td className="kind">{kind.vorname}</td>
                            <td className="kind">{kind.nachname}</td>
                            <td className="teilnahmen">{kind.counter}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default Home;
