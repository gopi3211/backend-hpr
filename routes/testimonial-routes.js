const express = require('express');
const router = express.Router();
const upload = require('../middlewares/testimonial-upload'); // ✅ use correct one

const {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonial-controller');

router.get('/', getAllTestimonials);
router.post('/', upload.single('image'), createTestimonial);
router.put('/:id', upload.single('image'), updateTestimonial);
router.delete('/:id', deleteTestimonial);

module.exports = router;
