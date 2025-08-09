const express = require('express');
const router = express.Router();
const { addItem, deleteItem, updateItem, getAllItems, searchItems ,getLowStockItems, importItems , exportItems,generateQRCode,scanQRCode} = require('../controllers/itemController');

router.post('/add', addItem);
router.delete('/delete/:id', deleteItem);
router.put('/update/:id', updateItem);
router.get('/', getAllItems);
router.get('/search', searchItems); // NEW
router.get('/lowstock',getLowStockItems);
const { getCategorySummary } = require('../controllers/itemController');

router.get('/summary-by-category', getCategorySummary);
const upload = require('../middlewares/upload');

router.post('/import', upload.single('file'), importItems);
router.get('/export', exportItems);
router.get('/:id/qrcode', generateQRCode);
router.get('/scan/:itemId', scanQRCode);

module.exports = router;
