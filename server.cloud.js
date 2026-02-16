// backend/server.cloud.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Import your existing API routes
const apiRoutes = require('./api/server');
app.use('/api', apiRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Omega Backend Cloud Running');
});

// Use dynamic port for cloud
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Omega Backend Cloud Running On ${PORT}`));
