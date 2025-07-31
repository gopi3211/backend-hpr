const {
  getAllSlides,
  addSlide,
  updateSlide,
  deleteSlide,
} = require('../models/hero-carousel-model');

console.log('[CONTROLLER] hero-carousel-controller.js loaded');

// ===============================
// Get All Slides
// ===============================
const fetchHeroSlides = async (req, res) => {
  console.log('[CONTROLLER] fetchHeroSlides() called');
  try {
    const results = await getAllSlides();
    res.status(200).json({ success: true, data: results });
  } catch (err) {
    console.error('[CONTROLLER] Error fetching hero slides:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch slides' });
  }
};

// ===============================
// Add New Slide
// ===============================
const createHeroSlide = async (req, res) => {
  console.log('[CONTROLLER] createHeroSlide() called');
  const { heading, subheading, image } = req.body;

  if (!heading || !subheading || !image) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    await addSlide({ heading, subheading, image });
    res.status(201).json({ success: true, message: 'Slide added successfully' });
  } catch (err) {
    console.error('[CONTROLLER] Failed to add slide:', err);
    res.status(500).json({ success: false, message: 'Slide creation failed' });
  }
};

// ===============================
// Update Slide
// ===============================
const updateHeroSlide = async (req, res) => {
  console.log('[CONTROLLER] updateHeroSlide() called');

  const slideId = req.params.id;
  const { heading, subheading, image } = req.body;

  if (!heading || !subheading || !image) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    await updateSlide(slideId, { heading, subheading, image });
    res.status(200).json({ success: true, message: 'Slide updated successfully' });
  } catch (err) {
    console.error('[CONTROLLER] Failed to update slide:', err);
    res.status(500).json({ success: false, message: 'Slide update failed' });
  }
};

// ===============================
// Delete Slide
// ===============================
const deleteHeroSlide = async (req, res) => {
  console.log('[CONTROLLER] deleteHeroSlide() called');

  const slideId = req.params.id;

  try {
    await deleteSlide(slideId);
    res.status(200).json({ success: true, message: 'Slide deleted successfully' });
  } catch (err) {
    console.error('[CONTROLLER] Error deleting slide:', err);
    res.status(500).json({ success: false, message: 'Failed to delete slide' });
  }
};

module.exports = {
  fetchHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
};
