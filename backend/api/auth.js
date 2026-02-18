const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function signToken(payload) {
  const secret = requireEnv("JWT_SECRET");
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

function authMiddleware(req, res, next) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token) return res.status(401).json({ ok: false, error: "Missing token" });

  try {
    const secret = requireEnv("JWT_SECRET");
    req.user = jwt.verify(token, secret);
    next();
  } catch {
    return res.status(401).json({ ok: false, error: "Invalid token" });
  }
}

/**
 * Personal Admin Login (no DB)
 * Required env vars:
 * - ADMIN_EMAIL
 * - ADMIN_PASSWORD_HASH (bcrypt)
 * - JWT_SECRET
 */

router.post("/register", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ ok: false, error: "email and password required" });

  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD_HASH) {
    return res.status(409).json({ ok: false, error: "Admin already configured. Use /login." });
  }

  const hash = await bcrypt.hash(password, 12);

  return res.json({
    ok: true,
    message: "Admin hash generated. Put these in Render env vars:",
    ADMIN_EMAIL: email,
    ADMIN_PASSWORD_HASH: hash,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ ok: false, error: "email and password required" });

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminHash) {
    return res.status(500).json({
      ok: false,
      error: "Admin not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD_HASH in environment variables.",
    });
  }

  if (String(email).toLowerCase() !== String(adminEmail).toLowerCase()) {
    return res.status(401).json({ ok: false, error: "Invalid credentials" });
  }

  const ok = await bcrypt.compare(password, adminHash);
  if (!ok) return res.status(401).json({ ok: false, error: "Invalid credentials" });

  const token = signToken({ email: adminEmail, role: "admin" });
  return res.json({ ok: true, token, user: { email: adminEmail, role: "admin" } });
});

router.get("/me", authMiddleware, (req, res) => {
  return res.json({ ok: true, user: req.user });
});

module.exports = router;
