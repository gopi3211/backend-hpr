const testimonialModel = require('../models/testimonial-model');

const getAllTestimonials = async (req, res) => {
  try {
    const data = await testimonialModel.getAll();

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const formatted = data.map(item => ({
      ...item,
      image_url: item.image
        ? `${baseUrl}/uploads/testimonials/${item.image}`
        : null
    }));

    res.json({ success: true, data: formatted });
  } catch (err) {
    console.error('Error fetching testimonials:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const createTestimonial = async (req, res) => {
  try {
    const { name, message } = req.body;
    const imageName = req.file?.filename || null;
    await testimonialModel.create(name, message, imageName);
    res.json({ success: true, message: 'Testimonial added successfully' });
  } catch (err) {
    console.error('Error creating testimonial:', err);
    res.status(500).json({ success: false, message: 'Creation failed' });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const { name, message } = req.body;
    const { id } = req.params;
    const imageName = req.file?.filename || null;
    await testimonialModel.update(id, name, message, imageName);
    res.json({ success: true, message: 'Testimonial updated successfully' });
  } catch (err) {
    console.error('Error updating testimonial:', err);
    res.status(500).json({ success: false, message: 'Update failed' });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    await testimonialModel.delete(id);
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    console.error('Error deleting testimonial:', err);
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
};

module.exports = {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};
