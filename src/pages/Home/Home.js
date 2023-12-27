import React, {useEffect, useState} from 'react';
import './Home.css';
import './Calendar.css'
import Calendar from 'react-calendar';
import axios from "axios";

function Home() {
    const [data, setData] = useState([]);
    const [admin, setAdmin] = useState();
    const [kitaGruppe, setKitagruppe] = useState();
    const [date, setDate] = useState(new Date());
    const [notbetreuung, setNotbetreuung] = useState();

    useEffect(() => {
        return async function fetchData() {
            await axios.get('http://localhost:8080/index', {withCredentials : true})
                .then(response => {
                    setData(response.data.kindList);
                    setAdmin(response.data.admin);
                    setKitagruppe(response.data.name);
                    setNotbetreuung(response.data.notbetreuung);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };
    }, []);

    const toggleNotbetreuung = async () => {
        try {
            await axios.post('http://localhost:8080/index',{withCredentials : true});
            setNotbetreuung(notbetreuung => !notbetreuung);
        } catch (error) {
            console.error('Error toggling Notbetreuung:', error);
        }
    };

    data.sort((a, b) => a.counter - b.counter);

    return (
        <div className="Home">
            <h1>Startseite</h1>
            {admin ? <div className='calendar-container'>
                <Calendar onChange={setDate} value={date}/>
            </div> : ""}
            <h2>Heute ist Notbetreuung: {notbetreuung ? "Ja" : "Nein"}</h2>
            <p>{kitaGruppe}</p>
            {data.map((kind, index) => (
                <li key={index}>{kind.vorname} {kind.nachname}</li>
            ))}

        </div>
    );
}

export default Home;
