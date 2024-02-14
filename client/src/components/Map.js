import { React, useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

// const markers = [
//   { lat: 40.633, lng: -74.08 },
//   { lat: 41.8781, lng: -87.6298 },

// ];

function Map({ currentUser }) {
  const containerStyle = {
    width: "100vw",
    height: "80vh",
  };

  const center = {
    lat: 40.633,
    lng: -74.08,
  };
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    console.log("Fetching clovers...");
    fetch("/clovers")
      .then((res) => res.json())
      .then((data) => {
        setMarkers(() => data);
      });
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA258FXiVy2azrLb_BaOO9qg7f7rUAQdaE",
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {/* Render markers */}
      {markers.map((marker, index) => {
        console.log(marker);
        return (
          <Marker
            key={index}
            position={{
              lat: parseFloat(marker.latitude),
              lng: parseFloat(marker.longitude),
            }}
          />
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
