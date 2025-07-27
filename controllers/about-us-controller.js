const AboutUsModel = require("../models/about-us-model");

exports.getAboutUs = async (req, res) => {
  console.time("[API] GET /about-us duration");

  try {
    const data = await AboutUsModel.getAll();
    const mapped = data.map((item) => ({
      id: item.id,
      heading: item.heading,
      description: item.description,
      image: item.image_filename
        ? `${req.protocol}://${req.get("host")}/uploads/about-us/${item.image_filename}`
        : null,
    }));

    res.json(mapped);
  } catch (err) {
    console.error("GET About Us Error:", err);
    res.status(500).json({ message: "Server Error" });
  } finally {
    console.timeEnd("[API] GET /about-us duration");
  }
};

exports.createAboutUs = async (req, res) => {
  console.time("[API] POST /about-us duration");

  try {
    const { heading, description } = req.body;
    const imageFilename = req.file ? req.file.filename : null;

    if (!heading || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const id = await AboutUsModel.create(heading, description, imageFilename);
    res.status(201).json({ id, heading, description, image: imageFilename });
  } catch (err) {
    console.error("CREATE About Us Error:", err);
    res.status(500).json({ message: "Server Error" });
  } finally {
    console.timeEnd("[API] POST /about-us duration");
  }
};

exports.updateAboutUs = async (req, res) => {
  console.time("[API] PUT /about-us/:id duration");

  try {
    const { id } = req.params;
    const { heading, description } = req.body;
    const imageFilename = req.file ? req.file.filename : null;

    await AboutUsModel.update(id, heading, description, imageFilename);
    res.json({ id, heading, description, image: imageFilename });
  } catch (err) {
    console.error("UPDATE About Us Error:", err);
    res.status(500).json({ message: "Server Error" });
  } finally {
    console.timeEnd("[API] PUT /about-us/:id duration");
  }
};

exports.deleteAboutUs = async (req, res) => {
  console.time("[API] DELETE /about-us/:id duration");

  try {
    const { id } = req.params;
    await AboutUsModel.delete(id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE About Us Error:", err);
    res.status(500).json({ message: "Server Error" });
  } finally {
    console.timeEnd("[API] DELETE /about-us/:id duration");
  }
};
