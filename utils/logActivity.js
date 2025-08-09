// utils/logActivity.js
const Log = require('../models/logModel');

const logActivity = async (action, item, user = 'unknown', changes = {}) => {
  try {
    await Log.create({
      action,
      itemId: item._id,
      itemName: item.name,
      user,
      changes,
    });
  } catch (err) {
    console.error('Logging failed:', err.message);
  }
};

module.exports = logActivity;
