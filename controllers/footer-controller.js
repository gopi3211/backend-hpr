const FooterModel = require("../models/footer-model");

exports.getFooter = async (req, res) => {
  try {
    const data = await FooterModel.getLatest();

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    if (Array.isArray(data) && data.length > 0) {
      if (data[0].logo) {
        data[0].logo_url = `${baseUrl}/uploads/footer-logos/${data[0].logo}`;
      }
    }

    res.json({ success: true, data: data[0] });
  } catch (error) {
    console.error("GET footer error", error);
    res.status(500).json({ success: false, message: "Error getting footer" });
  }
};

exports.createFooter = async (req, res) => {
  try {
    const logo = req.file?.filename || null;

    const data = {
      ...req.body,
      logo,
    };

    await FooterModel.create(data);
    res.json({ success: true, message: "Footer created" });
  } catch (error) {
    console.error("CREATE footer error", error);
    res.status(500).json({ success: false, message: "Error creating footer" });
  }
};

exports.updateFooter = async (req, res) => {
  try {
    const { id } = req.params;
    const logo = req.file?.filename || req.body.existingLogo;

    const data = {
      ...req.body,
      id,
      logo,
    };

    await FooterModel.update(data);
    res.json({ success: true, message: "Footer updated" });
  } catch (error) {
    console.error("UPDATE footer error", error);
    res.status(500).json({ success: false, message: "Error updating footer" });
  }
};

exports.deleteFooter = async (req, res) => {
  try {
    const id = req.params.id;
    await FooterModel.delete(id);
    res.json({ success: true, message: "Footer deleted" });
  } catch (error) {
    console.error("DELETE footer error", error);
    res.status(500).json({ success: false, message: "Error deleting footer" });
  }
};
