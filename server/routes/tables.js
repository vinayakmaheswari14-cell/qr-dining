const express = require('express');
const QRCode = require('qrcode');
const Table = require('../models/Table');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Generate unique slug
const generateSlug = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Get all tables (admin only)
router.get('/', auth, authorize('admin'), async (req, res) => {
  try {
    const tables = await Table.find().sort({ number: 1 });
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create table (admin only)
router.post('/', auth, authorize('admin'), async (req, res) => {
  try {
    const { number } = req.body;
    
    const existingTable = await Table.findOne({ number });
    if (existingTable) {
      return res.status(400).json({ message: 'Table number already exists' });
    }

    const table = new Table({
      number,
      qrSlug: generateSlug()
    });

    await table.save();
    res.status(201).json(table);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Generate QR code for table (admin only)
router.get('/:id/qr', auth, authorize('admin'), async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    const menuUrl = `${req.protocol}://${req.get('host')}/m/${table.qrSlug}`;
    const qrCodeDataURL = await QRCode.toDataURL(menuUrl, {
      width: 300,
      margin: 2
    });

    res.json({
      qrCode: qrCodeDataURL,
      url: menuUrl,
      table: {
        id: table._id,
        number: table.number,
        qrSlug: table.qrSlug
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update table (admin only)
router.put('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const table = await Table.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }
    
    res.json(table);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete table (admin only)
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const table = await Table.findByIdAndDelete(req.params.id);
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }
    res.json({ message: 'Table deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;