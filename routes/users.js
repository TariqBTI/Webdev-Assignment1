const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { auth } = require('../middleware/auth');
const { validateLogin, validateRegister } = require('../middleware/validate');

router.post('/login', validateLogin, async (req, res) => {
  const { username, password } = req.body;
  const user = await db.getUserByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const token = jwt.sign({ id: user.id, username: user.username }, 'secret');
  res.json({ token });
});

router.post('/register', validateRegister, async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.addUser(username, email, hashedPassword);
  res.json({ message: 'User registered successfully' });
});

router.get('/profile', auth, async (req, res) => {
  const user = await db.getUserById(req.userId);
  res.json({ user });
});

module.exports = router;