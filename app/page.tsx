"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap');

        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --purple: #8B5CF6;
          --purple-light: #A78BFA;
          --purple-bright: #7C3AED;
          --bg-dark: #0a0a0f;
          --text-white: #ffffff;
          --text-muted: #9ca3af;
        }

        body {
          font-family: 'Roboto Mono', monospace;
          background: var(--bg-dark);
          color: var(--text-white);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* NAVBAR */
        .navbar {
          background: rgba(10, 10, 15, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 0 48px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-logo-img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1.5px solid rgba(139,92,246,0.6);
          object-fit: cover;
          background: rgba(139, 92, 246, 0.1);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .brand-name {
          font-family: 'Roboto Mono', monospace;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.15em;
          color: var(--text-white);
          text-transform: uppercase;
        }

        .brand-sub {
          font-family: 'Roboto Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .btn-login {
          background: var(--purple);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 24px;
          font-family: 'Roboto Mono', monospace;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }

        .btn-login:hover {
          background: var(--purple-bright);
          transform: translateY(-1px);
        }

        /* HERO */
        .hero {
          position: relative;
          min-height: calc(100vh - 64px);
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        /* Real photo background */
        .hero-bg-img {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* Dark overlay on top of photo */
        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(180deg,
              rgba(10,10,15,0.55) 0%,
              rgba(10,10,15,0.35) 40%,
              rgba(10,10,15,0.65) 80%,
              rgba(10,10,15,1) 100%
            ),
            linear-gradient(90deg,
              rgba(10,10,15,0.75) 0%,
              rgba(10,10,15,0.15) 50%,
              rgba(10,10,15,0.55) 100%
            );
        }

        .purple-glow {
          position: absolute;
          bottom: -120px;
          left: -100px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 2;
        }

        /* HERO CONTENT */
        .hero-content {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 80px;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
        }

        .hero-left {
          max-width: 540px;
          animation: fadeUp 0.9s ease forwards;
          opacity: 0;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .title-primelog {
          font-family: 'Roboto Mono', monospace;
          font-weight: 700;
          font-size: 76px;
          line-height: 1.0;
          color: var(--text-white);
          letter-spacing: -0.02em;
        }

        .title-fleet {
          font-family: 'Roboto Mono', monospace;
          font-weight: 700;
          font-size: 60px;
          line-height: 1.05;
          color: var(--purple-light);
          letter-spacing: -0.02em;
          margin-bottom: 28px;
        }

        .hero-desc {
          font-family: 'Roboto Mono', monospace;
          font-size: 13px;
          line-height: 1.8;
          color: rgba(255,255,255,0.65);
          max-width: 420px;
          margin-bottom: 40px;
        }

        .btn-masuk {
          display: inline-block;
          background: var(--purple);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 16px 32px;
          font-family: 'Roboto Mono', monospace;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 0 28px rgba(124,58,237,0.45);
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          margin-bottom: 64px;
          letter-spacing: 0.02em;
        }

        .btn-masuk:hover {
          background: var(--purple-bright);
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(124,58,237,0.65);
        }

        .stats-row {
          display: flex;
          justify-content: flex-start;
          gap: 60px;
          margin-top: 20px;
        }

        .stats-row > div {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .stat-num {
          font-family: 'Roboto Mono', monospace;
          font-weight: 700;
          font-size: 38px;
          color: var(--purple-light);
          line-height: 1;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .stat-lbl {
          font-family: 'Roboto Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* LOGO BADGE */
        .hero-right {
          animation: fadeIn 1.1s ease forwards;
          opacity: 0;
          animation-delay: 0.35s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        
        .logo-badge {
          width: 315px;
          height: 315px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          box-shadow:
            0 0 60px rgba(101, 43, 236, 0.25),
            inset 0 0 40px rgba(255,255,255,0.03);
          position: relative;
          overflow: hidden;
          background: rgba(255,255,255,0.08);
        }

        .logo-badge::before {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px solid rgba(139,92,246,0.3);
          animation: spin 10s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .logo-badge-img {
          width: 300px;
          height: 300px;
          border-radius: 50%;
          object-fit: cover;
        }

        .badge-caption {
          text-align: center;
        }

        .badge-title {
          font-family: 'Roboto Mono', monospace;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.9);
          text-transform: uppercase;
          display: block;
        }

        .badge-sub {
          font-family: 'Roboto Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          text-transform: uppercase;
          display: block;
          margin-top: 4px;
        }

        /* ── FEATURES SECTION ── */
        .features-section {
          background: #000;
          padding: 90px 80px;
          border-top: 1px solid rgba(255,255,255,0.04);
        }
 
        .section-header {
          text-align: center;
          margin-bottom: 56px;
        }
 
        .section-title {
          font-family: 'Roboto Mono', monospace;
          font-weight: 700;
          font-size: 28px;
          color: var(--text-white);
          letter-spacing: -0.01em;
          margin-bottom: 10px;
        }
 
        .section-sub {
          font-family: 'Roboto Mono', monospace;
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.04em;
        }
 
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 1100px;
          margin: 0 auto;
        }
 
        .feature-card {
          background: #3b0d6e;
          border: 5px;
          border-radius: 18px;
          padding: 28px 24px 32px 24px;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s;
        }
 
        .feature-card:hover {
          transform: translateY(-3px);
        }
        
        .feature-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
 
        .feature-name {
          font-family: 'Roboto Mono', monospace;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: #fff;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
 
        .feature-desc {
          font-family: 'Roboto Mono', monospace;
          font-size: 10px;
          line-height: 1.75;
          color: rgba(255,255,255,0.65);
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
 
        /* ── MARITIME SECTION ── */
        .maritime-section {
          background: linear-gradient(135deg, #1a0a3a 0%, #0f0720 40%, #120830 100%);
          padding: 130px 80px;
          display: flex;
          align-items: center;
          gap: 80px;
          border-top: 1px solid rgba(139,92,246,0.15);
          position: relative;
          overflow: hidden;
          min-height: 100vh;
        }
 
        .maritime-section::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
 
        .maritime-left {
          flex: 1;
          position: relative;
          z-index: 2;
        }
 
        .maritime-label {
          font-family: 'Roboto Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--purple-light);
          text-transform: uppercase;
          margin-bottom: 18px;
          display: block;
        }
 
        .maritime-title {
          font-family: 'Roboto Mono', monospace;
          font-weight: 700;
          font-size: 22px;
          color: var(--text-white);
          line-height: 1.35;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
        }
 
        .maritime-desc {
          font-family: 'Roboto Mono', monospace;
          font-size: 18px;
          line-height: 1.85;
          color: rgba(255,255,255,0.5);
          margin-bottom: 28px;
          max-width: 480px;
        }
        
        .maritime-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          test:13
        }
 
        .maritime-bullets li {
          font-family: 'Roboto Mono', monospace;
          font-size: 11px;
          color: white;
          display: flex;
          align-items: center;
          gap: 10px;
          letter-spacing: 0.02em;
        }
 
        .maritime-bullets li::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--purple-light);
          flex-shrink: 0;
        }
 
        .maritime-right {
          flex: 0 0 400px;
          position: relative;
          z-index: 2;
        }
 
        .maritime-img-wrap {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow:
            0 24px 80px rgba(0,0,0,0.5),
            0 0 0 1px rgba(139,92,246,0.1);
          position: relative;
        }
 
        .maritime-img {
          width: 100%;
          height: 340px;
          object-fit: cover;
          display: block;
          filter: brightness(0.8) saturate(0.85);
        }
 
        .maritime-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(139,92,246,0.15) 0%, transparent 60%);
        }

        /* FOOTER */
        .footer {
          background: #0d0d14;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 18px 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-logo-img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(139,92,246,0.4);
        }

        .footer-text {
          font-family: 'Roboto Mono', monospace;
          font-size: 10.5px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.04em;
        }

        .footer-copy {
          font-family: 'Roboto Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.04em;
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-brand">
          <img
            src="/logo-thalassa.png"
            alt="Thalassa Logo"
            className="brand-logo-img"
          />
          <div className="brand-text">
            <span className="brand-name">Thalassa Sisterhood Group</span>
            <span className="brand-sub">Shipping &amp; Maritime</span>
          </div>
        </div>
        <button className="btn-login" onClick={() => router.push('/login')}>Login</button>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <img
          src="/bg_cp.png"
          alt="Background"
          className="hero-bg-img"
        />
        <div className="purple-glow" />

        {/* Main content */}
        <div className="hero-content">
          {/* Left: Text */}
          <div className="hero-left">
            <h1 className="title-primelog">PrimeLog</h1>
            <h1 className="title-fleet">Fleet System</h1>

            <p className="hero-desc">
              Real-time ship monitoring for position,<br />
              weather, and route intelligence. Monitor your<br />
              entire fleet from one powerful dashboard.
            </p>

            <a href="/login" className="btn-masuk">Get Started</a>

            <div className="stats-row">
              <div>
                <span className="stat-num">6+</span>
                <span className="stat-lbl">Fleet</span>
              </div>
              <div>
                <span className="stat-num">3s</span>
                <span className="stat-lbl">Update Interval</span>
              </div>
              <div>
                <span className="stat-num">24/7</span>
                <span className="stat-lbl">Live Monitoring</span>
              </div>
            </div>
          </div>

          {/* Right: Thalassa Logo Badge */}
          <div className="hero-right">
            <div className="logo-badge">
              <img
                src="/logo-thalassa.png"
                alt="Thalassa Sisterhood Group"
                className="logo-badge-img"
              />
            </div>
            <div className="badge-caption">
              <span className="badge-title">Thalassa Sisterhood Group</span>
              <span className="badge-sub">Est. 2026 · Shipping &amp; Maritime</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Everything you need to monitor your fleet</h2>
          <p className="section-sub">Powerful features for comprehensive fleet management</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.9)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M16.9 16.9l2.1 2.1M19.1 4.9l-2.1 2.1M7.1 16.9l-2.1 2.1"/>
              </svg>
            </div>
            <div className="feature-name">Real – Time Tracking</div>
            <div className="feature-desc">MONITOR VESSEL POSITIONS WITH GPS PRECISIONS AND LIVE COORDINATE UPDATES EVERY 3 SECONDS.</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.9)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <div className="feature-name">Analytics &amp; Insights</div>
            <div className="feature-desc">PERFORMANCE METRICS, FUEL CONSUMPTION ANALYSIS, AND ROUTE OPTIMAZATION DATA.</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.9)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </div>
            <div className="feature-name">Smart Alerts</div>
            <div className="feature-desc">WEATHER WARNINGS, MAINTENANCE ALERTS, AND EMERGENCY NOTIFICATIONS WITH AUDIO.</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.9)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
            </div>
            <div className="feature-name">Multi-Fleet Dashboard</div>
            <div className="feature-desc">ADVANCE ROUTE PLANNING WITH ETA CALCULATIONS AND DEVIATION DETECTION.</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.9)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <div className="feature-name">Voyage Reports</div>
            <div className="feature-desc">ROLE-BASED AUTHENTICATION WITH ADMIN AND OPERATOR ACSESS LEVELS.</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.9)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <div className="feature-name">High Performance</div>
            <div className="feature-desc">LIGHTNING-FAST DASHBOARD WITH REAL-TIME DATA STREAMING AND MINIMAL LATENCY.</div>
          </div>
        </div>
      </section>
 
      {/* ── BUILT FOR MARITIME PROFESSIONALS ── */}
      <section className="maritime-section">
        <div className="maritime-left">
          <span className="maritime-label">Built for Maritime Professionals</span>
          <h2 className="maritime-title">
            PrimeLog Fleet combines cutting-edge technology with an intuitive interface designed for operators and fleet managers
          </h2>
          <ul className="maritime-bullets">
            <li>Real-time data updates every 3 seconds</li>
            <li>Interactive maps with vessel tracking</li>
            <li>Comprehensive analytics dashboard</li>
            <li>Advanced alert system with notifications</li>
            <li>Role-based access control</li>
          </ul>
        </div>
        <div className="maritime-right">
          <div className="maritime-img-wrap">
            <img src="/gambar-cp-3.png" alt="Maritime Operations" className="maritime-img" />
            <div className="maritime-img-overlay" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-left">
          <img
            src="/logo-thalassa.png"
            alt="Thalassa Logo"
            className="footer-logo-img"
          />
          <span className="footer-text">Thalassa Sisterhood Group • PrimeLog Fleet System</span>
        </div>
        <span className="footer-copy">© 2026 Thalassa Sisterhood Group. All rights reserved.</span>
      </footer>
    </>
  );
}