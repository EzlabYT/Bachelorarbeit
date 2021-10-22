import React from 'react';
import './styles.css';
import useAuthContext from '../../context/useAuthContext';

import {
    Container,
    Navbar,
    Nav
} from 'react-bootstrap';

function PageNavbar () {
    const {authState} = useAuthContext()
    const {handleUserLogout} = useAuthContext()

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">MyPage</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/posts">Posts</Nav.Link>
                    {authState ? (
                        <>
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="/" onClick={handleUserLogout}>Logout</Nav.Link>
                        </>
                    ) : (
                        <Nav.Link href="/login">Login</Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default PageNavbar;