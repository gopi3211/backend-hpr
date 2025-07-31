const AboutUsSubsectionModel = require("../models/about-us-subsection-model");

exports.getSubsections = async (req, res) => {
  try {
    const data = await AboutUsSubsectionModel.getAll();

    const mapped = data.map((item) => ({
      id: item.id,
      heading: item.heading,
      description: item.description,
      image: item.image_url || null, // expose as 'image' to frontend
    }));

    res.json(mapped);
  } catch (err) {
    console.error("GET Subsections Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createSubsection = async (req, res) => {
  try {
    const { heading, description, image_url } = req.body;

    if (!heading || !description || !image_url) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const id = await AboutUsSubsectionModel.create(heading, description, image_url);
    res.status(201).json({ id, heading, description, image: image_url });
  } catch (err) {
    console.error("CREATE Subsection Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateSubsection = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description, image_url } = req.body;

    if (!heading || !description) {
      return res.status(400).json({ message: "Heading and description are required." });
    }

    await AboutUsSubsectionModel.update(id, heading, description, image_url || null);
    res.json({ id, heading, description, image: image_url || null });
  } catch (err) {
    console.error("UPDATE Subsection Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteSubsection = async (req, res) => {
  try {
    const { id } = req.params;
    await AboutUsSubsectionModel.delete(id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE Subsection Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
