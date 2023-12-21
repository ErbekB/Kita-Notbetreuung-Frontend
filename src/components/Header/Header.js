import React, {useEffect, useState} from 'react';
import axios from "axios";

function Header() {
    const [data, setData] = useState([]);

    useEffect(() => {
        return async function fetchData() {
            await axios.get('http://localhost:8080/index/11')
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };
    }, []);


    return (
        <div>
            <header>
                <h2>Kitaorganisation</h2>
            </header>
            <div>
                <div className="navButtons">
                    <a href="../Notfallbetreuung">
                        <button className="navItem">Notbetreuung verwalten</button>
                    </a>
                    <a href="../">
                        <button className="navItem">Home</button>
                    </a>
                    {data.admin ? <a href="../Admin">
                        <button className="navItem">Admin</button>
                    </a> : ""}
                    <a href="../Logout">
                        <button className="navItem">Logout</button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Header;