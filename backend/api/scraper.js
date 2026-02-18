const router = require('express').Router();

// Placeholder endpoint (safe stub)
// Real store scraping must follow each site's ToS + robots rules
router.get('/deals', async (req, res) => {
  res.json({
    ok: true,
    results: [
      { store: "Walmart", item: "Sample Deal", price: 9.99, url: "https://example.com" }
    ]
  });
});

module.exports = router;
