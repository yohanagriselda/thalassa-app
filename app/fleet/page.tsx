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
                    {/* --- JUDUL --- */}
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
                </div>
            </section>
        </main>
    )
}