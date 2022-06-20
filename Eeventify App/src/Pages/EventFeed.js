import { Container, Row } from "react-bootstrap";
import React from "react";
import { useCookies } from "react-cookie";
import { GetAllEvents, GetEventsByInterests } from "../API/EventAPI";
import { GetTokenDetails } from "../API/UserAPI";
import EventCard from "../Components/EventCard";
import EventImage from "../Components/EventImage";

function truncate(str, n) {
    return (str.length > n) ? str.substr(0, n-1) + '…' : str;
}

const EventFeed = () => {
    const [ events, setEvents ] = React.useState();
    const [ filter, setFilter ] = React.useState(false);
    const [ userInterests, setUserInterests ] = React.useState();
    const [ userCookies ] = useCookies(["user"])
    
    React.useEffect(()  => {
        if (events === undefined) {
            let apiMethod = filter ? GetEventsByInterests(userInterests) : GetAllEvents();
            apiMethod
                .then(json => {

                    // Truncate description if neccessary
                    json.forEach(item => {
                        item.description = truncate(item.description, 100);
                    });

                    setEvents(json);
                });
        }

        if (userInterests === undefined && userCookies.token !== undefined) {
            GetTokenDetails(userCookies.token).then(json => {
                setUserInterests(json.interests);
            });
        }
    });

    return (
        <Container className="mt-4">
            <Row>
                <h1>Event Feed</h1>
                { userInterests && userInterests.length > 0 &&
                    <p><input type="checkbox" onClick={ () => {setFilter(!filter); setEvents()} }></input> Show only events that match my interests</p>
                }
                { userInterests && userInterests.length === 0 &&
                    <p><input type="checkbox" disabled></input> Show only events that match my interests</p>
                }
            </Row>
            
            <Row className="row-cols-1 row-cols-md-3 g-4 mb-3">
                { events && 
                    events.map(event => (
                        <EventCard
                            key={ event.id }
                            title={ event.title }
                            description={ event.description }
                            href={"eventdetail/" + event.id }
                            joined={
                                userCookies.principalData ?
                                event.members.includes(userCookies.principalData.id) :
                                undefined
                            }
                            imgSrc={ EventImage(event.interests[0]) } />
                    ))
                }
            </Row>
        </Container>
    );
}

export default EventFeed;
