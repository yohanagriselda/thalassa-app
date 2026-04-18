import Link from "next/link";

export default function TrackingPage() {
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

        <div className="tracking-content">
          <div className="tracking-line">
            <span>CARGO TRACKING</span>
          </div>

          <p className="tracking-mini">REAL-TIME VESSEL TRACKING</p>

          <h1 className="tracking-title">TRACK YOUR SHIPMENT</h1>

          <p className="tracking-desc">
            Enter the receipt number or Vessel ID to monitor cargo location in real-time.
          </p>

          <form className="tracking-form">
            <div className="tracking-input-wrap">
              <input
                type="text"
                placeholder="Enter Receipt Number / Vessel ID"
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
      </section>
    </main>
  );
}