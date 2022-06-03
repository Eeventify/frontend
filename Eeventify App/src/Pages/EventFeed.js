import { Container, Row } from "react-bootstrap";
import React from "react";
import { GetAllEvents, GetEventsByInterests } from "../API/EventAPI"
import EventCard from "../Components/EventCard"

function truncate(str, n) {
    return (str.length > n) ? str.substr(0, n-1) + '…' : str;
}

const EventFeed = () => {
    const [ events, setEvents ] = React.useState();
    const [ filter, setFilter ] = React.useState(false);
    const userInterests = [0];
    
    React.useEffect(()  => {
        if (events === undefined) {
            let apiMethod = filter ? GetEventsByInterests(userInterests) : GetAllEvents();
            apiMethod
                .then(json => {

                    // Truncate description if neccessary
                    json.map(item => {
                        item.description = truncate(item.description, 100);
                    });

                    setEvents(json);
                });
        }
    });

    return (
        <Container className="mt-4">
            <Row>
                <h1>Event Feed</h1>
                <p><input type="checkbox" onClick={ () => {setFilter(!filter); setEvents()} }></input> Show only events that match my interests</p>
            </Row>
            
            <Row className="row-cols-1 row-cols-md-3 g-4 mb-3">
                { events && 
                    events.map(event => (
                        <EventCard key={ event.id } title={ event.title } description={ event.description } />
                    ))
                }
            </Row>
        </Container>
    );
}

export default EventFeed;
