import Link from "next/link";

export default function Home() {
  return (
    <main className="thalassa-page">
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
          <Link href="/services">SERVICES</Link>
          <a href="#fleet">FLEET</a>
          <a href="#contact">CONTACT</a>
        </div>

        <Link href="/login" className="login-btn">
          LOG IN
        </Link>
      </nav>

      <section className="hero-section" id="home">
        <div className="hero-overlay" />

        <div className="system-badge">
          ■ MARITIME INTELLIGENCE SYSTEM • ONLINE
        </div>

        <div className="hero-content">
          <div className="hero-logo-wrap">
            <img
              src="/logo-thalassa.png"
              alt="Thalassa Sisterhood Group"
              className="hero-logo"
            />
          </div>

          <h1 className="hero-title">
            <span className="hero-title-top">THALASSA</span>
            <span className="hero-title-bottom">SISTERHOOD GROUP</span>
          </h1>

          <p className="hero-subtitle">MARITIME CARGO MONITORING SYSTEM</p>
          <p className="hero-desc">
            Shipping &amp; Maritime Excellence since 2022
          </p>

          <Link href="/tracking" className="track-btn">
            <span className="track-icon">⌕</span>
            TRACK SHIPMENT
          </Link>
        </div>
      </section>
    </main>
  );
}