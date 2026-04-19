"use client";

import Link from "next/link";
import { useState } from "react";

export default function TrackingPage() {
  // State untuk mengontrol apakah hasil pencarian ditampilkan
  const [showDetail, setShowDetail] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (receiptNumber.trim() !== "") {
      setShowDetail(true);
    } else {
      alert("Please enter a valid receipt number.");
    }
  };

  const handleBack = () => {
    setShowDetail(false);
  };

  return (
    <main className="tracking-page">
      <nav className="navbar">
        <div className="navbar-brand">
          <img
            src="/logo-thalassa.png"
            alt="Thalassa Logo"
            className="brand-logo-img"
          />
          <div className="brand-text">
            <span className="brand-name">THALASSA SISTERHOOD GROUP</span>
            <span className="brand-sub">MARITIME CARGO SYSTEM</span>
          </div>
        </div>

        <div className="navbar-menu">
          <Link href="/">HOME</Link>
          <a href="#">SERVICES</a>
          <a href="#">FLEET</a>
          <a href="#">CONTACT</a>
        </div>

        <Link href="/login" className="login-btn">
          LOG IN
        </Link>
      </nav>

      <section className="tracking-hero">
        <div className="tracking-corner corner-top-left" />
        <div className="tracking-corner corner-top-right" />
        <div className="tracking-corner corner-bottom-left" />
        <div className="tracking-corner corner-bottom-right" />

        {!showDetail ? (
          /* --- TAMPILAN 1: FORM INPUT (AWAL) --- */
          <div className="tracking-content">
            <div className="tracking-line">
              <span>CARGO TRACKING</span>
            </div>

            <p className="tracking-mini">REAL-TIME VESSEL TRACKING</p>
            <h1 className="tracking-title">TRACK YOUR SHIPMENT</h1>
            <p className="tracking-desc">
              Enter the receipt number or Vessel ID to monitor cargo location in real-time.
            </p>

            <form className="tracking-form" onSubmit={handleTrack}>
              <div className="tracking-input-wrap">
                <input
                  type="text"
                  placeholder="Enter Receipt Number / Vessel ID"
                  value={receiptNumber}
                  onChange={(e) => setReceiptNumber(e.target.value)}
                  required
                />
                <span className="tracking-search-icon">⌕</span>
              </div>

            <button type="submit" className="tracking-submit">
              TRACK SHIPMENT
            </button>
          </form>

          <p className="tracking-example">
            Example: <span>PLF-2026-0417-SG</span> &nbsp; <span>MV-POLARIS-001</span>
          </p>

          <div className="tracking-features">
            <span>● Live Tracking</span>
            <span>● Real-Time ETA</span>
            <span>● Port Notifications</span>
          </div>
        </div>
      ) : (
        /* --- TAMPILAN 2: DETAIL PELACAKAN (SETELAH KLIK) --- */
          <div className="tracking-detail-container">
            {/* Tombol Back sesuai gambar */}
            <button onClick={handleBack} className="back-btn-purple">
              Back
            </button>

            <h2 className="detail-header-title">SHIPPING TRACKING DETAIL</h2>
            <p className="detail-header-sub">Shipment Tracking Detail Real-Time</p>

            <div className="map-wrapper">
              <img src="/peta.png" alt="Shipping Map" className="map-img" />
              <div className="map-vessel-marker"></div>
              <div className="map-controls">
                <button>+</button>
                <button>-</button>
              </div>
            </div>

            <div className="detail-info-grid">
              {/* Box Kiri: Shipping Information */}
              <div className="info-card">
                <h3>SHIPPING INFORMATION</h3>
                <div className="info-row"><span>SHIPPING</span> <span>Jakarta to Surabaya</span></div>
                <div className="info-row"><span>RECEIPT NUMBER</span> <span>{receiptNumber}</span></div>
                <div className="info-row"><span>VESSEL</span> <span>MV Polaris</span></div>
                <div className="info-row"><span>VESSEL ID</span> <span>MV-POLARIS-001</span></div>
                <div className="info-row"><span>CARGO TYPE</span> <span>Container Cargo</span></div>
                <div className="info-row"><span>ROUTE DISTANCE</span> <span>887 NM</span></div>
              </div>

              {/* Box Kanan: Shipment History (Vertical Stepper) */}
              <div className="history-card">
                <h3>SHIPMENT HISTORY</h3>
                <div className="history-item">
                  <div className="dot active" />
                  <div className="history-text">
                    <p>The package arrived at the Port of Tanjung Perak, Surabaya</p>
                    <span>18th Apr 14:00 WIB</span>
                  </div>
                </div>
                <div className="history-item">
                  <div className="dot" />
                  <div className="history-text">
                    <p>The ship left Tanjung Priok Port</p>
                    <span>15th Apr 14:00 WIB</span>
                  </div>
                </div>
                <div className="history-item">
                  <div className="dot" />
                  <div className="history-text">
                    <p>Cargo is loaded onto the MV Polaris</p>
                    <span>15th Apr 04:00 WIB</span>
                  </div>
                </div>
                <div className="history-item">
                  <div className="dot" />
                  <div className="history-text">
                    <p>Order received & confirmed</p>
                    <span>14th Apr 14:00 WIB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}