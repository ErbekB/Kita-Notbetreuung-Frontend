import React, {useEffect, useState} from 'react';
import axios from "axios";
import async from "async";

function ListeDerKinderDerGruppe() {
    const [data, setData] = useState([])
    const [counter, setCounter] = useState(0)
    /*const {user} = props*/
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/notfall/1')

                setData(response.data.kinder);
                console.log("hallo");
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    function notbetreuungTeilnehmen (kindId) {
        try {
            axios.post(`http://localhost:8080/notfall/${kindId}`);
            const updatedData = data.map((kind) =>
                kind.id === kindId ? {...kind, teilnahmeNotbetreuung: true, counter : kind.counter +1} : kind
            );
            setData(updatedData);
            console.log(data)
            } catch (error) {
            console.error('Error', error);
        }
    };

    function nichtTeilnehmen(kindId) {
        try {
            axios.post(`http://localhost:8080/notfall/aendern/${kindId}`);
            const updatedData = data.map((kind) =>
                kind.id === kindId ? {...kind, teilnahmeNotbetreuung: false, counter: kind.counter - 1} : kind
            );

            setData(updatedData);
        } catch (error) {
            console.error('Error', error);
        }
    }


    function teilnahmeAendern(kindId) {
        const bestaetigen = window.confirm("Bitte bestätige die nicht-Teilnahme deines Kindes. Eine Änderung ist dannach nur noch durch den Administrator möglich");
        if (bestaetigen){
        try {
            axios.post(`http://localhost:8080/notfall/teilnahme/${kindId}`);
            const temporalData = data.filter((kind) => kind.id !== kindId);
            setData(temporalData);
        } catch (error) {
            console.error('Error', error);
        }
        }
        else {

        }
    }

    return (
        <div>
            <div><h2>
                an Notbetreuung teilnehmend:
            </h2>{data.map((kind, index) => (
                kind.teilnahmeNotbetreuung === true && <p key={index}>{kind.vorname} bisherige Teilnahmen{kind.counter}<button onClick={() => nichtTeilnehmen(kind.id)}>Teilnahme zurückziehen </button></p>
            ))}
            </div>
            <hr/>
            <div><h2>
            Kinder der Gruppe
            </h2>
                {data.map((kind, index) => (
                    kind.teilnahmeNotbetreuung === false && <p key={index}> {kind.vorname} bisherige Teilnahmen: {kind.counter}
                            {(1 + 1) === kind.id &&
                                <button onClick={() => notbetreuungTeilnehmen(kind.id)}>Notbetreuung für Kind {kind.vorname} in
                                    Anspruch
                                    nehmen
                                </button>}
                        {(1 + 1) === kind.id &&
                        <button onClick={() => teilnahmeAendern(kind.id)}>nicht teilnehmen</button>}
                                </p>
                                ))
                }
            </div>
        </div>
    );
}

export default ListeDerKinderDerGruppe;