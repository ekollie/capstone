import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import CloverMapCard from "./CloverMapCard";
// import CloverIcon from "public/Four-Leaf-Clover-Flat-icon.png";

function CloverMarker({
  activeMarker,
  uid,
  closeMarkers,
  toggleShowPage,
  clover,
  location,
}) {
  const [isOpen, setIsOpen] = useState([false]);
  const [isActiveMarker, setIsActiveMarker] = useState([activeMarker]);
  const toggleOpen = () => {
    setIsOpen(() => {
      if (!isOpen) {
        setIsActiveMarker(false);
      } else {
        closeMarkers(uid);
      }
    });
  };

  return (
    <div>
      <Marker onClick={toggleOpen()} position={location} icon={CloverIcon}>
        {isOpen && isActiveMarker ? (
          <InfoWindow
            maxWidth={800}
            defaultPosition={clover.location}
            onCloseClick={toggleOpen()}
          >
            <CloverMapCard toggleShowPage={toggleShowPage} clover={clover} />
          </InfoWindow>
        ) : null}
      </Marker>
    </div>
  );
}

export default CloverMarker;
