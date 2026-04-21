"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FleetMapPage() {
  const [selectedVessel, setSelectedVessel] = useState<any>(null);
  const router = useRouter();

  // Data Dummy Kapal yang banyak biar bisa di-scroll
  const vesselsData = [
    { id: 1, name: "MV Pacific Star", speed: "18.5 kn", heading: "144°", dest: "Singapore", status: "EN ROUTE", top: "40%", left: "30%", color: "#00ff88" },
    { id: 2, name: "MV Ocean Voyager", speed: "0.0 kn", heading: "0°", dest: "Port of Surabaya", status: "IN PORT", top: "65%", left: "45%", color: "#00d1ff" },
    { id: 3, name: "MV Maritime Express", speed: "7.9 kn", heading: "270°", dest: "Port Klang", status: "DELAYED", top: "55%", left: "25%", color: "#ffcc00" },
    { id: 4, name: "MV Cargo Master", speed: "15.2 kn", heading: "90°", dest: "Jakarta", status: "EN ROUTE", top: "45%", left: "55%", color: "#00ff88" },
    { id: 5, name: "MV Global Traders", speed: "19.0 kn", heading: "180°", dest: "Kaohsiung", status: "EN ROUTE", top: "70%", left: "35%", color: "#00ff88" },
    { id: 6, name: "MV Northern Light", speed: "0.0 kn", heading: "0°", dest: "Tanjung Priok", status: "MAINTENANCE", top: "35%", left: "50%", color: "#ff4444" },
    { id: 7, name: "MV Southern Wind", speed: "11.1 kn", heading: "110°", dest: "Hong Kong", status: "DELAYED", top: "60%", left: "60%", color: "#ffcc00" },
  ];

  return (
    <div className="operator-page">
      {/* NAVBAR: Sesuai Gambar 1 */}
      <header className="operator-topbar">
        <div className="brand-block">
          <div className="brand-logo">
            <Image src="/logo-thalassa.png" alt="Logo" width={44} height={44} priority />
          </div>
          <div>
            <h1>THALASSA SISTERHOOD GROUP</h1>
            <p>FLEET MONITORING</p>
          </div>
        </div>

        <nav className="operator-nav">
          <button onClick={() => router.push("/operator/fleet")}>FLEET</button>
          <button className="active">MAP</button>
          <button onClick={() => router.push("/operator/analytics")}>ANALYTICS</button>
        </nav>

        <div className="operator-actions">
          <button className="icon-btn">⛶</button>
          <button className="operator-btn active">OPERATOR</button>
          <button className="logout-btn" onClick={() => router.push("/login")}>LOGOUT</button>
        </div>
      </header>

      {/* MAIN LAYOUT: Peta Kiri, Sidebar Kanan */}
      <main className="map-main-layout">
        
        {/* AREA PETA (Gambar 2 - Diam di Tempat) */}
        <div className="map-left-side">
          <div className="map-canvas-container">
            <div className="map-image-wrapper">
              <Image 
                src="/peta.png" // Pastikan file gambar petanya ada di folder public/
                alt="Maritime Map" 
                fill 
                className="map-image"
                priority
              />
              
              {/* PIN KAPAL DI ATAS PETA */}
              {vesselsData.map((v) => (
                <div 
                  key={v.id} 
                  className="map-ship-pin" 
                  style={{ top: v.top, left: v.left, backgroundColor: v.color }}
                  onClick={() => setSelectedVessel(v)}
                >
                  🚢
                </div>
              ))}

              {/* POPUP KECIL SAAT KAPAL DIKLIK */}
              {selectedVessel && (
                <div className="vessel-popup-overlay">
                  <div className="mini-popup">
                    <button className="close-popup" onClick={() => setSelectedVessel(null)}>×</button>
                    <h3>{selectedVessel.name}</h3>
                    <div className="popup-info">
                      <p>Status: <strong>{selectedVessel.status}</strong></p>
                      <p>Speed: <strong>{selectedVessel.speed}</strong></p>
                      <p>Heading: <strong>{selectedVessel.heading}</strong></p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SIDEBAR DAFTAR KAPAL (Kanan - BISA DI-SCROLL) */}
        <aside className="map-sidebar-right">
          <div className="sidebar-header">
            <h3>ALL FLEET LIST</h3>
            <span className="vessel-count">{vesselsData.length} Vessels</span>
          </div>
          
          <div className="sidebar-scroll-area">
            {vesselsData.map((v) => (
              <div 
                key={v.id} 
                className={`vessel-item-card ${selectedVessel?.id === v.id ? "active-card" : ""}`}
                onClick={() => setSelectedVessel(v)}
              >
                <div className="v-header">
                  <span className="v-icon">🚢</span>
                  <div>
                    <h4>{v.name}</h4>
                    <p className="v-type">Container Ship</p>
                  </div>
                </div>
                <div className="v-details">
                  <p>
                    <span>⏲ {v.speed}</span>
                    <span style={{ marginLeft: "15px" }}>🧭 {v.heading}</span>
                  </p>
                  <p>⚓ {v.dest}</p>
                </div>
                <div className="v-status-row">
                  <span className="dot" style={{ backgroundColor: v.color }}></span>
                  <span className="status-text">{v.status}</span>
                  <button className="view-detail-btn">View Details ↗</button>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}