const express = require('express');
const MenuItem = require('../models/MenuItem');
const MenuCategory = require('../models/MenuCategory');
const Table = require('../models/Table');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get menu items with filtering and pagination
router.get('/items', async (req, res) => {
  try {
    const {
      search = '',
      category = '',
      sort = 'name',
      page = 1,
      limit = 20,
      available = 'true'
    } = req.query;

    const query = {};
    
    if (available === 'true') {
      query.availability = true;
    }
    
    if (category) {
      query.categoryId = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const sortOptions = {};
    switch (sort) {
      case 'price-asc':
        sortOptions.price = 1;
        break;
      case 'price-desc':
        sortOptions.price = -1;
        break;
      case 'popularity':
        sortOptions.popularity = -1;
        break;
      default:
        sortOptions.name = 1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const items = await MenuItem.find(query)
      .populate('categoryId', 'name')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await MenuItem.countDocuments(query);

    res.json({
      items,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await MenuCategory.find({ active: true })
      .sort({ displayOrder: 1, name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get menu by table slug (public route)
router.get('/by-table/:slug', async (req, res) => {
  try {
    const table = await Table.findOne({ qrSlug: req.params.slug });
    
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    const categories = await MenuCategory.find({ active: true })
      .sort({ displayOrder: 1, name: 1 });

    const items = await MenuItem.find({ availability: true })
      .populate('categoryId', 'name')
      .sort({ name: 1 });

    res.json({
      table: {
        id: table._id,
        number: table.number,
        qrSlug: table.qrSlug
      },
      categories,
      items
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin routes for menu management
router.post('/items', auth, authorize('admin'), async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    await item.save();
    await item.populate('categoryId', 'name');
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/items/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('categoryId', 'name');
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/items/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Category management
router.post('/categories', auth, authorize('admin'), async (req, res) => {
  try {
    const category = new MenuCategory(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/categories/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const category = await MenuCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;