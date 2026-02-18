// backend/api/server.js
const express = require('express');
const router = express.Router();

// Test route
router.get('/status', (req, res) => {
  res.json({ status: "Omega Backend Running" });
});

// Example mobile route
router.get('/hello', (req, res) => {
  res.json({ message: "Hello from Omega Backend!" });
});

module.exports = router;
