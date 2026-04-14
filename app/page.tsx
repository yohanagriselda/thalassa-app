"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
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

        /* HERO CONTENTs */
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
          gap: 52px;
        }

        .stat-num {
          font-family: 'Roboto Mono', monospace;
          font-weight: 700;
          font-size: 34px;
          color: var(--purple-light);
          display: block;
          letter-spacing: -0.02em;
        }

        .stat-lbl {
          font-family: 'Roboto Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.06em;
          text-transform: uppercase;
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
        <button className="btn-login">Login</button>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        {/* Real background photo */}
        <img
          src="/background_cp.jpg"
          alt="Background"
          className="hero-bg-img"
        />
        <div className="hero-overlay" />
        <div className="purple-glow" />

        {/* Main content */}
        <div className="hero-content">
          {/* Left: Text */}
          <div className="hero-left">
            <h1 className="title-primelog">PrimeLog</h1>
            <h1 className="title-fleet">Fleet System</h1>

            <p className="hero-desc">
              Sistem monitoring armada kapal Thalassa Sisterhood<br />
              Group – pantau posisi, status, dan rute kapal secara<br />
              real-time.
            </p>

            <a href="/login" className="btn-masuk">Masuk ke Sistem</a>

            <div className="stats-row">
              <div>
                <span className="stat-num">6+</span>
                <span className="stat-lbl">Armada Kapal</span>
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