import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker, Circle } from "@react-google-maps/api";
import icon from "../../../assets/icon/icon-google-map-marker.png";

function BranchLocatorMap(props) {
    const [activeMarker, setActiveMarker] = useState(null);
    let Current = (props.CurrentLocation ? props.CurrentLocation : { lat: 39.3697028, lng: -76.4635839 });
    let zoomValue = (props.CurrentLocation ? 10 : 12);
    let ZoomDepth = (props.Zoom) ? props.Zoom : 5;
    const markers = [
        {
            id: 1,
            name: "",
            position: Current
        }
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
            mapContainerStyle={{ height: "715px", width: "100%" }}
        >
            <Circle
                center={Current}
                zoom={zoomValue}
                radius={zoomValue * ZoomDepth * 1609.344}
                strokeOpacity={50}
                fillColor='#ADD8E6'
                fillOpacity={0}
            />
            <Marker
                position={Current}
                zIndex={8}
            >
            </Marker>
            {props.getMap.map(({ id, name, position }) => (
                <Marker
                    icon={icon}
                    position={position}
                    zIndex={id}
                    onClick={() => handleActiveMarker(id)}
                >
                    {activeMarker === id ? (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                            <div>{name}</div>
                        </InfoWindow>
                    ) : null}
                </Marker>
            ))}
        </GoogleMap>
    );
}

export default BranchLocatorMap;
