const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true
  },
  qrSlug: {
    type: String,
    required: true,
    unique: true
  },
  activeSessionId: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Table', tableSchema);