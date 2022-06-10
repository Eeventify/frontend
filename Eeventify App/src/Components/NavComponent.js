import { Button, Container } from "react-bootstrap";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useCookies } from "react-cookie";

const NavigationComponent = () => {
    const [ userCookies, setUserCookies, removeUserCookies ] = useCookies(["user"]);

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/"></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                    { console.log(userCookies.token) }
                    {
                        userCookies.token === undefined
                        ?
                            <Nav>
                                <Nav.Item>
                                    <Button href="/login">Log in</Button>
                                </Nav.Item>
                            </Nav>
                        :
                            <Nav>
                                <Nav.Item>
                                    <Button onClick={() => { removeUserCookies("token"); window.location.href = window.location.origin}}>Log out</Button>
                                </Nav.Item>
                            </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationComponent;
