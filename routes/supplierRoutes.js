const express = require('express');
const router = express.Router();
const {
  addSupplier,
  getSuppliers,
  deleteSupplier
} = require('../controllers/supplierController');

router.post('/add', addSupplier);
router.get('/', getSuppliers);
router.delete('/delete/:id', deleteSupplier);

module.exports = router;
