import React, {useEffect, useState} from 'react';
import axios from "axios";

function ListeDerKinderDerGruppe() {
    const [data, setData] = useState([])
    const [teilnahme, setTeilnahme] = useState([])
    /*const {user} = props*/
    useEffect(() => {
        return function fetchData() {
            axios.get('http://localhost:8080/notfall/1')
                .then(response => {
                    setData(response.data.kinder);
                    console.log("hallo")
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };
    }, []);


const handleClick = async () => {
   /* try {
        const response = await axios.post('http://localhost:8080//notfall/1', {
            kindId: id,

        });

        setTeilnahme([...teilnahme, response.data]);

        console.log(`Notbetreuung für Kind ${id} in Anspruch genommen.`);
    } catch (error) {
        console.error('Error adding Teilnahme:', error);
    }*/
};
return (

        <div>{data.map((kind, index) => (
            <p key={index}> {kind.vorname}
                { (1+1) === kind.id &&
                    < button onClick={()=>handleClick()}>Notbetreuung für Kind {kind.vorname} in Anspruch
                        nehmen</button>}

            </p> //name={item.name} url={item.url}
        ))}
        </div>

    )


}

export default ListeDerKinderDerGruppe;