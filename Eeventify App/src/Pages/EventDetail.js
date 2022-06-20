import React from "react";
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { GetEventByID } from "../API/EventAPI";
import { GetUserDetails, AttendEvent, UnattendEvent } from "../API/UserAPI";
import { GetInterest } from "../API/InterestAPI";

const EventDetail = () => {
    const { id } = useParams();
    const [ hasJoined, setHasJoined ] = React.useState();
    const [ userCookies ] = useCookies(["user"])
    const [ step, setStep ] = React.useState(0);
    const [ state, setState ] = React.useState(
        {
            event: undefined,
            interests : [],
            members: [],
            host: ""
        }
    );

    function setStateProp(prop, input) {
        const tempState = state;
        tempState[prop] = input;
        setState(tempState);
    }

    function SignUp() {
        if (state.event !== undefined) {
            AttendEvent(userCookies.token, state.event.id).then(() => {
                setHasJoined(true);
                window.location.reload();
            });
        }
    }

    function Leave() {
        if (state.event !== undefined) {
            UnattendEvent(userCookies.token, state.event.id).then(() => {
                setHasJoined(false);
                window.location.reload();
            });
        }
    }
    
    React.useEffect(()  => {
        step === 0 && GetEventByID(id)
            .then(json => {
                setStateProp("event", json);
                setHasJoined(json.members.includes(userCookies.principalData.id));
                setStep(1);
            });
        step === 1 && GetUserDetails(state.event.hostID)
            .then(json => {
                setStateProp("host", json.name)
                setStep(2);
            });
        step === 2 && state.event.members.forEach((member, index) => {
            GetUserDetails(member).then(json => {
                state.members.push(json.name);
                index === state.event.members.length - 1 && setStep(3);
            });
        });
        step === 3 && state.event.interests.forEach((interest, index) => {
            GetInterest(interest).then(json => {
                state.interests.push(json.name);
                index === state.event.interests.length - 1 && setStep(4);
            });
        });
    });
    
    return (
        <Container>
            <Row className="mb-3">
                <img src="https://picsum.photos/1000/300" alt="Event cap"></img>
            </Row>
            { step === 4 &&
            <Row>
                <Col md="6">
                    <h1><strong>Title:</strong> { state.event.title }</h1>
                    <p>
                        <strong>Interests: </strong>
                        { state.interests.map(interest => (
                            interest !== undefined && <span key={interest} className="badge bg-secondary me-1">{ interest }</span>
                        ))}
                    </p>
                    <p><strong>Hosted by: </strong><span className="badge bg-secondary me-1">{ state.host }</span></p>
                    <p>
                        <strong>People: </strong>{ state.event.members.length - 1 }/{ state.event.maxPeople}<br />
                        { state.members.map(member => (
                            member !== undefined && <span key={member} className="badge bg-secondary me-1">{ member }</span>
                        ))}
                    </p>
                    <p><strong>Event starts at:</strong> { new Date(state.event.startEvent).toString() }</p>
                    <p><strong>Description:</strong> { state.event.description }</p>
                    { !hasJoined && <button className="btn btn-primary mb-2 me-1" onClick={() => SignUp()}>Join this event</button> }
                    { hasJoined && <button className="btn btn-danger mb-2 me-1" onClick={() => Leave()}>Leave this event</button> }
                    <a href="/" className="btn btn-primary mb-2">Back to feed</a>
                </Col>
                <Col md="6">
                    <p>Kaartje hier?</p>
                    <p>lat { state.event.latitude } lon { state.event.longitude }</p>
                </Col>
            </Row>
            }
        </Container>
        
    );
}

export default EventDetail;
