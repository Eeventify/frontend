import { Button, Container } from "react-bootstrap";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useCookies } from "react-cookie";

const NavigationComponent = () => {
    const [ userToken, setUserToken] = useCookies(["user"]);

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/"><img /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>

                    {
                        userToken === undefined
                        ?
                            <Nav>
                                <Nav.Item>
                                    <Button>Log in</Button>
                                </Nav.Item>
                            </Nav>
                        :
                            <Nav>
                                <Nav.Item>
                                    <Button>Log out</Button>
                                </Nav.Item>
                            </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationComponent;