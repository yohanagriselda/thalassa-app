"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ContactPage() {
    const pathname = usePathname();

    return (
        <main className="fleet-page page-wrapper grid-overlay">
            <nav className="navbar">
                <div className="navbar-brand">
                    <img src="/logo-thalassa.png" alt="Logo" className="brand-logo-img" />
                    <div className="brand-text">
                        <span className="brand-name">THALASSA SISTERHOOD GROUP</span>
                        <span className="brand-sub">MARITIME CARGO SYSTEM</span>
                    </div>
                </div>

                <div className="navbar-menu">
                    <Link href="/" className={pathname === "/" ? "active-link" : ""}>HOME</Link>
                    <Link href="/services" className={pathname === "/services" ? "active-link" : ""}>SERVICES</Link>
                    <Link href="/fleet" className={pathname === "/fleet" ? "active-link" : ""}>FLEET</Link>
                    <Link href="/contact" className={pathname === "/contact" ? "active-link" : ""}>CONTACT</Link>
                </div>

                <Link href="/login" className="login-btn">LOG IN</Link>
            </nav>

            <section className="contact-section">
                <div className="main-container contact-wrapper">
                    {/* LEFT PANEL: INFO */}
                    <div className="contact-left">
                        <div className="section-heading">
                            <div className="heading-accent" />
                            <div className="heading-text">
                                <h1>CONTACT US</h1>
                                <p>GET IN TOUCH</p>
                            </div>
                            <div className="heading-line" />
                        </div>

                        <div className="contact-items">
                            {/* Email */}
                            <div className="contact-item">
                                <div className="contact-icon">✉️</div>
                                <div className="contact-info">
                                    <span className="contact-label">EMAIL</span>
                                    <p className="contact-value">support@thalassa.com</p>
                                </div>
                            </div>

                            {/* WhatsApp */}
                            <div className="contact-item">
                                <div className="contact-icon">📱</div>
                                <div className="contact-info">
                                    <span className="contact-label">WHATSAPP (OFFICIAL)</span>
                                    <p className="contact-value">+62 812-3456-789</p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="contact-item">
                                <div className="contact-icon">📍</div>
                                <div className="contact-info">
                                    <span className="contact-label">HEADQUARTERS ADDRESS</span>
                                    <p className="contact-value">
                                        Jl. Maritim No. 88, Pelabuhan Tanjung Priok<br />
                                        Jakarta Utara, 14310 — Indonesia
                                    </p>
                                </div>
                            </div>

                            {/* Operation Hours */}
                            <div className="contact-item">
                                <div className="contact-icon">🕒</div>
                                <div className="contact-info">
                                    <span className="contact-label">OPERATION HOURS</span>
                                    <p className="contact-value">
                                        24/7 Maritime Support
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: IMAGE */}
                    <div className="contact-right">
                        <div className="contact-image-wrapper">
                            <Image
                                src="/gambar-cp-3.png"
                                alt="Gambar tim"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="contact-image"
                                priority
                            />
                        </div>
                    </div>
                </div> 
            </section>
        </main>
    );
}