const express = require('express');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Place order (customer or guest)
router.post('/', async (req, res) => {
  try {
    const { tableId, items, customerNote, subtotal, total, couponCode, discountAmount } = req.body;
    
    // Validate and prepare order items
    const orderItems = [];
    let calculatedSubtotal = 0;

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);
      if (!menuItem || !menuItem.availability) {
        return res.status(400).json({ 
          message: `Item ${menuItem?.name || 'unknown'} is not available` 
        });
      }

      // Use the price from the request to ensure consistency
      const itemPrice = item.price || menuItem.price;
      const itemTotal = itemPrice * item.quantity;
      calculatedSubtotal += itemTotal;

      orderItems.push({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        note: item.note || '',
        price: itemPrice
      });

      // Update popularity
      menuItem.popularity += item.quantity;
      await menuItem.save();
    }

    // Use provided totals or calculate them
    const finalSubtotal = subtotal || calculatedSubtotal;
    const finalTotal = total || finalSubtotal;

    const order = new Order({
      tableId,
      customerId: req.user?.id || null,
      items: orderItems,
      subtotal: finalSubtotal,
      tax: 0, // No tax for now
      total: finalTotal,
      couponCode: couponCode || null,
      discountAmount: discountAmount || 0,
      customerNote: customerNote || ''
    });

    await order.save();
    await order.populate([
      { path: 'tableId', select: 'number' },
      { path: 'items.menuItemId', select: 'name price' }
    ]);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get orders (staff/admin with filters)
router.get('/', auth, authorize('staff', 'admin'), async (req, res) => {
  try {
    const { status, table, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (table) query.tableId = table;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const orders = await Order.find(query)
      .populate('tableId', 'number')
      .populate('items.menuItemId', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Filter out orders with null tableId to prevent frontend errors
    const validOrders = orders.filter(order => order.tableId !== null);

    const total = await Order.countDocuments(query);

    res.json({
      orders: validOrders,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total: validOrders.length
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status (staff/admin)
router.patch('/:id/status', auth, authorize('staff', 'admin'), async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['placed', 'preparing', 'ready', 'served', 'canceled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate([
      { path: 'tableId', select: 'number' },
      { path: 'items.menuItemId', select: 'name price' }
    ]);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get customer's order history
router.get('/me', auth, async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user.id })
      .populate('tableId', 'number')
      .populate('items.menuItemId', 'name price')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get order by ID (public route for order tracking)
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('tableId', 'number')
      .populate('items.menuItemId', 'name price description');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Return order details (public access for order tracking)
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;