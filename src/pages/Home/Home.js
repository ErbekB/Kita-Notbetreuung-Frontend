import React, {useEffect, useState} from 'react';
import './Home.css';
import axios from 'axios';

function Home() {
    const [data, setData] = useState([]);
    const [admin, setAdmin] = useState();
    const [notbetreuung, setNotbetreuung] = useState();


    useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        axios.get('http://localhost:8080/index', {withCredentials: true})
            .then((response) => {
                setData(response.data.kindList);
                setAdmin(response.data.admin);
                setNotbetreuung(response.data.notbetreuung);

            })
            .catch((error) => {
                alert('Fehler beim Abrufen der Eltern');
            });
    }

const toggleNotbetreuung = async () => {
    try {
        await axios.post('http://localhost:8080/index', '', {withCredentials: true});
        setNotbetreuung((notbetreuung) => !notbetreuung);
    } catch (error) {
        console.error('Fehler beim Umschalten der Notbetreuung:', error);
    }
};

data.sort((a, b) => a.counter - b.counter);

return (
    <div className="home-body">
        <div className="home-container">
            <h1 className="home-title">Startseite</h1>
            <h2 className={notbetreuung ? "notbetreuung-anzeige red-text" : "notbetreuung-anzeige standard-text"}>
                {notbetreuung ? "Morgen ist Notbetreuung" : "Keine Notbetreuung"}
            </h2>
            {admin ? <button onClick={toggleNotbetreuung}>Notbetreuung</button> : ''}
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
                        {index < 5 && (
                            <td className="punkt">🟢</td>
                        )}
                        {index >= 5 && index < 8 && (
                            <td className="punkt">🟡</td>
                        )}
                        {index >= 8 && (
                            <td className="punkt">🔴</td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
);
}


export default Home;
