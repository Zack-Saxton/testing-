import { Circle, GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import PropTypes from "prop-types";
import React, { useCallback, useRef, useState } from "react";
import icon from "../../../assets/icon/icon-google-map-marker.png";
import mapStyles from "../../../contexts/mapStyles";
function BranchLocatorMap(props) {
  const [ activeMarker, setActiveMarker ] = useState(null);
  let Current = props.CurrentLocation
    ? props.CurrentLocation
    : { lat: 39.3697028, lng: -76.4635839 };
  let zoomValue = props.CurrentLocation ? 7 : 6;
  let ZoomDepth = props.Zoom ? props.Zoom : 5;
  const mapContainerStyle = { height: "90%", width: "90%" };
  const options = {
    styles: mapStyles[ 3 ],
    disableDefaultUI: true,
    zoomControl: true,
    scaleControl: true,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true
  };
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
  const mapRef = useRef();
  const handleOnLoad = (Map) => {
    mapRef.current = Map;
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    Map.fitBounds(bounds);
  };
  const onMapClick = useCallback(() => {
    setActiveMarker(null);
  }, []);

  return (
    <GoogleMap
      zoom={ zoomValue }
      defaultZoom={ zoomValue }
      onLoad={ handleOnLoad }
      center={ Current }
      onClick={ onMapClick }
      mapContainerStyle={ mapContainerStyle }
      options={ options }
    >
      <Circle
        center={ Current }
        zoom={ zoomValue }
        radius={ zoomValue * ZoomDepth * 2500 }
        options={{ fillColor: "#9aa8b3" }} 
      />
      <Marker position={ Current } zIndex={ 8 }></Marker>
      { props.getMap.map(({ id, BranchName, BranchAddress, BranchManager, Phone, Distance, position }) => (
        <Marker
          key={ id }
          icon={ icon }
          position={ position }
          zIndex={ id }
          onClick={ () => handleActiveMarker(id) }
        >
          { activeMarker === id ? (
            <InfoWindow onCloseClick={ () => setActiveMarker(null) }>
              <div>
                <h3>{ BranchName } Branch</h3>
                <p>Branch Manager: { BranchManager }</p>
                <p>BranchAddress: {BranchAddress}</p>
                <p>Phone: { Phone }</p>
                <p>Distance: { Distance }les</p>
                <p>Position: [Latitude:{ position.lat }, Longitude:{ position.lng }]</p>
              </div>
            </InfoWindow>
          ) : null }
        </Marker>
      )) }
    </GoogleMap>
  );
}

BranchLocatorMap.propTypes = {
  CurrentLocation: PropTypes.object,
  Zoom: PropTypes.number,
  getMap: PropTypes.array,
};

export default BranchLocatorMap;
