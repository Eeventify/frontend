import {Map, GoogleApiWrapper} from 'google-maps-react';


const containerStyle = {
  position: 'relative',  
  width: '100%',
  height: '100%'
}

export class MapContainer extends Component {
  render() {
    return (
      <Map 
        google={this.props.google} 
        zoom={11}
        containerStyle={containerStyle}
      >
        
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_MAPS_API_KEY)
})(MapContainer)