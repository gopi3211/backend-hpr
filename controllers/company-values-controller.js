const {
  getAllValues,
  addValue,
  updateValue,
  deleteValue
} = require('../models/company-values-model');
const path = require('path');

const fetchValues = async (req, res) => {
  try {
    const raw = await getAllValues();
    const data = raw.map(val => ({
      ...val,
      image_url: val.image
        ? `${process.env.SERVER_URL}/uploads/company-values/${val.image}`
        : null
    }));
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('[CompanyValues] Fetch error:', err);
    res.status(500).json({ success: false });
  }
};

const createValue = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file?.filename;
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

const editValue = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file?.filename || null;
    await updateValue(req.params.id, { title, description, image });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('[CompanyValues] Update error:', err);
    res.status(500).json({ success: false });
  }
};

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
