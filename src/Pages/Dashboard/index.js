import React, { useState } from 'react';
import './style.css'
import axios from 'axios'

import {
    Button,
    Container,
    Form
} from 'react-bootstrap';

function Dashboard() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const username = localStorage.getItem('user_nicename')

    function postData(event) {
        event.preventDefault()

        const formData = {
            title: title,
            content: content,
            status: 'publish'
        }

        axios.post('/wp-json/wp/v2/posts', formData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then( response => {
                setTitle('');
                setContent('');
                console.log('POST new post, res:', response)
            })
            .catch( error => {
                console.log(error)
            })
    }

    return (
        <Container>
            <h1 className='heading'>Hello {username}!</h1>
            <div className='form'>
                <h2>Neuen Post erstellen:</h2>
                <Form onSubmit={postData}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Titel'
                            name='title'
                            value={title}
                            onChange={event => setTitle(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            as='textarea'
                            rows={5}
                            placeholder='Inhalt'
                            name='content'
                            value={content}
                            onChange={event => setContent(event.target.value)}
                        />
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </div>

        </Container>
    )
}

export default Dashboard;