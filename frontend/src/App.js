import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function App() {
  const API_BASE = useMemo(() => {
    const raw = process.env.REACT_APP_API_BASE_URL || "";
    return raw.trim().replace(/\/+$/, "") || "http://localhost:10000";
  }, []);

  const [token, setToken] = useState(() => localStorage.getItem("omega_token") || "");
  const [authStatus, setAuthStatus] = useState("checking"); // checking | authed | loggedOut
  const [status, setStatus] = useState("Checking backend...");
  const [data, setData] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);

  const [email, setEmail] = useState("jcarlosr826@gmail.com");
  const [password, setPassword] = useState("");

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: API_BASE,
      timeout: 30000,
      headers: { "Content-Type": "application/json" },
    });

    instance.interceptors.request.use((config) => {
      const t = localStorage.getItem("omega_token");
      if (t) config.headers.Authorization = `Bearer ${t}`;
      return config;
    });

    return instance;
  }, [API_BASE]);

  // Public backend check
  useEffect(() => {
    (async () => {
      try {
        await api.get("/");
        setStatus("✅ Backend connected");
      } catch (err) {
        setStatus("❌ Cannot connect to backend");
        setErrorDetails({
          baseURL: API_BASE,
          message: err?.message,
          code: err?.code,
          httpStatus: err?.response?.status,
          response: err?.response?.data,
        });
      }
    })();
  }, [api, API_BASE]);

  // Verify token (if present)
  useEffect(() => {
    (async () => {
      const t = localStorage.getItem("omega_token");
      if (!t) {
        setAuthStatus("loggedOut");
        return;
      }
      try {
        await api.get("/api/auth/me");
        setAuthStatus("authed");
      } catch {
        localStorage.removeItem("omega_token");
        setToken("");
        setAuthStatus("loggedOut");
      }
    })();
  }, [api]);

  const doLogin = async () => {
    setErrorDetails(null);
    setData(null);

    try {
      const res = await api.post("/api/auth/login", { email, password });
      const t = res?.data?.token;
      if (!t) throw new Error("No token returned from backend.");

      localStorage.setItem("omega_token", t);
      setToken(t);

      await api.get("/api/auth/me");
      setAuthStatus("authed");
    } catch (err) {
      setAuthStatus("loggedOut");
      setErrorDetails({
        baseURL: API_BASE,
        message: err?.message,
        code: err?.code,
        httpStatus: err?.response?.status,
        response: err?.response?.data,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("omega_token");
    setToken("");
    setAuthStatus("loggedOut");
    setData(null);
    setErrorDetails(null);
  };

  const testCredit = async () => {
    setData(null);
    setErrorDetails(null);

    try {
      const res = await api.post("/api/credit/analyze", {
        creditEntry: "Test item: collection account - verify dispute pipeline",
      });
      setData(res.data);
    } catch (err) {
      setErrorDetails({
        baseURL: API_BASE,
        message: err?.message,
        code: err?.code,
        httpStatus: err?.response?.status,
        response: err?.response?.data,
      });
    }
  };

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: 12,
    padding: 16,
    marginTop: 14,
    background: "#fff",
  };

  return (
    <div style={{ fontFamily: "Arial", padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>Omega Dashboard</h1>

      <div style={cardStyle}>
        <p><b>API Base:</b> {API_BASE}</p>
        <p><b>Backend Status:</b> {status}</p>
        <p>
          <b>Auth Status:</b>{" "}
          {authStatus === "authed" ? "✅ Logged In" : authStatus === "checking" ? "⏳ Checking" : "🔒 Logged Out"}
        </p>
      </div>

      {authStatus !== "authed" ? (
        <div style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>Admin Login</h2>

          <div style={{ display: "grid", gap: 10, maxWidth: 420 }}>
            <label>
              Email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: 10, marginTop: 6 }}
                placeholder="you@email.com"
              />
            </label>

            <label>
              Password
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: 10, marginTop: 6 }}
                placeholder="Your password"
                type="password"
              />
            </label>

            <button onClick={doLogin} style={{ padding: "10px 14px", cursor: "pointer" }}>
              Login
            </button>

            <div style={{ fontSize: 12, opacity: 0.7 }}>
              Token stored locally as <code>omega_token</code>.
            </div>
          </div>
        </div>
      ) : (
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <h2 style={{ margin: 0 }}>Controls</h2>
            <button onClick={logout} style={{ padding: "8px 12px", cursor: "pointer" }}>
              Logout
            </button>
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={testCredit} style={{ padding: "10px 14px", cursor: "pointer" }}>
              Test Credit Endpoint
            </button>

            <a
              href={`${API_BASE}/`}
              target="_blank"
              rel="noreferrer"
              style={{ padding: "10px 14px", border: "1px solid #ddd", borderRadius: 8, textDecoration: "none" }}
            >
              Open Backend
            </a>
          </div>

          {data && (
            <pre style={{ marginTop: 16, background: "#f3f3f3", padding: 16, overflow: "auto" }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      )}

      {errorDetails && (
        <pre style={{ marginTop: 16, background: "#fff0f0", padding: 16, overflow: "auto", borderRadius: 12 }}>
          {JSON.stringify(errorDetails, null, 2)}
        </pre>
      )}

      <div style={{ marginTop: 16, fontSize: 12, opacity: 0.75 }}>
        Env vars must be used as code: <code>process.env.REACT_APP_API_BASE_URL</code>
      </div>
    </div>
  );
}
