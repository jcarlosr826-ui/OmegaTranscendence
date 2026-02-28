const router = require("express").Router();

/**
 * SCRAPER API (safe starter)
 * These endpoints prove routing + payload handling.
 * Replace the stubbed data with ToS-compliant sources later.
 */

// 1) Quick ping
router.get("/ping", (req, res) => {
  res.json({ ok: true, service: "scraper", ts: new Date().toISOString() });
});

// 2) Deals stub (your original idea)
router.get("/deals", async (req, res) => {
  res.json({
    ok: true,
    results: [
      { store: "Walmart", item: "Sample Deal", price: 9.99, url: "https://example.com" },
      { store: "Home Depot", item: "Sample Clearance", price: 3.06, url: "https://example.com" },
    ],
  });
});

// 3) Generic run endpoint (accepts search params)
router.post("/run", async (req, res) => {
  const { store = "walmart", query = "", zip = "", radiusMiles = 25, maxResults = 25 } = req.body || {};

  // Stub response (replace later with real ToS-compliant logic)
  return res.json({
    ok: true,
    mode: "stub",
    input: { store, query, zip, radiusMiles, maxResults },
    results: [
      { store, title: `Stub result for "${query}"`, price: 12.06, ending: ".06", confidence: 0.42 },
    ],
  });
});

// 4) Clearance scan stub
router.post("/clearance", async (req, res) => {
  const { store = "homedepot", zip = "", department = "household", minDiscount = 30, maxResults = 25 } = req.body || {};

  return res.json({
    ok: true,
    mode: "stub",
    input: { store, zip, department, minDiscount, maxResults },
    results: [
      { store, sku: "000-000", title: "Stub clearance item", price: 6.03, ending: ".03", discountPct: 75, signals: ["late-stage"] },
    ],
  });
});

/**
 * 5) Penny/Clearance prediction (rule-based)
 * Inputs are “signals” you already described (price ending, tag date age, noHome, low stock, etc.)
 */
router.post("/predict", async (req, res) => {
  const {
    store = "homedepot",
    price = null,
    ending = null,          // ".00" ".06" ".04" ".03" ".02" ".01"
    tagDate = null,         // "YYYY-MM-DD" or "MM/DD" (best: YYYY-MM-DD)
    noHome = false,
    lowStock = false,
    recentCommunityReport = false,
  } = req.body || {};

  // Score signals (simple + transparent)
  let score = 0;

  const end = String(ending || "").trim();
  if (end === ".01") score += 60;
  else if (end === ".02" || end === ".03") score += 35;
  else if (end === ".04" || end === ".06") score += 18;
  else if (end === ".00") score += 10;

  if (noHome) score += 20;
  if (lowStock) score += 10;
  if (recentCommunityReport) score += 15;

  // Tag age (older tag = stronger)
  let tagAgeDays = null;
  try {
    if (tagDate) {
      const d = new Date(tagDate);
      if (!isNaN(d.getTime())) {
        tagAgeDays = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
        if (tagAgeDays >= 28) score += 15;
        else if (tagAgeDays >= 14) score += 10;
        else if (tagAgeDays >= 7) score += 6;
      }
    }
  } catch {}

  if (score > 100) score = 100;

  // Friendly label
  let label = "Low";
  if (score >= 75) label = "Very High";
  else if (score >= 55) label = "High";
  else if (score >= 35) label = "Medium";

  return res.json({
    ok: true,
    store,
    input: { price, ending: end, tagDate, tagAgeDays, noHome, lowStock, recentCommunityReport },
    prediction: { score, label },
    note: "This is a rule-based predictor. Replace/extend with real data sources later.",
  });
});

module.exports = router;
