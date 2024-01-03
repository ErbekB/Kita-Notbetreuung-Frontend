import React, {useEffect, useState} from 'react';
import './Home.css';
import axios from 'axios';

function Home() {
    const [data, setData] = useState([]);
    const [admin, setAdmin] = useState();
    const [notbetreuung, setNotbetreuung] = useState();
    const [verlauf, setVerlauf] = useState([]);


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

        fetchData();

        axios.get("http://localhost:8080/verlauf", {withCredentials: true})
            .then(response => {
                setVerlauf(response.data.verläufe.kinder);
                console.log(verlauf)
            })
            .catch (error =>{
            console.error('Error fetching data:', error);
        })
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
            <br/>
            {verlauf && (
            <table>
                <thead>
                <tr>
                    <th className="datum">Datum</th>
                    <th className="kinder">Teilgenommen</th>
                </tr>
                </thead>
                <tbody>
                {verlauf.map((eintrag, index) => (
                    <tr key={index}>
                      <td className="datum">{eintrag.datum}</td>
                      <td className="kinder">{eintrag.kinder}</td>
                    </tr>
                    ))}
                </tbody>
            </table>)}
        </div>
    </div>
);
}


export default Home;
