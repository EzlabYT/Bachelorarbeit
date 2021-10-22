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
        axios.get('/wp-json/wp/v2/posts')
            .then(response => {
                setPosts(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [posts])

    function handleDelete(id) {
        axios.delete(`/wp-json/wp/v2/posts/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                console.log(`DELETE post ${id}, res:`, response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Container>
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
                            {authState && (
                                <Button variant={'danger'} onClick={() => handleDelete(post.id)}>löschen</Button>
                            )}
                        </div>
                    </Card.Body>
                    <Card.Footer></Card.Footer>
                </Card>
            ))}
        </Container>
    )
}

export default Posts;