const express = require('express');
const router = express.Router();
const Log = require('../models/logModel');

router.get('/', async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching logs', error: err.message });
  }
});

module.exports = router;
