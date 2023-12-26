import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import async from "async";

function Header() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        return async function fetchData() {
            await axios.get("http://localhost:8080/index/11")
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.error("Error beim laden der Daten:", error);
                });
        };
    }, []);

    const logout = async () => {
        try {
            await axios.post("http://localhost:8080/logout",
                {},
                {withCredentials: true });
            navigate(("/login"))
        } catch (error) {
            console.error("Logout Fehler:", error)
        }

    }


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
                        <button className="navItem" onClick={logout}>Logout</button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Header;