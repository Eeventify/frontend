import React from "react";
import {GoogleMap} from "@react-google-maps/api";
import {useLoadScript} from "@react-google-maps/api";
import { Container } from 'react-bootstrap';

const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
}
const center = {
    lat: 38.0183121,
    lng: 41.0786503,
}

export default function GoogleMaps() {
    const{isLoaded, loadError} = useLoadScript({
        // Uncomment the line below and add your API key
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
        // googleMapsApiKey: apikey,
    });

    if (loadError) return "Error loading Maps";
    if (!isLoaded) return "Loading Maps";

    return(
        <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={11} 
        center={center} 
        />
    )
}