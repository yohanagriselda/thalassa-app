"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AnalyticsPage() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  const navItems = [
    { label: "FLEET", href: "/operator" },
    { label: "MAP", href: "/operator/map" },
    { label: "ANALYTICS", href: "/operator/analytics" },
  ];

  return (
    <div className="anl-root">
      <header className="anl-header">
        <div className="anl-brand">
          <div className="anl-logo-wrapper">
            <Image src="/logo-thalassa.png" alt="Logo" width={32} height={32} />
          </div>
          <div className="anl-brand-text">
            <div className="anl-company-name">THALASSA SISTERHOOD GROUP</div>
            <div className="anl-sub-brand">FLEET MONITORING</div>
          </div>
        </div>

        <nav className="operator-nav">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="anl-actions">
          <button className="icon-btn">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </button>
          <button className="operator-btn">OPERATOR</button>
          <button className="logout-btn" onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </header>

      <main className="anl-body">
        <div className="fade-in">
          <div className="anl-title-bar">
            <h2 className="anl-page-title">Fleet Analytics</h2>
            <div className="anl-live-badge">
              <span className="dot-live"></span>
              LIVE STREAMING
            </div>
          </div>

          <div className="anl-stats-grid">
            <div className="anl-card purple">
              <span className="icon">🚢</span>
              <h3>6</h3>
              <p>TOTAL VESSELS</p>
            </div>
            <div className="anl-card green">
              <span className="icon">📈</span>
              <h3>3</h3>
              <p>ACTIVE</p>
            </div>
            <div className="anl-card blue">
              <span className="icon">⚡</span>
              <h3>11.3 kn</h3>
              <p>AVG SPEED</p>
            </div>
            <div className="anl-card skyblue">
              <span className="icon">👥</span>
              <h3>142</h3>
              <p>TOTAL CREW</p>
            </div>
            <div className="anl-card yellow">
              <span className="icon">⛽</span>
              <h3>62%</h3>
              <p>AVG FUEL</p>
            </div>
            <div className="anl-card red">
              <span className="icon">⚠️</span>
              <h3>2</h3>
              <p>ALERTS</p>
            </div>
          </div>

          <div className="anl-charts-grid">
            <div className="anl-chart-box">
              <p className="chart-label">Fuel Consumption & Efficiency</p>
              <div className="line-sim">
                <svg viewBox="0 0 500 100" className="svg-line">
                  <polyline
                    fill="none"
                    stroke="#00ff88"
                    strokeWidth="3"
                    points="0,80 80,40 160,60 240,20 320,40 400,30 500,50"
                  />
                </svg>
              </div>
            </div>
            <div className="anl-chart-box">
              <p className="chart-label">Vessel Activity (24H)</p>
              <div className="bar-sim">
                {[40, 65, 50, 90, 70, 45].map((h, i) => (
                  <div
                    key={i}
                    className={`bar ${h === 90 ? "active" : ""}`}
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="anl-charts-grid footer-charts">
            <div className="anl-chart-box">
              <p className="chart-label">Cargo Type Distribution</p>
              <div className="cargo-bars">
                <div className="c-bar p-purple" style={{ height: "90%" }}></div>
                <div className="c-bar p-dim" style={{ height: "60%" }}></div>
                <div className="c-bar p-purple" style={{ height: "45%" }}></div>
                <div className="c-bar p-dim" style={{ height: "30%" }}></div>
              </div>
            </div>
            <div className="anl-chart-box">
              <p className="chart-label">Fleet Status Overview</p>
              <div className="status-container">
                <StatusItem label="En Route" val="3/6" color="#00ff88" p="50%" />
                <StatusItem label="In Port" val="1/6" color="#00d1ff" p="16%" />
                <StatusItem label="Delayed" val="1/6" color="#ffcc00" p="16%" />
                <StatusItem label="Maintenance" val="1/6" color="#ff4444" p="16%" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatusItem({
  label,
  val,
  color,
  p,
}: {
  label: string;
  val: string;
  color: string;
  p: string;
}) {
  return (
    <div className="status-row">
      <div className="s-info">
        <span>{label}</span> <span>{val}</span>
      </div>
      <div className="s-bar-bg">
        <div
          className="s-bar-fill"
          style={{ width: p, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
}