const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0
  },
  minimumOrderAmount: {
    type: Number,
    default: 0
  },
  maximumDiscountAmount: {
    type: Number,
    default: null
  },
  usageLimit: {
    type: Number,
    default: null // null means unlimited
  },
  usedCount: {
    type: Number,
    default: 0
  },
  validFrom: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date,
    default: null // null means no expiry
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applicableCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuCategory'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Method to check if coupon is valid
couponSchema.methods.isValid = function(orderAmount = 0) {
  const now = new Date();
  
  // Check if coupon is active
  if (!this.isActive) {
    return { valid: false, message: 'Coupon is not active' };
  }
  
  // Check usage limit
  if (this.usageLimit && this.usedCount >= this.usageLimit) {
    return { valid: false, message: 'Coupon usage limit exceeded' };
  }
  
  // Check validity dates
  if (this.validFrom && now < this.validFrom) {
    return { valid: false, message: 'Coupon is not yet valid' };
  }
  
  if (this.validUntil && now > this.validUntil) {
    return { valid: false, message: 'Coupon has expired' };
  }
  
  // Check minimum order amount
  if (orderAmount < this.minimumOrderAmount) {
    return { 
      valid: false, 
      message: `Minimum order amount is ₹${this.minimumOrderAmount}` 
    };
  }
  
  return { valid: true, message: 'Coupon is valid' };
};

// Method to calculate discount
couponSchema.methods.calculateDiscount = function(orderAmount) {
  const validation = this.isValid(orderAmount);
  if (!validation.valid) {
    return { discount: 0, message: validation.message };
  }
  
  let discount = 0;
  
  if (this.discountType === 'percentage') {
    discount = (orderAmount * this.discountValue) / 100;
  } else if (this.discountType === 'fixed') {
    discount = this.discountValue;
  }
  
  // Apply maximum discount limit if set
  if (this.maximumDiscountAmount && discount > this.maximumDiscountAmount) {
    discount = this.maximumDiscountAmount;
  }
  
  // Ensure discount doesn't exceed order amount
  if (discount > orderAmount) {
    discount = orderAmount;
  }
  
  return { 
    discount: Math.round(discount), 
    message: 'Discount applied successfully',
    discountPercentage: this.discountType === 'percentage' ? this.discountValue : Math.round((discount / orderAmount) * 100)
  };
};

module.exports = mongoose.model('Coupon', couponSchema);