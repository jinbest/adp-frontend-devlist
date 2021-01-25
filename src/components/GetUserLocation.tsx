import * as React from "react";
import { GeolocatedProps, geolocated } from "react-geolocated";

class GetUserLocation extends React.Component<GeolocatedProps> {
  
  render(): JSX.Element {
    console.log('lat-lng: ', this.props.coords);
    return (
      <div style={{display: 'none'}}>
        lat: {this.props.coords && this.props.coords.latitude}
        lng: {this.props.coords && this.props.coords.longitude}
      </div>
    );
  }
}

export default geolocated()(GetUserLocation);