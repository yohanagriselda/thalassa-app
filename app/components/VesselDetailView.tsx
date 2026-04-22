"use client";

import VesselTrendChart from "./VesselTrendChart";

type TrendPoint = {
  time: string;
  speed: number;
  fuel: number;
};

type Vessel = {
  id: number;
  name: string;
  type: string;
  status: "EN ROUTE" | "IN PORT" | "DELAYED" | "MAINTENANCE";
  statusClass: "enroute" | "inport" | "delayed" | "maintenance";
  speed: number;
  heading: number;
  fuel: number;
  location: string;
  lat: number;
  lng: number;
  captain: string;
  crewCount: number;
  accent: "cyan" | "blue" | "yellow" | "red";
};

type VesselDetailViewProps = {
  vessel: Vessel | null;
  history: TrendPoint[];
  lastUpdated: string;
  onBack: () => void;
  formatCoord: (value: number, latOrLng: "lat" | "lng") => string;
  formatTime: (iso: string) => string;
};

export default function VesselDetailView({
  vessel,
  history,
  lastUpdated,
  onBack,
  formatCoord,
  formatTime,
}: VesselDetailViewProps) {
  if (!vessel) {
    return (
      <section className="vessel-detail-page">
        <div className="vessel-detail-topbar">
          <div className="vessel-detail-identity">
            <button type="button" className="icon-btn" onClick={onBack}>
              ←
            </button>
            <div className="vessel-detail-copy">
              <div className="vessel-detail-title-row">
                <h2>No vessel selected</h2>
              </div>
              <p>Waiting for realtime vessel data</p>
            </div>
          </div>
          <div className="live-pill">LIVE</div>
        </div>

        <div className="empty-state">No vessel selected.</div>
      </section>
    );
  }

  const trendData =
    history.length > 0
      ? history
      : [
          {
            time: formatTime(lastUpdated).replace(" UTC", ""),
            speed: vessel.speed,
            fuel: vessel.fuel,
          },
        ];

  return (
    <section className="vessel-detail-page">
      <div className="vessel-detail-topbar">
        <div className="vessel-detail-identity">
          <button type="button" className="icon-btn" onClick={onBack}>
            ←
          </button>

          <div className="vessel-detail-copy">
            <div className="vessel-detail-title-row">
              <h2>{vessel.name}</h2>
              <div className={`status-pill status-${vessel.accent}`}>
                {vessel.status}
              </div>
            </div>
            <p>
              {vessel.type} · ID: V{String(vessel.id).padStart(3, "0")}
            </p>
          </div>
        </div>

        <div className="live-pill">LIVE</div>
      </div>

      <div className="vessel-detail-grid">
        <div className="detail-panel gps-panel">
          <h3>GPS COORDINATES</h3>
          <p>LATITUDE</p>
          <strong>{formatCoord(vessel.lat, "lat")}</strong>
          <p>LONGITUDE</p>
          <strong>{formatCoord(vessel.lng, "lng")}</strong>
          <small>Updated: {formatTime(lastUpdated)}</small>
        </div>

        <div className="detail-panel chart-panel">
          <div className="detail-panel-head">
            <h3>Speed & Fuel Monitor</h3>
            <span>{trendData[trendData.length - 1]?.time ?? "--:--:--"}</span>
          </div>

          <div className="chart-wrapper">
            <VesselTrendChart data={trendData} />
          </div>
        </div>

        <div className="detail-panel speed-panel mini-panel">
          <h3>SPEED</h3>
          <strong>{vessel.speed.toFixed(1)} kn</strong>
        </div>

        <div className="detail-panel heading-panel mini-panel">
          <h3>HEADING</h3>
          <strong>{vessel.heading}°</strong>
        </div>

        <div className="detail-panel crew-panel mini-panel">
          <h3>CREW</h3>
          <strong>{vessel.crewCount}</strong>
        </div>

        <div className="detail-panel captain-panel mini-panel">
          <h3>CAPTAIN</h3>
          <strong>{vessel.captain}</strong>
        </div>

        <div className="detail-panel route-panel">
          <h3>ROUTE INFO</h3>
          <p>DESTINATION</p>
          <strong>{vessel.location}</strong>
        </div>

        <div className="detail-panel fuel-panel">
          <div className="fuel-panel-head">
            <h3>FUEL LEVEL</h3>
            <strong>{vessel.fuel.toFixed(0)}%</strong>
          </div>

          <div className="fuel-track">
            <div className="fuel-fill" style={{ width: `${vessel.fuel}%` }} />
          </div>

          <small>
            {vessel.fuel >= 60 ? "Sufficient" : vessel.fuel >= 30 ? "Monitor" : "Low"}
          </small>
        </div>
      </div>
    </section>
  );
}