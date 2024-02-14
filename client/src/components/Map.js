// import React from "react";
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
// } from "@react-google-maps/api";

// const CustomSkinMap = withScriptjs(
//   withGoogleMap(() => (
//     <GoogleMap
//       defaultZoom={13}
//       defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
//       defaultOptions={{
//         scrollwheel: false,
//         zoomControl: true,
//         styles: [
//           {
//             featureType: "water",
//             stylers: [
//               { saturation: 43 },
//               { lightness: -11 },
//               { hue: "#0088ff" },
//             ],
//           },
//           {
//             featureType: "road",
//             elementType: "geometry.fill",
//             stylers: [
//               { hue: "#ff0000" },
//               { saturation: -100 },
//               { lightness: 99 },
//             ],
//           },
//           {
//             featureType: "road",
//             elementType: "geometry.stroke",
//             stylers: [{ color: "#808080" }, { lightness: 54 }],
//           },
//           {
//             featureType: "landscape.man_made",
//             elementType: "geometry.fill",
//             stylers: [{ color: "#ece2d9" }],
//           },
//           {
//             featureType: "poi.park",
//             elementType: "geometry.fill",
//             stylers: [{ color: "#ccdca1" }],
//           },
//           {
//             featureType: "road",
//             elementType: "labels.text.fill",
//             stylers: [{ color: "#767676" }],
//           },
//           {
//             featureType: "road",
//             elementType: "labels.text.stroke",
//             stylers: [{ color: "#ffffff" }],
//           },
//           { featureType: "poi", stylers: [{ visibility: "off" }] },
//           {
//             featureType: "landscape.natural",
//             elementType: "geometry.fill",
//             stylers: [{ visibility: "on" }, { color: "#b8cb93" }],
//           },
//           { featureType: "poi.park", stylers: [{ visibility: "on" }] },
//           {
//             featureType: "poi.sports_complex",
//             stylers: [{ visibility: "on" }],
//           },
//           { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
//           {
//             featureType: "poi.business",
//             stylers: [{ visibility: "simplified" }],
//           },
//         ],
//       }}
//     >
//       <Marker position={{ lat: 40.748817, lng: -73.985428 }} />
//     </GoogleMap>
//   ))
// );

// export default function Maps() {
//   return (
//     <CustomSkinMap
//       googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA258FXiVy2azrLb_BaOO9qg7f7rUAQdaE"
//       loadingElement={<div style={{ height: `100%` }} />}
//       containerElement={<div style={{ height: `100vh` }} />}
//       mapElement={<div style={{ height: `100%` }} />}
//     />
//   );
// }

import { React, useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import CloverMarker from "./CloverMarker.js";

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
          <CloverMarker
            key={clover.uid}
            uid={clover.uid}
            closeMarkers={props.closeOtherMarkers}
            toggleShowPage={props.toggleShowPage}
            clover={clover}
            location={{
              lat: clover.latitude,
              lng: clover.longitude,
            }}
            activeMarker={clover.uid === props.activeMarker ? true : false}
          />
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
