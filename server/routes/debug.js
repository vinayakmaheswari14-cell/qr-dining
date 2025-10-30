const express = require('express');
const User = require('../models/User');
const MenuCategory = require('../models/MenuCategory');
const MenuItem = require('../models/MenuItem');
const Table = require('../models/Table');
const Order = require('../models/Order');

const router = express.Router();

// Get database overview
router.get('/db-overview', async (req, res) => {
  try {
    const [users, categories, items, tables, orders] = await Promise.all([
      User.find().select('-passwordHash'),
      MenuCategory.find(),
      MenuItem.find().populate('categoryId', 'name'),
      Table.find(),
      Order.find().populate('tableId', 'number').populate('items.menuItemId', 'name')
    ]);

    res.json({
      collections: {
        users: {
          count: users.length,
          data: users
        },
        categories: {
          count: categories.length,
          data: categories
        },
        menuItems: {
          count: items.length,
          data: items
        },
        tables: {
          count: tables.length,
          data: tables
        },
        orders: {
          count: orders.length,
          data: orders
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching database data', error: error.message });
  }
});

module.exports = router;