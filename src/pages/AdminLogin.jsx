import { useState } from "react";
import "./AdminLogin.css";

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter your username and password.");
      return;
    }

    if (username.trim() === "admin" && password === "shankar123") {
      if (typeof onLogin === "function") {
        onLogin();
      } else {
        setError("Login connection failed. Please check App.jsx.");
      }
      return;
    }

    setError("Invalid username or password.");
  };

  return (
    <main className="admin-login">
      <section className="admin-login__brand">
        <div className="admin-login__brand-inner">
          <div
            className="admin-login__logo"
            style={{
              width: "auto",
              minWidth: 112,
              padding: "0 16px",
              fontSize: 34,
              letterSpacing: "-1.5px",
            }}
            aria-label="GIVU logo"
          >
            GIVU
          </div>

          <span className="admin-login__eyebrow">GIVU</span>

          <h1>
            Manage <span style={{ color: "var(--color-peach, #F9A35B)" }}>your</span> store.
          </h1>

          <p>
            Products, orders and everything your store needs — all in one
            place.
          </p>

          <div className="admin-login__features">
            <div>
              <span>✓</span>
              <p>Manage products</p>
            </div>
            <div>
              <span>✓</span>
              <p>Track customer orders</p>
            </div>
            <div>
              <span>✓</span>
              <p>Grow your store</p>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-login__form-section">
        <div className="admin-login__form-container">
          <div className="admin-login__heading">
            <span>ADMIN ACCESS</span>
            <h2>
              Welcome <span style={{ color: "#F28A19" }}>back</span>
            </h2>
            <p>Sign in to access your store dashboard.</p>
          </div>

          <form className="admin-login__form" onSubmit={handleSubmit}>
            <label>
              <span>Username</span>
              <div className="admin-login__input">
                <span>◉</span>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  autoComplete="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                />
              </div>
            </label>

            <label>
              <span>Password</span>
              <div className="admin-login__input">
                <span>●</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
                <button
                  type="button"
                  className="admin-login__show"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            {error && (
              <div className="admin-login__error" role="alert">
                <span>!</span> {error}
              </div>
            )}

            <button type="submit" className="admin-login__submit">
              Sign In <span>→</span>
            </button>
          </form>

          <button
            type="button"
            className="admin-login__back"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            ← Back to Store
          </button>
        </div>
      </section>
    </main>
  );
}

export default AdminLogin;
