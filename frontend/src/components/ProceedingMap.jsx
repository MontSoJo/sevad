import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function ProceedingMap({ proceedingData }) {
  return (
  <MapContainer center={[41.387670, 2.160100]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
      <Marker position={[41.387670, 2.160100]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
  </MapContainer>
  );
}

export default ProceedingMap;