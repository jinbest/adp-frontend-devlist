import React, {useState, useEffect} from 'react';
import Geocode from "react-geocode";
import { findLocationAPI } from "../services/";
import { storesDetails } from '../store/';

Geocode.setApiKey("");
Geocode.enableDebug();

const usePos = () => {
  const [pos, setPos] = useState({lat: "", long: ""})
  const  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoords)
    } else {
      alert('GeoLocation not enabled');
    }
  }

  /* -- get formated address from geocode via api --
  useEffect(() => {    
    if (pos.lat) {      
      Geocode.fromLatLng(pos.lat, pos.long).then(
        (response:any) => {
          const address = response.results[0].formatted_address;
          console.log(address);
        },
        (error:any) => {
          console.error(error);
        }
      );
    }
  }, [pos]);
  ------------------------------------------------- */

  const getCoords = (pos:any) => {    
    setPos({
      lat: pos.coords.latitude,
      long: pos.coords.longitude
    })
  }

  getLocation()

  return { lat: pos.lat, long: pos.long }
}

const findGeoLoc = (geoPos: any) => {
  /* geoData should be made from mobx-store later */
  // const geoData:any = {
  //   longitude: -97.211811,
  //   latitude: 49.865759
  // }
  const geoData: any = {
    longitude: geoPos.long,
    latitude: geoPos.lat
  }
  findLocationAPI
    .findGeoLocation(1, geoData)
    .then((res:any) => {
      // console.log('api-findLocationAPI => findGeoLoc:', res.data);
      storesDetails.changeFindAddLocation(res.data);
    })
    .catch((error) => {
      console.log('Error to find location with GeoCode', error);
    });
}

// const findAddLoc = () => {
//   const addData:any = {
//     city: 'winnipeg',
//     state: 'MB',
//     postcode: 'R3P1E7',
//     country: 'CA',
//     address_1: '500 Sterling Lyon Pkwy'
//   }
//   findLocationAPI
//     .findAddLocation(1, addData)
//     .then((res:any) => {
//       console.log('api-findLocationAPI => findAddLoc:', res.data);
//       storesDetails.changeFindAddLocation(res.data);
//     })
//     .catch((error) => {
//       console.log('Error to find location with Address', error);
//     });
// }

// findAddLoc();

/* This component does not rendered now, 
   but should be edited later if need to render. */
const GetUserLocation = () => {
  const pos = usePos();

  useEffect(() => {
    if (pos.lat) {
      findGeoLoc(pos);
    }
  }, [pos])

  return (
    <div style={{display: 'none'}}>
      <p>Lat {pos.lat}</p>
      <p>Long: {pos.long}</p>
    </div>
  )
}

export default GetUserLocation;