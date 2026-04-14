"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password});
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap');

        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Roboto Mono', monospace;
          background: #0a0a0f;
          color: #ffffff;
          min-height: 100vh;
          overflow: hidden;
        }

        .page-wrapper {
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Background */
        .bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 0;
        }

        .bg-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: rgba(8, 6, 18, 0.72);
        }

        /* LOGIN CARD */
        .login-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 360px;
          background: rgba(18, 14, 35, 0.82);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 36px 32px 28px;
          backdrop-filter: blur(20px);
          box-shadow:
            0 8px 60px rgba(0,0,0,0.6),
            0 0 0 1px rgba(255,255,255,0.04) inset;
          animation: cardIn 0.5s ease forwards;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* LOGO */
        .logo-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
        }

        .logo-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.18);
          overflow: hidden;
          background: rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .logo-title {
          font-family: 'Roboto Mono', monospace;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.18em;
          color: #ffffff;
          text-transform: uppercase;
          text-align: center;
        }

        .logo-sub {
          font-family: 'Roboto Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          text-align: center;
          margin-top: 2px;
        }

        /* FORM */
        .form-group {
          margin-bottom: 14px;
        }

        .form-label {
          display: block;
          font-family: 'Roboto Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.55);
          margin-bottom: 6px;
          letter-spacing: 0.04em;
        }

        .form-input {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 11px 14px;
          font-family: 'Roboto Mono', monospace;
          font-size: 13px;
          color: #ffffff;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .form-input::placeholder {
          color: transparent;
        }

        .form-input:focus {
          border-color: rgba(139,92,246,0.6);
          background: rgba(139,92,246,0.08);
        }

        /* SUBMIT BUTTON */
        .btn-submit {
          width: 100%;
          background: #8B5CF6;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          padding: 14px;
          font-family: 'Roboto Mono', monospace;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 0 24px rgba(139,92,246,0.4);
          margin-bottom: 18px;
        }

        .btn-submit:hover {
          background: #7C3AED;
          transform: translateY(-1px);
          box-shadow: 0 0 36px rgba(139,92,246,0.55);
        }

        .btn-submit:active {
          transform: translateY(0);
        }

        /* BACK TO HOME */
        .back-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-family: 'Roboto Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          cursor: pointer;
          background: none;
          border: none;
          letter-spacing: 0.04em;
          transition: color 0.2s;
          padding: 4px;
          width: 100%;
        }

        .back-link:hover {
          color: rgba(255,255,255,0.65);
        }
      `}</style>

      <div className="page-wrapper">
        {/* Background */}
        <img src="/background_cp.jpg" alt="Background" className="bg-img" />
        <div className="bg-overlay" />

        {/* Login Card */}
        <div className="login-card">
          {/* Logo */}
          <div className="logo-wrap">
            <div className="logo-circle">
              <img src="/logo-thalassa.png" alt="Thalassa Logo" />
            </div>
            <div>
              <div className="logo-title">Thalassa Sisterhood Group</div>
              <div className="logo-sub">Fleet Control System</div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email / Username</label>
              <input
                type="text"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" className="btn-submit">
              Access System
            </button>
          </form>

          {/* Back to Home */}
          <button
            type="button"
            className="back-link"
            onClick={() => router.push("/")}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </>
  );
}