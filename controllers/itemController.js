const Item = require('../models/Item');
const logActivity = require('../utils/logActivity'); // utility function for logging

// Add new item
exports.addItem = async (req, res) => {
  try {
    const newItem = new Item({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const savedItem = await newItem.save();

    await logActivity('add', savedItem, 'system', { item: savedItem });

    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: 'Item creation failed', error: err.message });
  }
};

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch items', error: err.message });
  }
};

// Update item by ID
exports.updateItem = async (req, res) => {
  try {
    const oldItem = await Item.findById(req.params.id);
    if (!oldItem) return res.status(404).json({ message: 'Item not found' });

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    await logActivity('update', updatedItem, 'system', { before: oldItem, after: updatedItem });

    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message });
  }
};

// Delete item by ID
exports.deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });

    await logActivity('delete', deletedItem, 'system', { deletedItem });

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Deletion failed', error: err.message });
  }
};

// Get low stock items
exports.getLowStockItems = async (req, res) => {
  try {
    const lowStockItems = await Item.find({ $expr: { $lt: ["$quantity", "$min_quantity"] } });
    res.status(200).json(lowStockItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch low stock items' });
  }
};

// Search items
exports.searchItems = async (req, res) => {
  try {
    const { name, category, minQty, supplier } = req.query;
    const query = {};

    if (name) query.name = { $regex: name, $options: 'i' };
    if (category) query.category = category;
    if (minQty) query.quantity = { $lt: parseInt(minQty) };
    if (supplier) query.supplier_id = supplier;

    const items = await Item.find(query);
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error searching items', error: err.message });
  }
};
// Category-wise Summary
exports.getCategorySummary = async (req, res) => {
  try {
    const summary = await Item.aggregate([
      {
        $group: {
          _id: '$category',
          totalItems: { $sum: 1 },
          totalQuantity: { $sum: '$quantity' },
          averagePrice: { $avg: '$price' }
        }
      },
      { $sort: { totalQuantity: -1 } }
    ]);
    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ message: 'Failed to generate category summary', error: err.message });
  }
};
const fs = require('fs');
const csv = require('csv-parser');
const { Parser } = require('json2csv');

// Bulk import items from CSV
exports.importItems = async (req, res) => {
  try {
    const items = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (row) => {
        items.push(row);
      })
      .on('end', async () => {
        const inserted = await Item.insertMany(items);
        res.status(200).json({ message: 'Import successful', count: inserted.length });
      });
  } catch (err) {
    res.status(500).json({ message: 'Import failed', error: err.message });
  }
};

// Export items to CSV
exports.exportItems = async (req, res) => {
  try {
    const items = await Item.find().lean();
    const parser = new Parser();
    const csvData = parser.parse(items);

    res.header('Content-Type', 'text/csv');
    res.attachment('items.csv');
    return res.send(csvData);
  } catch (err) {
    res.status(500).json({ message: 'Export failed', error: err.message });
  }
};
const QRCode = require('qrcode');

// Generate QR Code for an item
exports.generateQRCode = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    const qrData = `${req.protocol}://${req.get('host')}/api/items/scan/${item._id}`;
    const qrImage = await QRCode.toDataURL(qrData);

    res.status(200).json({ qrData, qrImage }); // You can render this image on frontend
  } catch (err) {
    res.status(500).json({ message: 'QR generation failed', error: err.message });
  }
};

// Simulate QR Scan: Fetch item by ID
exports.scanQRCode = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Scan failed', error: err.message });
  }
};
