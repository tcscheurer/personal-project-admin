import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import '../styles/EmplActionInterface.css';

export const MyMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAxm62zSoAzobkGBoVyOjKFgMAJL5z6iXM&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className='action-interface-map-wraper'   />,
    mapElement: <div className='action-interface-map-element' style={{ height: `100%`,  width: '100%',border: '1px solid #b0b3b7' }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={15}
    center={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }}
  >
    {props.isMarkerShown && <Marker position={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)

//AIzaSyAxm62zSoAzobkGBoVyOjKFgMAJL5z6iXM
//32.7773310
//-96.7954990