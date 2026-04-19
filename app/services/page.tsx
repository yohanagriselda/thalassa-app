import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="services-page">
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
          <Link href="/services">
            SERVICES
          </Link>
          <a href="#">FLEET</a>
          <a href="#">CONTACT</a>
        </div>

        <Link href="/login" className="login-btn">
          LOG IN
        </Link>
      </nav>

      <section className="services-section">
        <div className="services-container">
          <div className="services-heading">
            <div className="services-heading-accent" />
            <div className="services-heading-text">
              <h1>SERVICES</h1>
              <p>SERVICES OVERVIEW</p>
            </div>
            <div className="services-heading-line" />
          </div>

          <div className="services-grid">
            <article className="service-card">
              <div className="service-icon">⛴</div>
              <h2>CONTAINER SHIPPING</h2>
              <p>
                Inter-island and international container shipping with modern
                high-capacity fleets.
              </p>
            </article>

            <article className="service-card">
              <div className="service-icon">⚓</div>
              <h2>TANKER OPERATIONS</h2>
              <p>
                Transportation of fuel and liquid cargo with international
                safety standards.
              </p>
            </article>

            <article className="service-card">
              <div className="service-icon">◫</div>
              <h2>BULK CARGO</h2>
              <p>
                Handling of bulk cargo such as coal, grains, and minerals with
                optimal efficiency.
              </p>
            </article>

            <article className="service-card">
              <div className="service-icon">∿</div>
              <h2>LIVE FLEET MONITORING</h2>
              <p>
                24/7 real-time fleet monitoring system based on AIS and
                satellite technology.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}