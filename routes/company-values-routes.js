const express = require('express');
const router = express.Router();

const {
  fetchValues,
  createValue,
  editValue,
  removeValue
} = require('../controllers/company-values-controller');

router.get('/', fetchValues);
router.post('/', createValue);        // ❌ removed multer
router.put('/:id', editValue);        // ❌ removed multer
router.delete('/:id', removeValue);

module.exports = router;
