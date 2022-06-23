import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25,41],
    iconAnchor: [12,41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function Map(props) {
    return (
      <MapContainer center={props.center} zoom={props.zoom} style={{height:props.height}}>
          <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          { props.markers && props.markers.map((marker, index) => (
              <Marker key={index} position={marker.position}>
                { props.showPopup && <Popup>
                    <p><strong>{marker.title}</strong></p>
                    <p>{marker.description}</p>
                    <a href={ marker.href } className="btn btn-outline-primary">Details</a>
                  </Popup>
                }
              </Marker>
            ))
          }
     </MapContainer>
    );
  }
  
  export default Map;
