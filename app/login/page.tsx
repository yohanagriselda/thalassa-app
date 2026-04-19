"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "TSG-ADMIN-2026") {
      console.log("Logged in as Admin");
      router.push("/dashboard");
    } else if (password === "TSG-OPR-2026") {
      console.log("Logged in as Operator");
      router.push("/dashboard");
    } else {
      alert("Incorrect access code. Please check Demo Credentials.")
    }
  };

  return (
    <div className="login-body"> 
      <div className="page-wrapper">
        <img src="/background_cp.jpg" alt="Background" className="bg-img" />
        <div className="bg-overlay" />

        <div className="login-card">
          <div className="logo-wrap">
            <div className="logo-circle">
              <img src="/logo-thalassa.png" alt="Thalassa Logo" />
            </div>
            <div>
              <div className="logo-title">Thalassa Sisterhood Group</div>
              <div className="logo-sub">Fleet Monitoring System</div>
            </div>
          </div>

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

          <div className="demo-box">
            <div className="demo-title">Demo Credentials</div>

            <div className="demo-item">
              <span className="demo-label">Admin</span>
              <span className="demo-code">TSG-ADMIN-2026</span>
            </div>
            <div className="demo-item">
              <span className="demo-label">Operator</span>
              <span className="demo-code">TSG-OPR-2026</span>
            </div>
          </div>

          <button
            type="button"
            className="back-link"
            onClick={() => router.push("/")}
            style={{ marginTop: '20px' }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}