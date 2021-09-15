import React, { useState } from "react";
import {
  MapContainer,
  Popup,
  TileLayer,
  Marker,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";

const colors = ["5F6CB3", "64A1CC", "72C7D4", "B6E1C9", "F7FADA"];

const tileLayer = {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

function customMarkerIcon(color) {
  const svgTemplate = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker">
      <path fill-opacity=".25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/>
      <path fill="#${color}" stroke="#000" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/>
    </svg>`;

  return new L.DivIcon({
    className: "test",
    html: svgTemplate,
    iconSize: [40, 40],
    iconAnchor: [12, 24],
    popupAnchor: [7, -16],
  });
}

function ProceedingMap({ proceedingData }) {

  let points = [];
  //let bounds = [];
  let dates = [];

  dates = proceedingData.map(({ request_date }) => {
    return new Date(request_date);
  });

  let min = Math.min(...dates);
  let max = Math.max(...dates);
  let sum = (max - min) / 5;
  let chuncks = new Array();
  let colorIndex = 0;
  chuncks.push(min);
  chuncks.push(min + 1 * sum);
  chuncks.push(min + 2 * sum);
  chuncks.push(min + 3 * sum);
  chuncks.push(min + 4 * sum);

  points = proceedingData.map(
    ({ location, name, address, phone_numbers, request_date }) => {
      for (let i = 0; i < chuncks.length; i++) {
        if (new Date(request_date).getTime() > chuncks[i]) {
          colorIndex = i;
        } else {
          break;
        }
      }
      return {
        lat: location.coordinates[0],
        lng: location.coordinates[1],
        titleName: `${name.first} ${name.last}`,
        titleStreet: address.street,
        titlePhoneNumbers: phone_numbers.join(", "),
        colorIndex: colorIndex,
      };
    }
  );
  return (
    <MapContainer center={[41.42883,2.17828]} zoom={14} scrollWheelZoom={false}>
      <TileLayer {...tileLayer} />
      {points.map(({ lat, lng, titleName, titleStreet, titlePhoneNumbers, colorIndex }, index) => (
          <Marker
            key={index}
            icon={customMarkerIcon(colors[colorIndex])}
            position={[lat, lng]}
          >
            <Popup>
              <strong>{titleName}</strong><br />
              {titleStreet}<br />
              {titlePhoneNumbers}
            </Popup>
          </Marker>
        )
      )}
    </MapContainer>
  );
}

export default ProceedingMap;
