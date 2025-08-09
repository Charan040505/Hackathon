const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  quantity: { type: Number, default: 0 },
  min_quantity: { type: Number, default: 1 },
  price: { type: Number, required: true },
  supplier_id: String,
  createdAt: Date,
  updatedAt: Date
});

module.exports = mongoose.model('Item', ItemSchema);
