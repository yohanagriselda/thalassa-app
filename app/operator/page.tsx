"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Vessel = {
  id: number;
  name: string;
  type: string;
  status: string;
  statusClass: "enroute" | "inport" | "delayed" | "maintenance";
  speed: number;
  heading: number;
  fuel: number;
  location: string;
  lat: number;
  lng: number;
  accent: string;
};

type SummaryData = {
  totalFleet: number;
  enRoute: number;
  inPort: number;
  delayed: number;
  maintenance: number;
  selectedVesselId: number;
  vessels: Vessel[];
  serverTime: string;
};

type FilterKey = "all" | "enroute" | "inport" | "delayed" | "maintenance";

const initialData: SummaryData = {
  totalFleet: 0,
  enRoute: 0,
  inPort: 0,
  delayed: 0,
  maintenance: 0,
  selectedVesselId: 1,
  vessels: [],
  serverTime: "",
};

function formatUtcTime(iso: string) {
  if (!iso) return "--:--:-- UTC";

  const date = new Date(iso);
  return (
    date.toLocaleTimeString("en-GB", {
      hour12: false,
      timeZone: "UTC",
    }) + " UTC"
  );
}

function formatCoord(value: number, type: "lat" | "lng") {
  const abs = Math.abs(value).toFixed(4);
  if (type === "lat") return `${abs}° ${value >= 0 ? "N" : "S"}`;
  return `${abs}° ${value >= 0 ? "E" : "W"}`;
}

