// backend/server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

/* ========= Middleware ========= */
app.use(cors());
app.use(express.json());

/* ========= Routes ========= */
app.use("/api/auth", require("./api/auth")); // ✅ ADD: login/register routes
app.use("/api/credit", require("./api/credit"));
app.use("/api/scraper", require("./api/scraper"));
app.use("/api/marketplace", require("./api/marketplace"));

/* ========= Root ========= */
app.get("/", (req, res) => {
  res.send("Omega Backend Running");
});

/* ========= Health Check ========= */
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "omega-backend",
    port: Number(process.env.PORT || 10000),
    env: process.env.NODE_ENV || "development",
  });
});

/* ========= Start Server (Render uses PORT env var) ========= */
const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
