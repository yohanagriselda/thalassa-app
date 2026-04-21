'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

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
  accent: "cyan" | "blue" | "yellow" | "red";
};

type FleetPayload = {
  type: string;
  serverTime: string;
  totalFleet: number;
  enRoute: number;
  inPort: number;
  delayed: number;
  maintenance: number;
  selectedVesselId: number | null;
  vessels: Vessel[];
};

export default function OperatorPage() {
  const [fleetData, setFleetData] = useState<FleetPayload | null>(null);
  const [activeFilter, setActiveFilter] = useState("TOTAL FLEET");
  const [selectedVesselId, setSelectedVesselId] = useState<number | null>(null);
  const [connectionStatus, setConnectionStatus] = useState("CONNECTING");
  const [lastUpdated, setLastUpdated] = useState("");
  const [openMenu, setOpenMenu] = useState<"fleet" | "map" | "analytics" | null>(null);

  const menuRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let eventSource: EventSource | null = null;

    const loadInitialData = async () => {
      try {
        const res = await fetch("/api/operator/summary", { cache: "no-store" });
        const data: FleetPayload = await res.json();
        setFleetData(data);
        setSelectedVesselId(data.selectedVesselId);
        setLastUpdated(data.serverTime);
      } catch (error) {
        console.error("Failed to load summary:", error);
      }
    };

    const connectStream = () => {
      eventSource = new EventSource("/api/operator/stream");

      eventSource.onopen = () => {
        setConnectionStatus("LIVE");
      };

      eventSource.onmessage = (event) => {
        const data: FleetPayload = JSON.parse(event.data);

        if (data.type === "fleet-update") {
          setFleetData(data);
          setLastUpdated(data.serverTime);

          setSelectedVesselId((current) => {
            const exists = data.vessels.some((v) => v.id === current);
            if (exists) return current;
            return data.selectedVesselId ?? data.vessels[0]?.id ?? null;
          });
        }
      };

      eventSource.onerror = () => {
        setConnectionStatus("RECONNECTING");
        eventSource?.close();
        setTimeout(connectStream, 3000);
      };
    };

    loadInitialData();
    connectStream();

    return () => {
      eventSource?.close();
    };
  }, []);

  const vessels = fleetData?.vessels ?? [];

  const statItems = [
    { label: "TOTAL FLEET", value: fleetData?.totalFleet ?? 0 },
    { label: "EN ROUTE", value: fleetData?.enRoute ?? 0 },
    { label: "IN PORT", value: fleetData?.inPort ?? 0 },
    { label: "DELAYED", value: fleetData?.delayed ?? 0 },
    { label: "MAINTENANCE", value: fleetData?.maintenance ?? 0 },
  ];

  const filteredVessels = useMemo(() => {
    if (activeFilter === "TOTAL FLEET") return vessels;
    return vessels.filter((vessel) => vessel.status === activeFilter);
  }, [activeFilter, vessels]);

  const detailVessel =
    filteredVessels.find((v) => v.id === selectedVesselId) ||
    filteredVessels[0] ||
    null;

  const formatCoord = (value: number, latOrLng: "lat" | "lng") => {
    const abs = Math.abs(value).toFixed(4);
    if (latOrLng === "lat") return `${abs}° ${value < 0 ? "S" : "N"}`;
    return `${abs}° ${value < 0 ? "W" : "E"}`;
  };

  const formatTime = (iso: string) => {
    if (!iso) return "--:--:-- UTC";
    return new Date(iso).toLocaleTimeString("en-GB", {
      hour12: false,
      timeZone: "UTC",
    }) + " UTC";
  };

  return (
    <main className="operator-page">
      <header className="operator-topbar">
        <div className="brand-block">
          <div className="brand-logo">
            <Image
              src="/logo-thalassa.png"
              alt="Thalassa Logo"
              width={48}
              height={48}
              priority
            />
          </div>
          <div>
            <h1>THALASSA SISTERHOOD GROUP</h1>
            <p>FLEET MONITORING</p>
          </div>
        </div>

        <nav className="operator-nav" ref={menuRef}>
          <div className="nav-group">
            <button
              type="button"
              className={`nav-trigger ${openMenu === "fleet" ? "open" : ""} ${activeFilter === "TOTAL FLEET" ? "active" : ""}`}
              onClick={() => setOpenMenu(openMenu === "fleet" ? null : "fleet")}
            >
              <span className="nav-trigger-icon">⚓</span>
              <span>FLEET</span>
              <span className="nav-caret">▾</span>
            </button>

            {openMenu === "fleet" && (
              <div className="nav-dropdown">
                <div className="nav-dropdown-label">FLEET OVERVIEW</div>

                <button
                  type="button"
                  className={`nav-dropdown-item ${activeFilter === "TOTAL FLEET" ? "active" : ""}`}
                  onClick={() => {
                    setActiveFilter("TOTAL FLEET");
                    setOpenMenu(null);
                  }}
                >
                  <span className="nav-item-icon">◉</span>
                  <span className="nav-item-copy">
                    <strong>Total Fleet</strong>
                    <em>Show all active vessels in monitoring grid.</em>
                  </span>
                </button>

                <button
                  type="button"
                  className={`nav-dropdown-item ${activeFilter === "EN ROUTE" ? "active" : ""}`}
                  onClick={() => {
                    setActiveFilter("EN ROUTE");
                    setOpenMenu(null);
                  }}
                >
                  <span className="nav-item-icon">↗</span>
                  <span className="nav-item-copy">
                    <strong>En Route</strong>
                    <em>Focus on vessels currently sailing.</em>
                  </span>
                </button>

                <button
                  type="button"
                  className={`nav-dropdown-item ${activeFilter === "IN PORT" ? "active" : ""}`}
                  onClick={() => {
                    setActiveFilter("IN PORT");
                    setOpenMenu(null);
                  }}
                >
                  <span className="nav-item-icon">⌂</span>
                  <span className="nav-item-copy">
                    <strong>In Port</strong>
                    <em>Check ships docked at current harbor.</em>
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="nav-group">
            <button
              type="button"
              className={`nav-trigger ${openMenu === "map" ? "open" : ""}`}
              onClick={() => setOpenMenu(openMenu === "map" ? null : "map")}
            >
              <span className="nav-trigger-icon">✦</span>
              <span>MAP</span>
              <span className="nav-caret">▾</span>
            </button>

            {openMenu === "map" && (
              <div className="nav-dropdown">
                <div className="nav-dropdown-label">MAP LAYERS</div>

                <button
                  type="button"
                  className="nav-dropdown-item"
                  onClick={() => setOpenMenu(null)}
                >
                  <span className="nav-item-icon">◎</span>
                  <span className="nav-item-copy">
                    <strong>Live Coordinates</strong>
                    <em>See real-time vessel location and heading.</em>
                  </span>
                </button>

                <button
                  type="button"
                  className="nav-dropdown-item"
                  onClick={() => setOpenMenu(null)}
                >
                  <span className="nav-item-icon">≋</span>
                  <span className="nav-item-copy">
                    <strong>Route Paths</strong>
                    <em>Review route lines and movement history.</em>
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="nav-group">
            <button
              type="button"
              className={`nav-trigger ${openMenu === "analytics" ? "open" : ""}`}
              onClick={() => setOpenMenu(openMenu === "analytics" ? null : "analytics")}
            >
              <span className="nav-trigger-icon">◫</span>
              <span>ANALYTICS</span>
              <span className="nav-caret">▾</span>
            </button>

            {openMenu === "analytics" && (
              <div className="nav-dropdown">
                <div className="nav-dropdown-label">ANALYTICS PANEL</div>

                <button
                  type="button"
                  className="nav-dropdown-item"
                  onClick={() => setOpenMenu(null)}
                >
                  <span className="nav-item-icon">∆</span>
                  <span className="nav-item-copy">
                    <strong>Performance</strong>
                    <em>Inspect speed, heading, and fuel efficiency.</em>
                  </span>
                </button>

                <button
                  type="button"
                  className="nav-dropdown-item"
                  onClick={() => setOpenMenu(null)}
                >
                  <span className="nav-item-icon">☰</span>
                  <span className="nav-item-copy">
                    <strong>Status Summary</strong>
                    <em>Compare fleet condition and alerts.</em>
                  </span>
                </button>
              </div>
            )}
          </div>
        </nav>

        <div className="operator-actions">
          <button className="icon-btn" type="button">⛶</button>
          <button className="operator-btn active" type="button">OPERATOR</button>
          <button className="logout-btn" type="button">LOGOUT</button>
        </div>
      </header>

      <section className="operator-livebar">
        <span className="live-dot"></span>
        <span>{connectionStatus}</span>
        <span>{formatTime(lastUpdated)}</span>
      </section>

      <section className="operator-stats">
        {statItems.map((item) => (
          <button
            key={item.label}
            className={`stat-card stat-button ${activeFilter === item.label ? "active" : ""}`}
            onClick={() => setActiveFilter(item.label)}
            type="button"
          >
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </button>
        ))}
      </section>

      <section className="operator-main">
        <div className="operator-left">
          <div className="section-head">
            <h2>FLEET VESSELS</h2>
            <span>{filteredVessels.length} Vessels</span>
          </div>

          <div className="vessel-grid">
            {filteredVessels.map((vessel) => (
              <article className={`vessel-card accent-${vessel.accent} ${detailVessel?.id === vessel.id ? "selected" : ""}`}>
                <div className={`status-pill status-${vessel.accent}`}>
                  {vessel.status}
                </div>

                <div className="vessel-title-block">
                  <h3>{vessel.name}</h3>
                  <p className="vessel-type">{vessel.type}</p>
                </div>

                <div className="vessel-metrics">
                  <div className="metric-box">
                    <span className="metric-label">SPEED</span>
                    <strong>{vessel.speed.toFixed(1)} kn</strong>
                  </div>
                  <div className="metric-box">
                    <span className="metric-label">HEADING</span>
                    <strong>{vessel.heading}°</strong>
                  </div>
                </div>

                <div className="fuel-block">
                  <div className="fuel-row">
                    <span>FUEL</span>
                    <span>{vessel.fuel.toFixed(1)}%</span>
                  </div>
                  <div className="fuel-track">
                    <div className="fuel-fill" style={{ width: `${vessel.fuel}%` }} />
                  </div>
                </div>

                <div className="vessel-location">{vessel.location}</div>
              </article>
            ))}

            {filteredVessels.length === 0 && (
              <div className="empty-state">No vessels found for this filter.</div>
            )}
          </div>
        </div>

        <aside className="operator-right">
          <div className="detail-card">
            <div className="detail-head">
              <span>LIVE COORDINATES</span>
              <button className="details-btn details-btn-inline" type="button">
                View Full Details
              </button>
            </div>

            {detailVessel ? (
              <>
                <p className="detail-name">{detailVessel.name}</p>

                <div className="detail-coords">
                  <div className="coord-box">
                    <span className="coord-label">LAT</span>
                    <span className="coord-value">{formatCoord(detailVessel.lat, "lat")}</span>
                  </div>
                  <div className="coord-box">
                    <span className="coord-label">LNG</span>
                    <span className="coord-value">{formatCoord(detailVessel.lng, "lng")}</span>
                  </div>
                </div>

                <div className="vessel-metrics">
                  <div className="metric-box">
                    <span className="metric-label">SPEED</span>
                    <strong>{detailVessel.speed.toFixed(1)} kn</strong>
                  </div>
                  <div className="metric-box">
                    <span className="metric-label">HEADING</span>
                    <strong>{detailVessel.heading}°</strong>
                  </div>
                </div>

                        </>
            ) : (
              <div className="empty-state">No vessel selected.</div>
            )}
          </div>

          <div className="status-card">
            <div className="section-head small">
              <h2>FLEET STATUS</h2>
            </div>

            <div className="status-list">
              {filteredVessels.map((vessel) => (
                <div
                  key={vessel.id}
                  className={`status-item ${detailVessel?.id === vessel.id ? "active" : ""}`}
                  onClick={() => setSelectedVesselId(vessel.id)}
                >
                  <div>
                    <strong>{vessel.name}</strong>
                    <span>{vessel.status}</span>
                  </div>
                  <em>{vessel.speed.toFixed(1)} kn</em>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}