import Link from "next/link";

export default function FleetPage() {
    return (
        <main className="fleet-page">
            <nav className="navbar">
                <div className="navbar-brand">
                    <img src="/logo-thalassa.png" alt="Logo" className="brand-logo-img" />
                    <div className="brand-text">
                        <span className="brand-name">THALASSA SISTERHOOD GROUP</span>
                        <span className="brand-sub">MARITIME CARGO SYSTEM</span>
                    </div>
                </div>

                <div className="navbar-menu">
                    <Link href="/">HOME</Link>
                    <Link href="/services">SERVICES</Link>
                    <Link href="/fleet">FLEET</Link>
                    <a href="#">CONTACT</a>
                </div>

                <Link href="/login" className="login-btn">LOG IN</Link>
            </nav>

            <section className="fleet-section">
                <div className="main-container">
                    <div className="section-heading">
                        <div className="heading-accent" />
                        <div className="heading-text">
                            <h1>OUR FLEET</h1>
                            <p>VESSEL OVERVIEW</p>
                        </div>
                        <div className="heading-line" />
                    </div>

                    <div className="stats-container">
                        <div className="stat-item">
                            <h2 className="stat-number">50+</h2>
                            <p className="stat-label">ACTIVE FLEETS</p>
                        </div>
                        <div className="stat-item">
                            <h2 className="stat-number">200+</h2>
                            <p className="stat-label">COMPLETED VOYAGES</p>
                        </div>
                        <div className="stat-item">
                            <h2 className="stat-number">15</h2>
                            <p className="stat-label">DESTINATION PORTS</p>
                        </div>
                        <div className="stat-item">
                            <h2 className="stat-number">24/7</h2>
                            <p className="stat-label">LIVE MONITORING</p>
                        </div>
                    </div>

                    {/* --- SECTION MISSION --- */}
                    <div className="standards-section">
                        <h2 className="standards-title">
                            CONNECTING THE ARCHIPELAGO WITH <br />
                            <span className="glow-text">GLOBAL MARITIME STANDARDS</span>
                        </h2>
                        <p className="standards-desc">
                            Thalassa Sisterhood Group is committed to being the most trusted and innovative maritime 
                            logistics partner in Southeast Asia, connecting strategic ports with secure, timely, 
                            and transparent shipping services.
                        </p>

                        <div className="standards-grid">
                            <div className="standard-card">
                                <div className="standard-icon">🛡️</div>
                                <h3>SAFETY</h3>
                                <p>IMO & SOLAS Standards</p>
                            </div>
                            <div className="standard-card">
                                <div className="standard-icon">📈</div>
                                <h3>EFFICIENCY</h3>
                                <p>Real-time route optimization</p>
                            </div>
                            <div className="standard-card">
                                <div className="standard-icon">👥</div>
                                <h3>PROFESSIONAL</h3>
                                <p>Internationally certified crew</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}