import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useCookies } from "react-cookie";

import { Login } from '../API/UserAPI'

const LoginPage = () => {
    const [ loginEmail, setLoginEmail ] = useState()
    const [ loginPassword, setLoginPassword ] = useState();

    const [ showAlert, setShowAlert] = useState(false);
    const [ alertType, setAlertType] = useState();
    const [ alertHeading, setAlertHeading] = useState();
    const [ alertMessage, setAlertMessage] = useState();

    const [ userCookies, setUserCookies ] = useCookies(["user"])

    const displayAlert = (type, heading, message) => {
        setAlertType(type)
        setAlertHeading(heading)
        setAlertMessage(message)
        setShowAlert(true)
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        if (loginEmail !== undefined && loginEmail.length === 0)
        {
            displayAlert("warning", "Whoops!", "You need to provide a password to log in with!")
            return;
        }

        if (loginPassword !== undefined && loginPassword.length === 0)
        {
            displayAlert("warning", "Whoops!", "You need to provide an email and password to log in with!")
            return;
        }

        if (loginEmail === undefined || loginPassword === undefined)
        {
            displayAlert("warning", "Whoops!", "You need to email and password to log in with!")
            return;
        }

        setShowAlert(false);
        const token = await Login(loginEmail, loginPassword)

        console.log(token);

        if (typeof(token) === 'string')
        {
            setUserCookies("token", token);
            window.location.href = window.location.origin;
        } else {
            if (token.status === 401)
            {
                displayAlert("danger", "Whoops!", "Your login credentials were incorrect");
                return;
            }
        }

        
    }

    return (
        <div style={{ height: "80vh" }}>
            <div className="vertical-center">
            <Alert className="login-offset" variant={alertType} onClose={() => setShowAlert(false)} show={showAlert} dismissible>
                    <Alert.Heading>{alertHeading}</Alert.Heading>
                    <p>
                        {alertMessage}
                    </p>
                </Alert>
                <center><h1>Login</h1></center>
                <Form className="login-offset" onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control placeholder="Your@email.com" onChange={ (event) => {setLoginEmail(event.target.value)} }/>                
                    </Form.Group>

                    <br />
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control placeholder="Password" type="password" onChange={ (event) => { setLoginPassword(event.target.value)} }/>
                    </Form.Group>

                    <br />
                    <Form.Group>
                        <Button className="btn-primary" type="submit">Log in</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage;