const AboutUsModel = require("../models/about-us-model");

exports.getAboutUs = async (req, res) => {
  try {
    const data = await AboutUsModel.getAll();
    const mapped = data.map((item) => ({
      id: item.id,
      heading: item.heading,
      description: item.description,
      image: item.image_url || null, // direct URL from DB
    }));
    res.json(mapped);
  } catch (err) {
    console.error("GET About Us Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createAboutUs = async (req, res) => {
  try {
    const { heading, description, image_url } = req.body;

    if (!heading || !description || !image_url) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const id = await AboutUsModel.create(heading, description, image_url);
    res.status(201).json({ id, heading, description, image: image_url });
  } catch (err) {
    console.error("CREATE About Us Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateAboutUs = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description, image_url } = req.body;

    await AboutUsModel.update(id, heading, description, image_url);
    res.json({ id, heading, description, image: image_url });
  } catch (err) {
    console.error("UPDATE About Us Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteAboutUs = async (req, res) => {
  try {
    const { id } = req.params;
    await AboutUsModel.delete(id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE About Us Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
