import React, { useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';

import {
    Container
} from 'react-bootstrap';

function Home() {
    const [home, setHome] = useState('');

    useEffect(() => {
        axios.get('/wp-json/wp/v2/pages/5')
            .then(response => {
                if(response.status === 200) {
                    setHome(response.data)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <>
            { home && (
                <Container>
                    <h1>{home.title.rendered}</h1>
                    <div dangerouslySetInnerHTML={{__html: home.content.rendered}}></div>
                </Container>
                )
            }
        </>
    )
}

export default Home;