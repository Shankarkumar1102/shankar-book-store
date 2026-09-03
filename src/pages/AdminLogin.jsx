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

    // Empty field validation
    if (!username.trim() || !password.trim()) {
      setError(
        "Please enter your username and password."
      );
      return;
    }

    // Admin credentials
    if (
      username.trim() === "admin" &&
      password === "shankar123"
    ) {
      // App.jsx handles the login state
      if (onLogin) {
        onLogin();
      }

      return;
    }

    // Wrong credentials
    setError("Invalid username or password.");
  };

  return (
    <main className="admin-login">

      {/* ================= LEFT SIDE ================= */}

      <section className="admin-login__brand">
        <div className="admin-login__brand-inner">

          <div className="admin-login__logo">
            S
          </div>

          <span className="admin-login__eyebrow">
            SHANKAR BOOK STORE
          </span>

          <h1>
            Manage your store.
          </h1>

          <p>
            Products, orders and everything
            your store needs — all in one place.
          </p>

          <div className="admin-login__features">

            <div>
              <span>✓</span>
              <p>
                Manage products
              </p>
            </div>

            <div>
              <span>✓</span>
              <p>
                Track customer orders
              </p>
            </div>

            <div>
              <span>✓</span>
              <p>
                Grow your store
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= LOGIN SIDE ================= */}

      <section className="admin-login__form-section">

        <div className="admin-login__form-container">

          <div className="admin-login__heading">

            <span>
              ADMIN ACCESS
            </span>

            <h2>
              Welcome back
            </h2>

            <p>
              Sign in to access your store
              dashboard.
            </p>

          </div>

          {/* ================= FORM ================= */}

          <form
            className="admin-login__form"
            onSubmit={handleSubmit}
          >

            {/* ================= USERNAME ================= */}

            <label>

              <span>
                Username
              </span>

              <div className="admin-login__input">

                <span>
                  ◉
                </span>

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

            {/* ================= PASSWORD ================= */}

            <label>

              <span>
                Password
              </span>

              <div className="admin-login__input">

                <span>
                  ●
                </span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
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
                  onClick={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </label>

            {/* ================= ERROR ================= */}

            {error && (
              <div className="admin-login__error">

                <span>
                  !
                </span>

                {error}

              </div>
            )}

            {/* ================= LOGIN BUTTON ================= */}

            <button
              type="submit"
              className="admin-login__submit"
            >
              Sign In
              <span>→</span>
            </button>

          </form>

          {/* ================= BACK TO STORE ================= */}

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
