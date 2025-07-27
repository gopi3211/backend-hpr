const path = require("path");
const fs = require("fs");
const AboutUsSubsectionModel = require("../models/about-us-subsection-model");
const db = require("../config/db");

exports.getSubsections = async (req, res) => {
  try {
    const data = await AboutUsSubsectionModel.getAll();
    const mapped = data.map((item) => ({
      id: item.id,
      heading: item.heading,
      description: item.description,
      image: item.image_path
        ? `${process.env.SERVER_URL}/uploads/about-us-subsections/${item.image_path}`
        : null,
    }));
    res.json(mapped);
  } catch (err) {
    console.error("GET Subsections Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createSubsection = async (req, res) => {
  try {
    const { heading, description } = req.body;
    const imagePath = req.file ? req.file.filename : null;
    const id = await AboutUsSubsectionModel.create(heading, description, imagePath);
    res.status(201).json({ id, heading, description, image: imagePath });
  } catch (err) {
    console.error("CREATE Subsection Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateSubsection = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, description } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    // ✅ Fetch old image to delete
    const [rows] = await db.query("SELECT image_path FROM about_us_sections WHERE id = ?", [id]);
    const oldImage = rows[0]?.image_path;

    // ✅ Update DB
    await AboutUsSubsectionModel.update(id, heading, description, imagePath);

    // ✅ Delete old image only if new image uploaded
    if (imagePath && oldImage) {
      const oldPath = path.join(__dirname, "..", "uploads", "about-us-subsections", oldImage);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    res.json({ id, heading, description, image: imagePath });
  } catch (err) {
    console.error("UPDATE Subsection Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteSubsection = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Fetch image path to delete from disk
    const [rows] = await db.query("SELECT image_path FROM about_us_sections WHERE id = ?", [id]);
    const imageToDelete = rows[0]?.image_path;

    await AboutUsSubsectionModel.delete(id);

    if (imageToDelete) {
      const filePath = path.join(__dirname, "..", "uploads", "about-us-subsections", imageToDelete);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE Subsection Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
