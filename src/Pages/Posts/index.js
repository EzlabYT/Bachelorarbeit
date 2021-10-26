import React, { useEffect, useState } from 'react';
import './styles.css'
import axios from 'axios';
import useAuthContext from '../../context/useAuthContext';

import {
    Container,
    Card,
    Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Posts() {

    const {authState} = useAuthContext()
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts()
    }, [])

    // GET-Request an alle Posts und speichern im State
    function getPosts() {
        axios.get('/wp-json/wp/v2/posts')
            .then(response => {
                setPosts(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    // DELETE-Request an den Post mit der übergebenen ID
    function handleDelete(id) {
        axios.delete(`/wp-json/wp/v2/posts/${id}`, {
            // Übergabe des JWT-Tokens
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                console.log(`DELETE post ${id}, res:`, response)
                getPosts() // um den neuen stand der Posts zu bekommen
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Container>
            {/* Darstellen alles Posts */}
            {posts.map((post, index) => (
                <Card key={index} className='card'>
                    <Card.Body>
                        <Card.Img src={''} />
                        <Card.Title>{post.title.rendered}</Card.Title>
                        <Card.Text dangerouslySetInnerHTML={{ __html: post.excerpt.rendered}}></Card.Text>
                        <div className={'d-flex justify-content-between'}>
                            <Button variant={'secondary'} >
                                <Link to={`/post/${post.id}`} className='more-link'>
                                    weiter Lesen
                                </Link>
                            </Button>
                            {authState && ( // prüft ob der Nutzer eingeloggt ist
                                <Button variant={'danger'} onClick={() => handleDelete(post.id)}>löschen</Button>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    )
}

export default Posts;