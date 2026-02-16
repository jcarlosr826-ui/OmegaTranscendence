// backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const { exec } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json());

// Import API routes from backend/api/server.js
const apiRoutes = require('./api/server');
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Omega Backend Running');
});

// Auto-launch modules or scripts if needed
function launchModules() {
  const scriptPath = path.join(__dirname, '..', 'scripts', '_silent-run.ps1');
  exec(`powershell -ExecutionPolicy Bypass -File "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) console.log(`Auto-launch error: ${error.message}`);
    if (stderr) console.log(`Auto-launch stderr: ${stderr}`);
    if (stdout) console.log(`Auto-launch stdout: ${stdout}`);
  });
}

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Omega Backend Running On ${PORT}`);
  // Uncomment below to auto-launch modules when backend starts
  // launchModules();
});
