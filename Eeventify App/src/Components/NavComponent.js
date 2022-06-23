import { Button, Container } from "react-bootstrap";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useCookies } from "react-cookie";
import Logo from "../nav_logo.png";

const NavigationComponent = () => {
    const [ userCookies, setUserCookies, removeUserCookies ] = useCookies(["user"]);

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/"><img src={Logo} alt="nav-logo" height="25px"></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/mapoverview">Map</Nav.Link>
                        { userCookies.token && <Nav.Link href="/createevent">Create Event</Nav.Link> }
                    </Nav>
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
                                    <p className="d-inline-block py-2 pe-3 mb-0">Hello { userCookies.principalData.name }</p>
                                    <Button onClick={() => { removeUserCookies("token"); removeUserCookies("principalData"); window.location.href = window.location.origin}}>Log out</Button>
                                </Nav.Item>
                            </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationComponent;
