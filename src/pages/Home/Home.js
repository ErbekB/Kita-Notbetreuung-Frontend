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
            await axios.get('http://localhost:8080/index', {withCredentials: true})
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
            await axios.post('http://localhost:8080/index', "", {withCredentials: true});
            setNotbetreuung((notbetreuung) => !notbetreuung);
        } catch (error) {

            console.error('Fehler beim Umschalten der Notbetreuung:', error);
        }
    };

    const onChange = date => {
        setDate(date)
    };

    data.sort((a, b) => a.counter - b.counter);

    // ...

    return (
        <div className="home-body">
            <div className="home-container">
                <h1 className="home-title">Startseite</h1>
                {admin ? <div className='calendar-container'><Calendar onChange={onChange} value={date}/></div> : ""}
                <h2 className="home-benachrichtigung">Notbetreuung am: {date.toLocaleDateString('de-DE')}</h2>
                {admin ? <button onClick={toggleNotbetreuung}>Notbetreuung</button> : ""}
                <p>{kitaGruppe}</p>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Nachname</th>
                        <th>Teilnahme</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((kind, index) => (
                        <tr key={index}>
                            <td>{kind.vorname}</td>
                            <td>{kind.nachname}</td>
                            <td>{kind.counter}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default Home;
