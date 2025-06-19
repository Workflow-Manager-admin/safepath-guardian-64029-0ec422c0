import React, { useState, useEffect } from "react";
import "./App.css";

/**
 * MAIN CONTAINER FOR SAFEPATH GUARDIAN
 * Provides navigation, layout, and integrates feature stubs:
 * - Real-time Route Guidance (with data visualization)
 * - SOS Alerts
 * - User Feedback
 * - User Authentication
 * - Route Calculation API
 * - Crime Data Integration
 * - Weather Data Integration
 * - User Management API
 * - SOS Alert API
 */

// THEME COLORS
const PRIMARY = "#4CAF50";
const SECONDARY = "#FFC107";
const ACCENT = "#F44336";
const BG_LIGHT = "#FFF";
const BG_GREY = "#FAFAFA";

// Helper: Minimal Navbar
function Navbar({ onNav, isLoggedIn, onLogout, active }) {
  return (
    <nav
      className="navbar"
      style={{
        background: BG_LIGHT,
        color: PRIMARY,
        borderBottom: `2px solid ${PRIMARY}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="logo" style={{ color: PRIMARY }}>
          <span style={{ color: ACCENT, fontWeight: 800 }}>🛡</span> SafePath Guardian
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <NavButton label="Route" active={active === 0} onClick={() => onNav(0)} />
          <NavButton label="SOS Alert" active={active === 1} onClick={() => onNav(1)} accent />
          <NavButton label="Feedback" active={active === 2} onClick={() => onNav(2)} />
          {isLoggedIn ? (
            <>
              <NavButton label="Profile" active={active === 3} onClick={() => onNav(3)} />
              <button
                style={{
                  marginLeft: 4,
                  background: "none",
                  border: "none",
                  color: ACCENT,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
                onClick={onLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <NavButton label="Login" active={active === 4} onClick={() => onNav(4)} />
          )}
        </div>
      </div>
    </nav>
  );
}
function NavButton({ label, active, accent, onClick }) {
  return (
    <button
      className="btn"
      style={{
        color: accent ? "#fff" : PRIMARY,
        background: active ? (accent ? ACCENT : PRIMARY) : BG_LIGHT,
        border: `1.5px solid ${accent ? ACCENT : PRIMARY}`,
        marginRight: 0,
        marginLeft: 0,
        marginBottom: 0,
        marginTop: 0,
        fontWeight: active ? 700 : 400,
        boxShadow: active ? "0 1px 6px rgba(50,80,100,.09)" : "none",
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// Placeholder API/data hooks [stub implementations for demonstration purposes]
// In real application, these would use fetch/axios to actual endpoints.
function useCrimeData() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setData([
        { id: 1, type: "Robbery", risk: "High", location: "5th Ave", time: "21:30" },
        { id: 2, type: "Assault", risk: "Medium", location: "Main St", time: "20:10" },
      ]);
    }, 400);
  }, []);
  return data;
}
function useWeatherData() {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setWeather({
        icon: "☁️",
        desc: "Cloudy, 71°F",
        alerts: [],
      });
    }, 200);
  }, []);
  return weather;
}

// --- Main Layout Container ---
function App() {
  // Page Nav: 0-Route, 1-SOS, 2-Feedback, 3-Profile, 4-Login/Register
  const [page, setPage] = useState(0);
  // Auth State
  const [user, setUser] = useState(null);

  // ----- Authentication & User Management [stub]
  // Simple demo in-memory; replace with calls to User Management API.
  function handleLogin({ username, password }) {
    // Here you'd check credentials with API.
    if (username && password) setUser({ username });
  }
  function handleLogout() {
    setUser(null);
    setPage(0);
  }
  function handleRegister({ username, password }) {
    // Actual app would call API here
    if (username && password) setUser({ username });
  }

  // ----- Render -----
  return (
    <div className="app" style={{ background: BG_GREY, minHeight: "100vh" }}>
      <Navbar onNav={setPage} isLoggedIn={!!user} onLogout={handleLogout} active={page} />
      <main style={{ paddingTop: 88, minHeight: "78vh" }}>
        <div className="container" style={{ maxWidth: 960, background: "#fff", borderRadius: 16, marginTop: 24, boxShadow: "0 4px 18px rgba(80,140,120,0.07)", padding: "32px 0" }}>
          {page === 0 && <RouteGuidance crimeDataHook={useCrimeData} weatherHook={useWeatherData} />}
          {page === 1 && <SOSAlert user={user} />}
          {page === 2 && <UserFeedback />}
          {page === 3 && user && <UserProfile user={user} />}
          {page === 4 && <Auth onLogin={handleLogin} onRegister={handleRegister} />}
        </div>
      </main>
      <footer style={{ backgroundColor: "#fff", color: "#666", textAlign: "center", padding: 18, borderTop: `1.5px solid ${PRIMARY}` }}>
        SafePath Guardian &copy; {new Date().getFullYear()} - Stay safe out there!
      </footer>
    </div>
  );
}

// ----- FEATURE PAGES ----- //

// Real-time Route Guidance Component (with data visualization stub)
// Integrates: Route Calculation API, Crime Data, Weather Data
function RouteGuidance({ crimeDataHook, weatherHook }) {
  const crimeData = crimeDataHook();
  const weather = weatherHook();
  const [route, setRoute] = useState(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [calcState, setCalcState] = useState({ loading: false, error: null });

  // PUBLIC_INTERFACE
  // Stub: Call to backend API for best/safest route based on start/end (normally async to Route Calculation API)
  function calculateRoute(e) {
    e && e.preventDefault();
    setCalcState({ loading: true, error: null });
    setTimeout(() => {
      if (start && end) {
        setRoute({
          path: [start, "Main St", "5th Ave", end],
          advisories: ["Avoid 5th Ave after 9pm due to recent incident"],
        });
        setCalcState({ loading: false, error: null });
      } else {
        setCalcState({ loading: false, error: "Please enter start and end." });
      }
    }, 600);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 16, flexWrap: "wrap" }}>
        {/* Weather Widget */}
        <WeatherWidget weather={weather} />
        {/* Crime Widget */}
        <CrimeWidget data={crimeData} />
      </div>
      <h2 style={{ color: PRIMARY, marginBottom: 16 }}>Find Your Safest Route</h2>
      <form onSubmit={calculateRoute} style={{ display: "flex", gap: 12, alignItems: "flex-end", marginBottom: 18, flexWrap: "wrap" }}>
        <div>
          <label style={{ fontWeight: 500, color: "#222" }}>Start:</label>
          <br />
          <input
            type="text"
            value={start}
            placeholder="Enter start"
            onChange={(e) => setStart(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ fontWeight: 500, color: "#222" }}>Destination:</label>
          <br />
          <input
            type="text"
            value={end}
            placeholder="Enter destination"
            onChange={(e) => setEnd(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button type="submit" className="btn btn-large" style={{ background: PRIMARY, color: "#fff", minWidth: 125 }}>
          {calcState.loading ? "Calculating..." : "Calculate"}
        </button>
      </form>
      {calcState.error && <div style={{ color: ACCENT, marginBottom: 6 }}>{calcState.error}</div>}
      {route && (
        <div style={{ border: `1.5px solid ${SECONDARY}`, borderRadius: 10, padding: 18, background: "#FFFEE8" }}>
          <h4 style={{ margin: 0, color: ACCENT }}>Recommended Route:</h4>
          <ol>
            {route.path.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
          {route.advisories && route.advisories.map((a, idx) => (
            <div style={{ color: ACCENT, fontWeight: 500, marginTop: 6 }} key={idx}>⚠️ {a}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Weather Widget ---
function WeatherWidget({ weather }) {
  return (
    <div style={{ padding: 10, minWidth: 120, borderRadius: 10, background: "#F9FFF1", border: `1.5px solid ${PRIMARY}` }}>
      <div style={{ fontSize: 24 }}>{weather ? weather.icon : "⏳"}</div>
      <div style={{ color: "#444", marginTop: 2 }}>{weather ? weather.desc : "Loading weather..."}</div>
    </div>
  );
}

// --- Crime Widget ---
function CrimeWidget({ data }) {
  return (
    <div style={{ padding: 10, minWidth: 240, borderRadius: 10, background: "#FFF6F6", border: `1.5px solid ${ACCENT}` }}>
      <div style={{ fontWeight: 600, color: ACCENT, marginBottom: 4 }}>Local Crime Alerts</div>
      {Array.isArray(data) && data.length > 0 ? (
        <ul style={{ padding: 0, margin: 0, listStyleType: "none" }}>
          {data.map((c) => (
            <li
              key={c.id}
              style={{
                fontSize: 15,
                color: "#390",
                borderBottom: "1px solid #F9ECEB",
                marginBottom: 2,
                fontWeight: c.risk === "High" ? 700 : 400,
                color: c.risk === "High" ? ACCENT : "#777",
              }}
            >
              {c.type} @ {c.location} <span style={{ fontWeight: 400, color: "#888" }}>{c.time}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ color: "#888" }}>No alerts</div>
      )}
    </div>
  );
}

// ----- SOS ALERT (integration with SOS Alert API; stub implemented) -----
function SOSAlert({ user }) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  // PUBLIC_INTERFACE
  function sendSOS() {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 800);
  }
  return (
    <div>
      <h2 style={{ color: ACCENT }}>Send SOS Alert</h2>
      <p>
        In case of emergency, press SOS to instantly alert authorities or your emergency contact.
      </p>
      {sent ? (
        <div style={{ color: PRIMARY, border: `1.5px solid ${PRIMARY}`, borderRadius: 8, padding: 12 }}>
          ✅ SOS sent successfully — Help is on the way.
        </div>
      ) : (
        <button
          className="btn btn-large"
          disabled={sending}
          style={{
            background: ACCENT,
            color: "#fff",
            fontSize: "1.2rem",
            minWidth: 160,
            minHeight: 54,
            marginTop: 12,
            boxShadow: "0 1px 7px rgba(240,50,50,0.08)",
            letterSpacing: "2px",
          }}
          onClick={sendSOS}
        >
          {sending ? "Sending..." : "🚨 SOS"}
        </button>
      )}
    </div>
  );
}

// ----- USER FEEDBACK -----
function UserFeedback() {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    if (!value) return;
    // Stub: send feedback to backend
    setTimeout(() => setSubmitted(true), 350);
  }

  return (
    <div>
      <h2 style={{ color: SECONDARY }}>User Feedback</h2>
      <p>How can we improve SafePath Guardian? Please share any feedback about route safety, app usability or suggestions.</p>
      {submitted ? (
        <div style={{ color: PRIMARY }}>Thank you for your feedback! ❤️</div>
      ) : (
        <form style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 520 }} onSubmit={handleSubmit}>
          <textarea
            style={{
              minHeight: 70,
              border: `1.5px solid ${PRIMARY}`,
              borderRadius: 6,
              fontSize: 15,
              padding: 8,
              resize: "vertical",
              background: "#FAFAFF",
            }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={300}
            placeholder="Your feedback (max 300 chars)"
          />
          <button className="btn btn-large" style={{ background: SECONDARY, color: "#fff" }} type="submit">
            Send Feedback
          </button>
        </form>
      )}
    </div>
  );
}

// ----- USER PROFILE (integration with User Management API; stub implemented) -----
function UserProfile({ user }) {
  // In real app, info would be loaded and updated via API
  return (
    <div>
      <h2 style={{ color: PRIMARY, marginBottom: 12 }}>Profile</h2>
      <div style={{ padding: 24, background: "#F8FFF5", border: `1.5px solid ${PRIMARY}`, borderRadius: 11, maxWidth: 480 }}>
        <div style={{ fontWeight: 600 }}>Username:</div>
        <div style={{ color: "#222" }}>{user.username}</div>
      </div>
    </div>
  );
}

// ----- AUTH COMPONENT (Login/Register) (integrates with User Management API stub) -----
function Auth({ onLogin, onRegister }) {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    error && setError("");
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Please fill all fields");
      return;
    }
    if (mode === "login") {
      onLogin(form);
    } else {
      onRegister(form);
    }
  }
  return (
    <div>
      <h2 style={{ color: PRIMARY }}>
        {mode === "login" ? "Login" : "Register"}
      </h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 360, display: "flex", flexDirection: "column", gap: 14 }}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
        />
        <button className="btn btn-large" style={{ background: PRIMARY, color: "#fff" }} type="submit">
          {mode === "login" ? "Login" : "Register"}
        </button>
        {error && <div style={{ color: ACCENT }}>{error}</div>}
      </form>
      <div style={{ marginTop: 14, fontSize: 14 }}>
        {mode === "login" ? (
          <>
            Don't have an account?{" "}
            <button
              style={{ color: SECONDARY, border: "none", background: "none", cursor: "pointer" }}
              onClick={() => setMode("register")}
            >Register</button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              style={{ color: PRIMARY, border: "none", background: "none", cursor: "pointer" }}
              onClick={() => setMode("login")}
            >Login</button>
          </>
        )}
      </div>
    </div>
  );
}

// ----- Input style helper -----
const inputStyle = {
  border: `1.5px solid #BBB`,
  padding: "8px 10px",
  borderRadius: 7,
  fontSize: 16,
  minWidth: 180,
  maxWidth: 250,
  marginTop: 2,
  background: "#FAFAFF"
};

export default App;
