import React, { useState } from 'react';
import './style.css'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import useAuthContext from '../../context/useAuthContext';
import * as Cookies from 'js-cookie';

import {
    Container,
    Form,
    Button,
    Alert
} from 'react-bootstrap';

function Login() {

    const {handleUserLogin} = useAuthContext();
    const {authState} = useAuthContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [inputError, setInputError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function handleSubmit (event) {
        event.preventDefault()

        const loginData = {
            username: username,
            password: password
        };

        // POST-Request um vom Server einen JWT-Token zu bekommen, der im localStorage gespeichert wird
        axios.post('/wp-json/jwt-auth/v1/token', loginData)
            .then( response => {
                if ( response.status === 200 ) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user_nicename', response.data.user_nicename);
                    localStorage.setItem('user_email', response.data.user_email);
                    localStorage.setItem('user_display_name', response.data.user_display_name);
                    Cookies.set('session', username, {expires: 7})
                    handleUserLogin();
                }
            })
            // hier werden einige Fehlerfälle individuell abgefangen und in der Konsole geloggt
            .catch( error => {
                if (error.response) {
                    // Die Anfrage wurde gestellt und der Server antwortete mit einem Statuscode
                    // alles das nicht in den Bereich von 2xx fällt
                    setInputError(true)
                    setErrorMessage(error.response.data.message)
                    console.log('err.res.data', error.response.data);
                    console.log('err.res.status', error.response.status);
                    console.log('err.res.headers', error.response.headers);
                } else if (error.request) {
                    // Die Anfrage wurde erfolgreich übermittelt, aber keine Antwort erhalten
                    console.log('err.request', error.request);
                } else {
                    // etwas wurde beim Request falsch gemacht
                    console.log('Error', error.message);
                }
                console.log('err.config', error.config);
            })
    }

    if (authState) {
        // bei erfolgreicher Authentifizierung wird der Nutzer auf das Dashboard weitergeleitet
        return ( <Redirect to={'/dashboard'} />)
    }
    return ( // rendern des Loginformulares
        <Container>
            <Form className='form' onSubmit={handleSubmit}>
                {inputError &&
                <Alert variant={'danger'}>
                    <Alert.Heading>Oops ...</Alert.Heading>
                    <div dangerouslySetInnerHTML={{__html: errorMessage}}></div>
                </Alert>
                }
                <Form.Group className='mb-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default Login;