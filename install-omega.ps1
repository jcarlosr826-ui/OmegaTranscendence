# install-omega.ps1
# Run: powershell -ExecutionPolicy Bypass -File .\install-omega.ps1

$ErrorActionPreference = "Stop"

# Use the folder where this script is located (so it installs inside your OmegaTranscendence folder)
$root = $PSScriptRoot

Write-Host "Installing Omega into: $root" -ForegroundColor Cyan

# ---------------------------
# CREATE FOLDERS
# ---------------------------
$folders = @(
    "$root\backend\api",
    "$root\backend\ai",
    "$root\backend\workers",
    "$root\frontend\src",
    "$root\frontend\public"
)

foreach ($f in $folders) {
    New-Item -ItemType Directory -Force -Path $f | Out-Null
}

# ---------------------------
# BACKEND FILES
# ---------------------------
Set-Content -Encoding UTF8 "$root\backend\server.js" @"
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/credit', require('./api/credit'));
app.use('/api/scraper', require('./api/scraper'));
app.use('/api/marketplace', require('./api/marketplace'));

// Root
app.get('/', (req, res) => res.send('Omega Backend Running'));

// Start server (Render uses PORT env var)
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log(`Backend running on port ${PORT}`));
"@

Set-Content -Encoding UTF8 "$root\backend\api\credit.js" @"
const router = require('express').Router();

// Placeholder endpoint (safe stub)
// Later we can wire real logic + DB + AI suggestions
router.post('/analyze', async (req, res) => {
  const { creditEntry } = req.body || {};
  res.json({
    ok: true,
    received: creditEntry || null,
    strategy: "FCRA §611 dispute workflow (stub)",
    notes: "This is a starter endpoint to confirm frontend-backend connection."
  });
});

module.exports = router;
"@

Set-Content -Encoding UTF8 "$root\backend\api\scraper.js" @"
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
"@

Set-Content -Encoding UTF8 "$root\backend\api\marketplace.js" @"
const router = require('express').Router();

// Placeholder endpoint (safe stub)
router.post('/analyze', async (req, res) => {
  const { demand = 0, competition = 0 } = req.body || {};
  const score = Number(demand) * (1 - Number(competition));
  res.json({ ok: true, score });
});

module.exports = router;
"@

Set-Content -Encoding UTF8 "$root\backend\package.json" @"
{
  "name": "omega-backend",
  "version": "1.0.0",
  "private": true,
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2"
  }
}
"@

# Optional local .env (Render will use its own env vars)
if (-not (Test-Path "$root\backend\.env")) {
    Set-Content -Encoding UTF8 "$root\backend\.env" @"
PORT=10000
NODE_ENV=development
JWT_SECRET=change_me
DATABASE_URL=postgresql://user:pass@localhost:5432/omegadb
OPENAI_API_KEY=
"@
}

# ---------------------------
# FRONTEND FILES (CRA)
# ---------------------------
Set-Content -Encoding UTF8 "$root\frontend\public\index.html" @"
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Omega Frontend</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
"@

Set-Content -Encoding UTF8 "$root\frontend\src\index.js" @"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
"@

Set-Content -Encoding UTF8 "$root\frontend\src\App.js" @"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Change this to your Render URL when you deploy frontend:
// const API_BASE = 'https://omegatranscendence.onrender.com';
const API_BASE = 'http://localhost:10000';

export default function App() {
  const [status, setStatus] = useState('Checking backend...');
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(API_BASE + '/')
      .then(() => setStatus('✅ Backend connected'))
      .catch(() => setStatus('❌ Cannot connect to backend'));
  }, []);

  const testCredit = async () => {
    const res = await axios.post(API_BASE + '/api/credit/analyze', {
      creditEntry: "Test item: collection account - verify dispute pipeline"
    });
    setData(res.data);
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: 24 }}>
      <h1>Omega Dashboard</h1>
      <p><b>Status:</b> {status}</p>

      <button onClick={testCredit} style={{ padding: '10px 14px', cursor: 'pointer' }}>
        Test Credit Endpoint
      </button>

      {data && (
        <pre style={{ marginTop: 16, background: '#f3f3f3', padding: 16 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
"@

Set-Content -Encoding UTF8 "$root\frontend\package.json" @"
{
  "name": "omega-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
  "dependencies": {
    "axios": "^1.7.9",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "^5.0.1"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
"@

# ---------------------------
# INSTALL DEPENDENCIES
# ---------------------------
Write-Host "`nInstalling backend dependencies..." -ForegroundColor Yellow
Push-Location "$root\backend"
npm install
Pop-Location

Write-Host "`nInstalling frontend dependencies..." -ForegroundColor Yellow
Push-Location "$root\frontend"
npm install
Pop-Location

Write-Host "`n✅ INSTALL COMPLETE" -ForegroundColor Green
Write-Host "Start backend:  cd `"$root\backend`"  ; npm start" -ForegroundColor Cyan
Write-Host "Start frontend: cd `"$root\frontend`" ; npm start" -ForegroundColor Cyan
