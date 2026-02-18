const router = require('express').Router();

// Placeholder endpoint (safe stub)
router.post('/analyze', async (req, res) => {
  const { demand = 0, competition = 0 } = req.body || {};
  const score = Number(demand) * (1 - Number(competition));
  res.json({ ok: true, score });
});

module.exports = router;
