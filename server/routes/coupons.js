const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');
const { auth } = require('../middleware/auth');

// Get all active coupons (public)
router.get('/active', async (req, res) => {
  try {
    const coupons = await Coupon.find({ 
      isActive: true,
      $or: [
        { validUntil: null },
        { validUntil: { $gte: new Date() } }
      ]
    }).select('code description discountType discountValue minimumOrderAmount');
    
    res.json(coupons);
  } catch (error) {
    console.error('Error fetching active coupons:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Validate coupon
router.post('/validate', async (req, res) => {
  try {
    const { code, orderAmount } = req.body;
    
    if (!code) {
      return res.status(400).json({ message: 'Coupon code is required' });
    }
    
    const coupon = await Coupon.findOne({ 
      code: code.toUpperCase(),
      isActive: true 
    });
    
    if (!coupon) {
      return res.status(404).json({ message: 'Invalid coupon code' });
    }
    
    const validation = coupon.isValid(orderAmount || 0);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }
    
    const discountResult = coupon.calculateDiscount(orderAmount || 0);
    
    res.json({
      valid: true,
      coupon: {
        code: coupon.code,
        description: coupon.description,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue
      },
      discount: discountResult.discount,
      discountPercentage: discountResult.discountPercentage,
      message: discountResult.message
    });
  } catch (error) {
    console.error('Error validating coupon:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Apply coupon (when order is placed)
router.post('/apply', async (req, res) => {
  try {
    const { code, orderAmount } = req.body;
    
    const coupon = await Coupon.findOne({ 
      code: code.toUpperCase(),
      isActive: true 
    });
    
    if (!coupon) {
      return res.status(404).json({ message: 'Invalid coupon code' });
    }
    
    const validation = coupon.isValid(orderAmount);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }
    
    const discountResult = coupon.calculateDiscount(orderAmount);
    
    // Increment usage count
    coupon.usedCount += 1;
    await coupon.save();
    
    res.json({
      applied: true,
      discount: discountResult.discount,
      discountPercentage: discountResult.discountPercentage,
      finalAmount: orderAmount - discountResult.discount,
      message: discountResult.message
    });
  } catch (error) {
    console.error('Error applying coupon:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin routes
// Get all coupons (admin only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    console.error('Error fetching coupons:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create coupon (admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const coupon = new Coupon(req.body);
    await coupon.save();
    
    res.status(201).json(coupon);
  } catch (error) {
    console.error('Error creating coupon:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Coupon code already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// Update coupon (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    
    res.json(coupon);
  } catch (error) {
    console.error('Error updating coupon:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete coupon (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    
    res.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;