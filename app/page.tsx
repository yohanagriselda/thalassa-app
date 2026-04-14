"use client";

import Image from "next/image";
import bgImage from "./background_cp.jpg";
import logoThalassa from "./logo thalassa.jpg";

export default function Home() {
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
          background: rgba(10, 10, 15, 0.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 0 48px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-logo-img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid rgba(255,255,255,0.2);
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
          letter-spacing: 0.18em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .btn-login {
          background: var(--purple);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 11px 28px;
          font-family: 'Roboto Mono', monospace;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.04em;
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
          min-height: calc(100vh - 68px);
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        /* Background image */
        .hero-bg-img {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* Dark overlay on top of BG */
        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(
              180deg,
              rgba(8,8,14,0.55) 0%,
              rgba(8,8,14,0.35) 40%,
              rgba(8,8,14,0.55) 75%,
              rgba(8,8,14,0.95) 100%
            ),
            linear-gradient(
              90deg,
              rgba(8,8,14,0.75) 0%,
              rgba(8,8,14,0.15) 45%,
              rgba(8,8,14,0.5) 100%
            );
        }

        /* Purple ambient glow bottom-left */
        .glow-left {
          position: absolute;
          bottom: -80px;
          left: -60px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 68%);
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
          padding: 0 72px;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
        }

        /* LEFT */
        .hero-left {
          max-width: 520px;
          animation: fadeUp 0.85s ease forwards;
          opacity: 0;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .title-primelog {
          font-family: 'Roboto Mono', monospace;
          font-weight: 700;
          font-size: 72px;
          line-height: 1.0;
          color: var(--text-white);
          letter-spacing: -0.01em;
        }

        .title-fleet {
          font-family: 'Roboto Mono', monospace;
          font-weight: 700;
          font-size: 64px;
          line-height: 1.05;
          color: var(--purple-light);
          letter-spacing: -0.01em;
          margin-bottom: 28px;
        }

        .hero-desc {
          font-family: 'Roboto Mono', monospace;
          font-size: 13px;
          line-height: 1.85;
          color: rgba(255,255,255,0.65);
          max-width: 430px;
          margin-bottom: 40px;
          letter-spacing: 0.01em;
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
          font-size: 14px;
          letter-spacing: 0.04em;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 0 28px rgba(124,58,237,0.45);
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          margin-bottom: 64px;
        }

        .btn-masuk:hover {
          background: var(--purple-bright);
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(124,58,237,0.65);
        }

        /* STATS */
        .stats-row {
          display: flex;
          gap: 52px;
        }

        .stat-num {
          font-family: 'Roboto Mono', monospace;
          font-weight: 700;
          font-size: 32px;
          color: var(--purple-light);
          display: block;
          letter-spacing: -0.01em;
        }

        .stat-lbl {
          font-family: 'Roboto Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.04em;
        }

        /* RIGHT — Logo Badge */
        .hero-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          animation: fadeIn 1.1s ease forwards;
          opacity: 0;
          animation-delay: 0.3s;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }

        .logo-badge {
          width: 210px;
          height: 210px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(255,255,255,0.15);
          box-shadow:
            0 0 0 8px rgba(139,92,246,0.12),
            0 0 60px rgba(139,92,246,0.3);
          position: relative;
        }

        .logo-badge-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .badge-info {
          text-align: center;
        }

        .badge-title {
          font-family: 'Roboto Mono', monospace;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.88);
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .badge-sub {
          font-family: 'Roboto Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.4);
        }

        /* FOOTER */
        .footer {
          background: #0d0d14;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 20px 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-logo-img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(255,255,255,0.12);
        }

        .footer-text {
          font-family: 'Roboto Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.03em;
        }

        .footer-copy {
          font-family: 'Roboto Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.03em;
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-brand">
          <Image
            src={logoThalassa}
            alt="Thalassa Logo"
            width={42}
            height={42}
            className="brand-logo-img"
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
          <div className="brand-text">
            <span className="brand-name">Thalassa Sisterhood Group</span>
            <span className="brand-sub">Shipping &amp; Maritime</span>
          </div>
        </div>
        <button className="btn-login">Login</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        {/* Background image */}
        <Image
          src={bgImage}
          alt="Background"
          fill
          className="hero-bg-img"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />

        {/* Overlays */}
        <div className="hero-overlay" />
        <div className="glow-left" />

        {/* Content */}
        <div className="hero-content">
          {/* LEFT */}
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

          {/* RIGHT — Logo badge */}
          <div className="hero-right">
            <div className="logo-badge">
              <Image
                src={logoThalassa}
                alt="Thalassa Sisterhood Group"
                width={210}
                height={210}
                className="logo-badge-img"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="badge-info">
              <p className="badge-title">Thalassa Sisterhood Group</p>
              <p className="badge-sub">· Est. 2026 · Shipping &amp; Maritime</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-left">
          <Image
            src={logoThalassa}
            alt="Thalassa Logo"
            width={32}
            height={32}
            className="footer-logo-img"
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
          <span className="footer-text">Thalassa Sisterhood Group • PrimeLog Fleet System</span>
        </div>
        <span className="footer-copy">© 2026 Thalassa Sisterhood Group. All rights reserved.</span>
      </footer>
    </>
  );
}