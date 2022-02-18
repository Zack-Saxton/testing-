import { Circle, GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import React, { useState } from "react";
import icon from "../../../assets/icon/icon-google-map-marker.png";
function BranchLocatorMap(props) {
  const [activeMarker, setActiveMarker] = useState(null);
  let Current = props.CurrentLocation
    ? props.CurrentLocation
    : { lat: 39.3697028, lng: -76.4635839 };
  let zoomValue = props.CurrentLocation ? 8 : 7;
  let ZoomDepth = props.Zoom ? props.Zoom : 5;
  const markers = [
    {
      id: 1,
      name: "",
      position: Current,
    },
  ];
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  const handleOnLoad = (Map) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    Map.fitBounds(bounds);
  };
  return (
    <GoogleMap
      zoom={zoomValue}
      defaultZoom={zoomValue}
      onLoad={handleOnLoad}
      center={Current}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ height: "100%", width: "100%" }}
    >
      <Circle
        center={Current}
        zoom={zoomValue}
        radius={zoomValue * ZoomDepth * 4000}
        strokeOpacity={50}
        fillColor="#ADD8E6"
        fillOpacity={0}
      />
      <Marker position={Current} zIndex={8}></Marker>
      {props.getMap.map(({ id, BranchName, BranchAddress, BranchManager,Phone,Distance, position }) => (
        <Marker
          key={id}
          icon={icon}
          position={position}
          zIndex={id}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>
                <h3>{BranchName} Branch</h3>
                <p>Branch Manager: {BranchManager}</p>
                <p>BranchAddress: {BranchAddress}</p>
                <p>Phone: {Phone}</p>
                <p>Distance: {Distance}les</p>
                <p>Position: [Latitude:{position.lat}, Longitude:{position.lng}]</p>
                </div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
  );
}

export default BranchLocatorMap;
