import VesselMap from "./VesselMap";

const vessels = [
  { id: 1, name: "MV Pacific Star", lat: 1.29027, lng: 103.851959, speed: "15.0 kn", heading: "129°", port: "Singapore", status: "EN ROUTE" },
  { id: 2, name: "MV Ocean Voyager", lat: -7.257472, lng: 112.752088, speed: "0.0 kn", heading: "0°", port: "Port of Surabaya", status: "IN PORT" },
  { id: 3, name: "MV Maritime Express", lat: -6.200000, lng: 106.816666, speed: "0.5 kn", heading: "280°", port: "Port Klang", status: "DELAYED" },
];

export default function LiveMapSection() {
  return (
    <section className="live-map-page">
      <div className="live-map-head">
        <h1>LIVE MAP TRACKING</h1>
        <p>Real-time GPS positions of all fleet vessels</p>
      </div>

      <div className="live-map-layout">
        <div className="live-map-canvas">
          <VesselMap vessels={vessels} />
        </div>

        <aside className="live-map-sidebar">
          {vessels.map((vessel) => (
            <div key={vessel.id} className="map-vessel-card">
              <h3>{vessel.name}</h3>
              <p>{vessel.speed}</p>
              <p>{vessel.heading}</p>
              <p>{vessel.port}</p>
              <p>{vessel.status}</p>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}