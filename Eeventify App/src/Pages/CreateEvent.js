import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { GetInterests } from "../API/InterestAPI";
import { CreateEvent } from "../API/EventAPI";
import EventImage from "../Components/EventImage";
import Map, { GeolocateControl, Marker } from "react-map-gl";


const EventCreate = () => {
    const [ userCookies ] = useCookies(["user"])
    const [ interests, setInterests ] = React.useState([]);
    const [ dbInterests, setDbInterests ] = React.useState();
    const [newLocation, setNewLocation] = React.useState({lat: undefined, long: undefined})
    
    function ToggleInterest(id, name) {
        let newInterests = [...interests]
        if (!interests.find(item => item.id === id)) {
            newInterests.push({id: id, name: name});
        }
        else {
            newInterests = interests.filter(item => item.id !== id);
        }

        console.log(newInterests)
        setInterests(newInterests);
    }

    React.useEffect(()  => {
        if (dbInterests === undefined) {
            GetInterests("", false).then(json => {
                    setDbInterests(json);
                });
        }
    });
    
    const onSubmit = async (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const minPeople = document.getElementById("minPeople").value;
        const maxPeople = document.getElementById("maxPeople").value;
        const startEvent = document.getElementById("startEvent").value;
        const members = [];
        const hostID = userCookies.principalData.id;

        const _interests = [];
        interests.forEach(item => {
            _interests.push(item.id);
        })


        CreateEvent(description, _interests, members, title, (newLocation.lat !== undefined && newLocation.long !== undefined), newLocation.lat, newLocation.long, hostID, maxPeople, minPeople, startEvent)
            .then(res => {
                if (res.ok) {
                    window.location.href = window.location.origin;
                    return;
                }
                res.text().then(body => {
                    alert("Creating event failed: " + body);
                });
            });
    }
    
    return (
        <Container className="mt-3 mb-4">
            <Row className="mb-3">
                <h1>Create Event</h1>
                <img src={ interests.length > 0 ? EventImage(interests[0].name) : EventImage("0") } alt="Event cap" height="400px" ></img>
            </Row>
            <Form className="row g-4" onSubmit={onSubmit}>
                <Col md="6">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label"><strong>Title</strong></label>
                        <input type="text" className="form-control" id="title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label"><strong>Description</strong></label>
                        <textarea className="form-control" id="description" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text"><strong>Min and max people</strong></span>
                        <input type="number" aria-label="Min people" className="form-control" id="minPeople" />
                        <input type="number" aria-label="Max people" className="form-control" id="maxPeople" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="startEvent" className="form-label"><strong>Start of event</strong></label>
                        <input type="datetime-local" className="form-control" id="startEvent" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </Col>
                <Col md="6">
                    <div className="mb-3">
                        <label htmlFor="interests" className="form-label"><strong>Interests</strong></label>
                            { dbInterests && dbInterests.map(item => (
                                <div className="form-check" key={item.id}>
                                    <input className="form-check-input" type="checkbox" value={item.id} id={"box" + item.id} onChange={() => ToggleInterest(item.id, item.name)}/>
                                    <label className="form-check-label" htmlFor={"box" + item.id}>
                                    {item.name}
                                    </label>
                                </div>
                            ))}
                    </div>
                </Col>
                <Col md="6">
                    <div className="mb-3">
                        <center>
                            <Map
                                initialViewState={{
                                    longitude: 5.47751621569221, 
                                    latitude: 51.43828299591094,
                                    zoom: 10
                                }}
                                mapStyle="mapbox://styles/mapbox/streets-v9"
                                style={{height: "400px", width: "200%", maxWidth: "90vw"}}
                                mapboxAccessToken="pk.eyJ1Ijoicm9iaW52aG9vZiIsImEiOiJjbDRzaG9yMXMwZzc1M3BvNmdseWMzZzdwIn0.3XmLsNDdrepiRBXQ6vSwQQ"
                                cursor="crosshair"

                                onClick={(event) => setNewLocation({lat: event.lngLat.lat, long: event.lngLat.lng}) }
                            >
                                <GeolocateControl />
                                {
                                    newLocation.lat !== undefined && newLocation.long !== undefined &&
                                    <Marker longitude={newLocation.long} latitude={newLocation.lat} />
                                }
                            </Map>
                        </center>
                    </div>
                </Col>
            </Form>
        </Container>
        
    );
}

export default EventCreate;