export default function OperatorPage() {
  const [data, setData] = useState<SummaryData>(initialData);
  const [selectedVesselId, setSelectedVesselId] = useState<number>(1);
  const [selectedFilter, setSelectedFilter] = useState<FilterKey>("all");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let eventSource: EventSource | null = null;

    const loadInitial = async () => {
      try {
        const res = await fetch("/api/operator/summary", {
          cache: "no-store",
        });

        const json: SummaryData = await res.json();

        if (!isMounted) return;

        setData(json);
        setSelectedVesselId(json.selectedVesselId);
      } catch (error) {
        console.error("Failed to load operator summary:", error);
      }
    };

    loadInitial();

    eventSource = new EventSource("/api/operator/stream");

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);

        if (payload.type === "connected") {
          setIsConnected(true);
          return;
        }

        if (payload.type === "fleet-update") {
          setData(payload);
        }
      } catch (error) {
        console.error("Failed to parse SSE payload:", error);
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
    };

    return () => {
      isMounted = false;
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  const filteredVessels = useMemo(() => {
    if (selectedFilter === "all") return data.vessels;
    return data.vessels.filter((vessel) => vessel.statusClass === selectedFilter);
  }, [data.vessels, selectedFilter]);

  useEffect(() => {
    if (!filteredVessels.length) {
      setSelectedVesselId(0);
      return;
    }

    const stillExists = filteredVessels.some(
      (vessel) => vessel.id === selectedVesselId
    );

    if (!stillExists) {
      setSelectedVesselId(filteredVessels[0].id);
    }
  }, [filteredVessels, selectedVesselId]);

  const selected = useMemo(() => {
    return (
      filteredVessels.find((vessel) => vessel.id === selectedVesselId) ||
      filteredVessels[0] ||
      null
    );
  }, [filteredVessels, selectedVesselId]);

  const statItems = [
    {
      key: "all" as FilterKey,
      label: "TOTAL FLEET",
      value: data.totalFleet,
    },
    {
      key: "enroute" as FilterKey,
      label: "EN ROUTE",
      value: data.enRoute,
    },
    {
      key: "inport" as FilterKey,
      label: "IN PORT",
      value: data.inPort,
    },
    {
      key: "delayed" as FilterKey,
      label: "DELAYED",
      value: data.delayed,
    },
    {
      key: "maintenance" as FilterKey,
      label: "MAINTENANCE",
      value: data.maintenance,
    },
  ];

  return (
    <main className="operator-page">
      <header className="operator-topbar">
        <div className="operator-brand">
          <img
            src="/logo-thalassa.png"
            alt="Thalassa Logo"
            className="operator-brand-logo"
          />
          <div className="operator-brand-text">
            <span className="operator-brand-title">
              THALASSA SISTERHOOD GROUP
            </span>
            <span className="operator-brand-sub">FLEET MONITORING</span>
          </div>
        </div>

        <nav className="operator-nav">
          <a href="#">FLEET</a>
          <a href="#">MAP</a>
          <a href="#">ANALYTICS</a>
        </nav>

        <div className="operator-actions">
          <button className="icon-btn" type="button">
            ⌲
          </button>
          <button className="role-btn" type="button">
            OPERATOR
          </button>
          <Link href="/" className="logout-btn">
            LOGOUT
          </Link>
        </div>
      </header>

      <div className="operator-livebar">
        <span className="live-dot" />
        <span>{isConnected ? "LIVE" : "RECONNECTING"}</span>
        <span>{formatUtcTime(data.serverTime)}</span>
      </div>

      <section className="operator-stats">
        {statItems.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`stat-card ${
              selectedFilter === item.key ? "stat-filter-active" : ""
            }`}
            onClick={() => setSelectedFilter(item.key)}
          >
            <span className="stat-number">{item.value}</span>
            <span className="stat-label">{item.label}</span>
          </button>
        ))}
      </section>

      <section className="operator-main">
        <div className="operator-left">
          <div className="section-head">
            <h2>FLEET VESSELS</h2>
            <span>{filteredVessels.length} vessels</span>
          </div>

          <div className="vessel-grid">
            {filteredVessels.map((vessel) => (
              <article
                key={vessel.id}
                className={`vessel-card vessel-${vessel.accent} ${
                  selectedVesselId === vessel.id ? "vessel-selected" : ""
                }`}
                onClick={() => setSelectedVesselId(vessel.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="vessel-top">
                  <span className={`vessel-status ${vessel.statusClass}`}>
                    {vessel.status}
                  </span>
                  <button className="vessel-arrow" type="button">
                    ›
                  </button>
                </div>

                <h3>{vessel.name}</h3>
                <p className="vessel-type">{vessel.type}</p>

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

                <div className="fuel-row">
                  <div className="fuel-track">
                    <div
                      className="fuel-fill"
                      style={{ width: `${vessel.fuel}%` }}
                    />
                  </div>
                  <span>{vessel.fuel.toFixed(1)}%</span>
                </div>

                <div className="vessel-location">{vessel.location}</div>
              </article>
            ))}

            {!filteredVessels.length && (
              <div className="empty-filter-state">
                No vessels found for this filter.
              </div>
            )}
          </div>
        </div>

        <aside className="operator-right">
          <div className="detail-card">
            {selected ? (
              <>
                <p className="detail-vessel-name">{selected.name}</p>

                <div className="detail-coords">
                  <div>{formatCoord(selected.lat, "lat")}</div>
                  <div>{formatCoord(selected.lng, "lng")}</div>
                </div>

                <div className="detail-metrics">
                  <div className="detail-metric-box">
                    <span>SPEED</span>
                    <strong>{selected.speed.toFixed(1)} kn</strong>
                  </div>
                  <div className="detail-metric-box">
                    <span>HEADING</span>
                    <strong>{selected.heading}°</strong>
                  </div>
                </div>

                <button className="detail-btn" type="button">
                  View Full Details
                </button>
              </>
            ) : (
              <p className="detail-vessel-name">No vessel in this filter.</p>
            )}
          </div>

          <div className="status-card">
            <h3>FLEET STATUS</h3>

            <div className="status-list">
              {filteredVessels.map((vessel) => (
                <div
                  key={vessel.id}
                  className={`status-item ${
                    selectedVesselId === vessel.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedVesselId(vessel.id)}
                  style={{ cursor: "pointer" }}
                >
                  <span className={`status-dot ${vessel.statusClass}`} />
                  <div>
                    <strong>{vessel.name}</strong>
                    <p>{vessel.status}</p>
                  </div>
                  <span>{vessel.speed.toFixed(1)} kn</span>
                </div>
              ))}

              {!filteredVessels.length && (
                <div className="empty-filter-state small">
                  No status data for this filter.
                </div>
              )}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}