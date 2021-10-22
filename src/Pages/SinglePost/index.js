import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

function SinglePost( props ) {
    const [post, setPost] = useState();

    useEffect(() => {
        axios.get(`/wp-json/wp/v2/posts/${props.match.params.id}`)
            .then(response => {
                setPost(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [props.match.params.id])

    return (
        <>
            { post && (
                <Container>
                    <h1>{post.title.rendered}</h1>
                    <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
                </Container>
            )
            }
        </>
    )
}

export default SinglePost;