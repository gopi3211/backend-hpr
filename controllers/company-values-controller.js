const {
  getAllValues,
  addValue,
  updateValue,
  deleteValue
} = require('../models/company-values-model');

// ✅ Fetch with image URL as-is
const fetchValues = async (req, res) => {
  try {
    const data = await getAllValues();
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('[CompanyValues] Fetch error:', err);
    res.status(500).json({ success: false });
  }
};

// ✅ Create value (image is now a full URL string)
const createValue = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    if (!title || !description || !image) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }
    await addValue({ title, description, image });
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('[CompanyValues] Create error:', err);
    res.status(500).json({ success: false });
  }
};

// ✅ Edit value
const editValue = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    await updateValue(req.params.id, { title, description, image });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('[CompanyValues] Update error:', err);
    res.status(500).json({ success: false });
  }
};

// ✅ Delete
const removeValue = async (req, res) => {
  try {
    await deleteValue(req.params.id);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('[CompanyValues] Delete error:', err);
    res.status(500).json({ success: false });
  }
};

module.exports = {
  fetchValues,
  createValue,
  editValue,
  removeValue
};
