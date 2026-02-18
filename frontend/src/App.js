import React, { useCallback, useMemo, useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  // ✅ Build API base safely from env var (CRA exposes REACT_APP_*)
  const API_BASE = useMemo(() => {
    const raw = process.env.REACT_APP_API_BASE_URL || "";
    const cleaned = raw.trim().replace(/\/+$/, ""); // remove trailing slashes
    return cleaned || "http://localhost:10000"; // local fallback
  }, []);

  // ✅ Single axios client
  const api = useMemo(() => {
    return axios.create({
      baseURL: API_BASE,
      timeout: 45000, // Render cold start can be slow
      headers: { "Content-Type": "application/json" },
    });
  }, [API_BASE]);

  const [status, setStatus] = useState("Checking backend...");
  const [data, setData] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  const [checking, setChecking] = useState(false);

  const buildErr = (err) => ({
    baseURL: API_BASE,
    message: err?.message,
    code: err?.code,
    httpStatus: err?.response?.status,
    response: err?.response?.data,
    hint:
      API_BASE.includes("onrender.com")
        ? "Render free tier may be sleeping. First request can take 20–60 seconds."
        : "If local: make sure backend is running and CORS allows your frontend origin.",
  });

  // ✅ Health check with fallback route
  const checkBackend = useCallback(async () => {
    setChecking(true);
    setErrorDetails(null);
    setStatus("Checking backend (Render may take a moment to wake up)...");

    try {
      // Try root first
      await api.get("/");
      setStatus("✅ Backend connected");
      setChecking(false);
      return;
    } catch (errRoot) {
      // If root fails, try /status (common pattern)
      try {
        await api.get("/status");
        setStatus("✅ Backend connected");
        setChecking(false);
        return;
      } catch (errStatus) {
        setStatus("❌ Cannot connect to backend");
        setErrorDetails(buildErr(errStatus));
        setChecking(false);
      }
    }
  }, [api, API_BASE]);

  useEffect(() => {
    checkBackend();
  }, [checkBackend]);

  const testCredit = useCallback(async () => {
    setData(null);
    setErrorDetails(null);

    try {
      const res = await api.post("/api/credit/analyze", {
        creditEntry: "Test item: collection account - verify dispute pipeline",
      });
      setData(res.data);
    } catch (err) {
      setErrorDetails(buildErr(err));
    }
  }, [api, API_BASE]);

  return (
    <div style={{ fontFamily: "Arial", padding: 24, maxWidth: 980 }}>
      <h1 style={{ marginBottom: 6 }}>Omega Dashboard</h1>

      <div style={{ marginBottom: 14 }}>
        <div>
          <b>API Base:</b>{" "}
          <code style={{ background: "#f3f3f3", padding: "2px 6px" }}>{API_BASE}</code>
        </div>
        <div style={{ marginTop: 6 }}>
          <b>Status:</b> {status}{" "}
          {checking && <span style={{ marginLeft: 8 }}>(working…)</span>}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={checkBackend}
          style={{ padding: "10px 14px", cursor: "pointer" }}
        >
          Retry Connection
        </button>

        <button
          onClick={testCredit}
          style={{ padding: "10px 14px", cursor: "pointer" }}
        >
          Test Credit Endpoint
        </button>

        <a
          href={API_BASE}
          target="_blank"
          rel="noreferrer"
          style={{
            padding: "10px 14px",
            display: "inline-block",
            textDecoration: "none",
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        >
          Open Backend
        </a>
      </div>

      {data && (
        <pre style={{ marginTop: 16, background: "#f3f3f3", padding: 16, overflow: "auto" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}

      {errorDetails && (
        <pre style={{ marginTop: 16, background: "#fff0f0", padding: 16, overflow: "auto" }}>
          {JSON.stringify(errorDetails, null, 2)}
        </pre>
      )}

      <div style={{ marginTop: 18, fontSize: 13, color: "#555" }}>
        <div><b>Important:</b> In React, env vars must be used as code:</div>
        <div>
          ✅ <code>process.env.REACT_APP_API_BASE_URL</code> (no quotes)
        </div>
        <div>
          ❌ <code>"process.env.REACT_APP_API_BASE_URL"</code> (this becomes a literal string)
        </div>
      </div>
    </div>
  );
}
