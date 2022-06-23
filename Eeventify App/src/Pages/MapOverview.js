import React from "react";
import Map from "../Components/Map";
import { GetAllEvents } from "../API/EventAPI";

function MapOverview() {
    const center = [51.441947041091765, 5.474064502234395];
    const zoom = 13;
    const [ markers, setMarkers ] = React.useState();

    React.useEffect(()  => {
        if (!markers) {
            GetAllEvents().then(json => {
                const fetchMarkers = json.filter(event => event.locationBased).map(event => (
                    {
                        position: [event.latitude, event.longitude],
                        title: event.title,
                        description: event.description,
                        href: "eventdetail/" + event.id
                    }
                ));
                console.log(fetchMarkers);
                setMarkers(fetchMarkers);
            });
        }
    });

    return (
        markers && <Map center={center} zoom={zoom} markers={markers} height="100vh" showPopup={true}/>
    );
}

export default MapOverview;
