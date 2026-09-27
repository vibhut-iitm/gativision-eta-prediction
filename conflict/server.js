const express = require('express');
const cors = require('cors');
const { randomBytes, scryptSync, timingSafeEqual } = require('node:crypto');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const users = [];

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'GatiVision backend is running',
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body || {};
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const normalizedName = typeof name === 'string' ? name.trim() : '';

  if (!normalizedName || !normalizedEmail || typeof password !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and password are required.',
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({ success: false, message: 'Enter a valid email address.' });
  }

  if (normalizedName.length > 80 || password.length < 8 || password.length > 128) {
    return res.status(400).json({
      success: false,
      message: 'Use a name under 80 characters and a password between 8 and 128 characters.',
    });
  }

  const existingUser = users.find((user) => user.email === normalizedEmail);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'An account already exists with this email.',
    });
  }

  const salt = randomBytes(16).toString('hex');
  const user = {
    id: Date.now().toString(),
    name: normalizedName,
    email: normalizedEmail,
    salt,
    passwordHash: scryptSync(password, salt, 64).toString('hex'),
  };

  users.push(user);

  return res.status(201).json({
    success: true,
    message: 'Registration successful.',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

  if (!normalizedEmail || typeof password !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.',
    });
  }

  const user = users.find(
    (item) => item.email === normalizedEmail,
  );

  const passwordHash = user ? scryptSync(password, user.salt, 64) : Buffer.alloc(64);
  const storedHash = user ? Buffer.from(user.passwordHash, 'hex') : Buffer.alloc(64);

  if (!user || !timingSafeEqual(passwordHash, storedHash)) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.',
    });
  }

  return res.json({
    success: true,
    message: 'Login successful.',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

app.get('/api/trains', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: '12625', name: 'Karnataka Express', status: 'Running late' },
      { id: '12951', name: 'Mumbai Rajdhani', status: 'On schedule' },
      { id: '12009', name: 'Shatabdi Express', status: 'Delayed' },
    ],
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
