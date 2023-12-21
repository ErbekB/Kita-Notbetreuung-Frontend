import React, {useEffect, useState} from 'react';
import axios from "axios";
import async from "async";

function ListeDerKinderDerGruppe() {
    const [data, setData] = useState([])
    const [teilnahme, setTeilnahme] = useState([])
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


    const handleClick = async (kindId) => {
        try {
            axios.post(`http://localhost:8080/notfall/${kindId}`);
            const updatedData = data.map((kind) =>
                kind.id === kindId ? {...kind, teilnahmeNotbetreuung: true} : kind
            );
            setData(updatedData);
        } catch (error) {
            console.error('Error toggling Notbetreuung:', error);
        }
    };
    return (
        <div>
            <div>{data.map((kind, index) => (
                kind.teilnahmeNotbetreuung === true && <p key={index}>{kind.vorname}</p>
            ))}
            </div>
            <hr/>
            <div>{data.map((kind, index) => (
                    kind.teilnahmeNotbetreuung === false &&
                    (<p key={index}> {kind.vorname}
                            {(1 + 1) === kind.id && (
                                < button onClick={() => handleClick(kind.id)}>Notbetreuung für Kind {kind.vorname} in
                                    Anspruch
                                    nehmen</button>)}
                        </p>
                    )
                )
            )
            }
            </div>
        </div>
    );
}

export default ListeDerKinderDerGruppe;