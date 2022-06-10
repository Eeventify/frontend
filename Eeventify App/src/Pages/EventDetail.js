import React from "react";
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap";
import { GetEventByID } from "../API/EventAPI"

const EventDetail = () => {
    const { id } = useParams()
    const [ eventItem, setEvent ] = React.useState();
    
    React.useEffect(()  => {
        if (eventItem === undefined) {
            GetEventByID(id)
                .then(json => {
                    setEvent(json);
                    console.log(json);
                });
        }
    });
    
    return (
        <Container>
            <Row className="mb-3">
                <img src="https://picsum.photos/1000/300"></img>
            </Row>
            { eventItem &&
            <Row>
                <Col md="6">
                    <h1><strong>Title:</strong> { eventItem.title }</h1>
                    <p>
                        <strong>Interests:</strong>
                    </p>
                    <p><strong>Hosted by:</strong> { eventItem.hostID }</p>
                    <p>
                        <strong>People:</strong> { eventItem.members.length }/{ eventItem.maxPeople}<br />
                        { eventItem.members.map(memberId => (
                            memberId + ", "
                        ))}
                    </p>
                    <p><strong>Event starts at:</strong> { eventItem.startEvent }</p>
                    <p><strong>Description:</strong> { eventItem.description }</p>
                </Col>
                <Col md="6">
                    <p>Kaartje hier?</p>
                </Col>
            </Row>
            }
            <Row>
                <a href="/" className="btn btn-primary mb-2">Join this event</a>
                <a href="/" className="btn btn-primary mb-2">Back to feed</a>
            </Row>
        </Container>
        
    );
}

export default EventDetail;
