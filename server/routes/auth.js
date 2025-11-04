const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const { sendPasswordResetEmail, sendWelcomeEmail } = require('../utils/emailService');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      name,
      email,
      passwordHash: password,
      role: role || 'customer'
    });

    await user.save();

    // Send welcome email (optional - don't block registration if email fails)
    try {
      await sendWelcomeEmail(user.email, user.name);
    } catch (emailError) {
      console.log('Welcome email failed to send:', emailError.message);
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});

// In-memory storage for reset codes (in production, use Redis or database)
const resetCodes = new Map();

// Generate a random 6-digit verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Request password reset
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Don't reveal if email exists or not for security
      return res.json({ 
        message: 'If an account with this email exists, you will receive a password reset code.',
        success: true 
      });
    }

    // Generate verification code
    const resetToken = generateVerificationCode();
    
    // Store reset code with expiry (15 minutes)
    resetCodes.set(email.toLowerCase(), {
      code: resetToken,
      userId: user._id,
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      used: false
    });

    // Send password reset email
    try {
      const emailResult = await sendPasswordResetEmail(user.email, resetToken, user.name);
      
      if (emailResult.success) {
        console.log(`Password reset email sent successfully to ${email}`);
        res.json({
          message: 'Password reset code has been sent to your email.',
          success: true
        });
      } else {
        console.error('Failed to send password reset email:', emailResult.error);
        // Still return success for security, but log the error
        res.json({
          message: 'Password reset code has been sent to your email.',
          success: true,
          // For development - show the code if email fails
          resetCode: process.env.NODE_ENV === 'development' ? resetToken : undefined
        });
      }
    } catch (emailError) {
      console.error('Error sending password reset email:', emailError);
      // Don't fail the request if email fails - show code for development
      res.json({
        message: 'Password reset code has been sent to your email.',
        success: true,
        // For development - show the code if email fails
        resetCode: process.env.NODE_ENV === 'development' ? resetToken : undefined
      });
    }

  } catch (error) {
    console.error('Error requesting password reset:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, resetCode, newPassword } = req.body;

    if (!email || !resetCode || !newPassword) {
      return res.status(400).json({ message: 'Email, reset code, and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const resetData = resetCodes.get(email.toLowerCase());
    
    if (!resetData || resetData.code !== resetCode || resetData.used || Date.now() > resetData.expires) {
      return res.status(400).json({ message: 'Invalid or expired reset code' });
    }

    // Find the user
    const user = await User.findById(resetData.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update user password
    user.passwordHash = hashedPassword;
    await user.save();

    // Mark reset code as used
    resetData.used = true;
    resetCodes.set(email.toLowerCase(), resetData);

    res.json({
      message: 'Password reset successfully',
      success: true
    });

  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;