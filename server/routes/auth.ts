import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbRun, dbGet } from '../database/init.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, username, password, liveGoodId } = req.body;

    // Validation
    if (!email || !username || !password) {
      return res.status(400).json({ 
        error: 'Email, username, and password are required' 
      });
    }

    if (password.length < 8) {
      return res.status(400).json({ 
        error: 'Password must be at least 8 characters long' 
      });
    }

    // Check if user already exists
    const existingUser = await dbGet(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUser) {
      return res.status(409).json({ 
        error: 'User with this email or username already exists' 
      });
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const result = await dbRun(
      `INSERT INTO users (email, username, password_hash, live_good_id) 
       VALUES (?, ?, ?, ?)`,
      [email, username, passwordHash, liveGoodId || null]
    );

    // Generate JWT token
    const token = jwt.sign(
      { userId: result.lastID, email, username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Store session
    const tokenHash = await bcrypt.hash(token, 10);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    
    await dbRun(
      'INSERT INTO sessions (user_id, token_hash, expires_at) VALUES (?, ?, ?)',
      [result.lastID, tokenHash, expiresAt.toISOString()]
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: result.lastID,
        email,
        username,
        liveGoodId: liveGoodId || null
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { emailOrUsername, password, rememberMe } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(400).json({ 
        error: 'Email/username and password are required' 
      });
    }

    // Find user
    const user = await dbGet(
      'SELECT * FROM users WHERE email = ? OR username = ? AND is_active = 1',
      [emailOrUsername, emailOrUsername]
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await dbRun(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
      [user.id]
    );

    // Generate JWT token
    const expiresIn = rememberMe ? '30d' : '7d';
    const token = jwt.sign(
      { userId: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn }
    );

    // Store session
    const tokenHash = await bcrypt.hash(token, 10);
    const expiresAt = new Date(Date.now() + (rememberMe ? 30 : 7) * 24 * 60 * 60 * 1000);
    
    await dbRun(
      'INSERT INTO sessions (user_id, token_hash, expires_at) VALUES (?, ?, ?)',
      [user.id, tokenHash, expiresAt.toISOString()]
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        liveGoodId: user.live_good_id
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await dbGet(
      'SELECT id, email, username, live_good_id, created_at, last_login FROM users WHERE id = ?',
      [req.user.userId]
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user information' });
  }
});

// Logout
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // Remove session
    await dbRun(
      'DELETE FROM sessions WHERE user_id = ?',
      [req.user.userId]
    );

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

// Password reset request
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await dbGet('SELECT id FROM users WHERE email = ?', [email]);
    
    // Always return success to prevent email enumeration
    res.json({ 
      message: 'If an account with this email exists, a password reset link has been sent.' 
    });

    // In a real implementation, you would send an email here
    if (user) {
      console.log(`Password reset requested for user ID: ${user.id}`);
      // TODO: Implement email sending logic
    }

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ error: 'Password reset request failed' });
  }
});

export { router as authRoutes };
