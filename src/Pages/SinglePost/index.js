import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

function SinglePost( props ) {
    const [post, setPost] = useState();
    const [author, setAuthor] = useState({});

    useEffect(() => {
        // GET-Request an den Post
        axios.get(`/wp-json/wp/v2/posts/${props.match.params.id}`)
            .then(response => {
                // speichern der Responsedaten im State
                setPost(response.data)
                // ausführen der getAuthor Funktion mit dem Link aus der _links Eigenschaft
                getAuthor(response.data._links.author[0].href)
            })
            .catch(error => {
                console.log(error)
            })
    }, [props.match.params.id])

    // diese Funktion stellt einen GET-Request an eine übergebene URI und speichert ihre Daten in einem State
    function getAuthor(url) {
        axios.get(url)
            .then (response => {
                setAuthor(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            { post && ( /* rendert erst, wenn im post State etwas steht */
                <Container>
                    <h1>{post.title.rendered}</h1>
                    <h6>von {author.name}</h6>
                    <br/>
                    <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
                </Container>
            )
            }
        </>
    )
}

export default SinglePost;