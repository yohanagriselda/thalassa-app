"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Vessel = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  speed: string;
  heading: string;
  port: string;
  status: string;
};

type Props = {
  vessels: Vessel[];
};

export default function VesselMap({ vessels }: Props) {
  return (
    <MapContainer
      center={[-2.5, 118]}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", borderRadius: "20px" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {vessels.map((vessel) => (
        <Marker key={vessel.id} position={[vessel.lat, vessel.lng]}>
          <Popup>
            <strong>{vessel.name}</strong>
            <br />
            {vessel.status}
            <br />
            {vessel.port}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}