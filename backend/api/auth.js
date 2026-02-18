// backend/api/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();


const JWT_SECRET = process.env.JWT_SECRET;


// Dummy user DB (replace with real DB)
const users = [{ id: 1, email: 'admin@omega.com', password: 'omega123' }];


// Register (simplified)
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email)) return res.status(400).json({ error: 'User exists' });
  const newUser = { id: users.length + 1, email, password };
  users.push(newUser);
  res.json({ message: 'Registered successfully', user: { id: newUser.id, email } });
});


// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });


  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '12h' });
  res.json({ message: 'Login successful', token });
});


module.exports = router;
