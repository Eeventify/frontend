import React from "react";
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { GetEventByID, DeleteEvent } from "../API/EventAPI";
import { GetUserDetails, AttendEvent, UnattendEvent } from "../API/UserAPI";
import { GetInterest } from "../API/InterestAPI";
import EventImage from "../Components/EventImage";
import DeleteModal from "../Components/DeleteModal";
import Map from "../Components/Map";

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

    const Delete = () => {
        if (state.event !== undefined) {
            DeleteEvent(state.event.id).then(status => {
                if (status !== 200) {
                    alert("Something went wrong...");
                }
                else {
                    window.location.href = window.location.origin;
                }
            });
        }
    }

    React.useEffect(()  => {
        step === 0 && GetEventByID(id)
            .then(json => {
                setStateProp("event", json);
                setHasJoined(userCookies.principalData ? json.members.includes(userCookies.principalData.id) : false);
                setStep(1);
            });
        step === 1 && GetUserDetails(state.event.hostID)
            .then(json => {
                setStateProp("host", json.name)
                if (state.event.members.length > 0) {setStep(2);}
                else {setStep(3);}
            });
        step === 2 && state.event.members.forEach(member => {
            GetUserDetails(member).then(json => {
                state.members.push(json.name);
                state.members.length === state.event.members.length && setStep(3);
            });
        });
        step === 3 && state.event.interests.forEach(interest => {
            GetInterest(interest).then(json => {
                state.interests.push(json.name);
                state.interests.length === state.event.interests.length && setStep(4);
            });
        });
    });
    
    return (
        <Container>
            <Row className="mb-3">
                { step > 0 && <img src={ EventImage(state.event.interests[0]) } alt="Event cap" height="400px" ></img> }
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
                        <strong>People: </strong>{ state.event.members.length }/{ state.event.maxPeople}<br />
                        { state.members.map(member => (
                            member !== undefined && <span key={member} className="badge bg-secondary me-1">{ member }</span>
                        ))}
                    </p>
                    <p><strong>Event starts at:</strong> { new Date(state.event.startEvent).toString() }</p>
                    <p><strong>Description:</strong> { state.event.description }</p>
                    { !hasJoined && state.event.members.length < state.event.maxPeople && userCookies.token &&
                        <button className="btn btn-primary mb-2 me-1" onClick={() => SignUp()}>Join event</button> }
                    { !hasJoined && state.event.members.length >= state.event.maxPeople && userCookies.token &&
                        <button className="btn btn-secondary mb-2 me-1" disabled>Event full</button> }
                    { hasJoined && userCookies.token &&
                        <button className="btn btn-danger mb-2 me-1" onClick={() => Leave()}>Leave event</button> }
                    { userCookies.token && state.event.hostID === userCookies.principalData.id &&
                        <DeleteModal deleteFunction={Delete} /> }
                    <a href="/" className="btn btn-primary mb-2">Back to feed</a>
                    
                </Col>
                <Col md="6">
                    { state.event.locationBased &&
                        <Map 
                            center={[state.event.latitude, state.event.longitude]}
                            zoom={12}
                            markers={[{
                                title: state.event.title, 
                                description: state.event.title,
                                position: [state.event.latitude, state.event.longitude]
                            }]}
                            height="100%"
                            showPopup={false}
                        />
                    }
                </Col>
                
            </Row>
            }
        </Container>
        
    );
}

export default EventDetail;
