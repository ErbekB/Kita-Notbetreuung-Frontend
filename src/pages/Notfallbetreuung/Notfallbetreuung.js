import React from 'react';
import './Notfallbetreuung.css';
import ListeDerKinderDerGruppe from "./ListeDerKinderDerGruppe";
import axios from "axios";

function Notfallbetreuung() {
    return (
        <div className="Notfallbetreuung">
            <h1>Notbetreuung</h1>
            <ListeDerKinderDerGruppe/>
        </div>
    );
}

export default Notfallbetreuung;
