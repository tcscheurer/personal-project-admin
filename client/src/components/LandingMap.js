import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

export const LandingMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAxm62zSoAzobkGBoVyOjKFgMAJL5z6iXM&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px`, width: '800px' }} />,
    mapElement: <div style={{ height: `100%`, width: '100%', marginLeft: '30px' }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={17}
    center={{ lat:32.777331032, lng: -96.795499096 }}
  >
    {
        props.employees.map((curr=>{
            return (
                <Marker
                key={curr.name}
                position={{lat:parseFloat(curr.latitude), lng: parseFloat(curr.longitude)}}
                />
            )
        }))
    }
    
  </GoogleMap>
)