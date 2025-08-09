// models/Log.js
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  action: { type: String, enum: ['add', 'update', 'delete'], required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  itemName: String,
  timestamp: { type: Date, default: Date.now },
  changes: Object
});

module.exports = mongoose.model('Log', logSchema);
