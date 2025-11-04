const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// In-memory storage for reset codes (in production, use Redis or database)
const resetCodes = new Map();

// Generate a random 6-digit verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Request password reset
router.post('/request', async (req, res) => {
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

    // In a real application, you would send this code via email
    // For demo purposes, we'll return it in the response
    console.log(`Password reset code for ${email}: ${resetToken}`);

    res.json({
      message: 'Password reset code has been sent to your email.',
      success: true,
      // Remove this in production - only for demo
      resetCode: resetToken
    });

  } catch (error) {
    console.error('Error requesting password reset:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify reset code
router.post('/verify', async (req, res) => {
  try {
    const { email, resetCode } = req.body;

    if (!email || !resetCode) {
      return res.status(400).json({ message: 'Email and reset code are required' });
    }

    const resetData = resetCodes.get(email.toLowerCase());
    
    if (!resetData || resetData.code !== resetCode || resetData.used || Date.now() > resetData.expires) {
      return res.status(400).json({ message: 'Invalid or expired reset code' });
    }

    res.json({
      message: 'Reset code verified successfully',
      success: true
    });

  } catch (error) {
    console.error('Error verifying reset code:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset password
router.post('/reset', async (req, res) => {
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