import React, {useEffect, useState} from 'react';
import './Home.css';
import axios from "axios";


function Home() {
    const [data, setData] = useState([]);
    const [notbetreuung, setNotbetreuung] = useState();

    useEffect(() => {
        return async function fetchData() {
            await axios.get('http://localhost:8080/index/11')
                .then(response => {
                    setData(response.data.kindList);
                    setNotbetreuung(response.data.notbetreuung);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };
    }, []);

    const toggleNotbetreuung = async () => {
        try {
            await axios.post('http://localhost:8080/index/11');
            setNotbetreuung(notbetreuung => !notbetreuung);
        } catch (error) {
            console.error('Error toggling Notbetreuung:', error);
        }
    };

    return (
        <div className="Home">
            <h1>Startseite</h1>
            <button className="navItem" onClick={toggleNotbetreuung}>Notbetreuung</button>
            <h2>Heute ist Notbetreuung: {notbetreuung ? "Ja" : "Nein"}</h2>
            <p>Hier steht die Liste der Kinder aus der KitaGruppe die Notbetreuung benötigen:</p>
            {data.map((kind, index) => (
                <li key={index}>{kind.vorname} {kind.nachname}</li>
            ))}
        </div>
    );
}

export default Home;
