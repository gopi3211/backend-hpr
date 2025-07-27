const db = require("../config/db");

const AboutUsSubsectionModel = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM about_us_sections");
    return rows;
  },

  create: async (heading, description, imagePath) => {
    const [result] = await db.query(
      "INSERT INTO about_us_sections (heading, description, image_path) VALUES (?, ?, ?)",
      [heading, description, imagePath]
    );
    return result.insertId;
  },

  update: async (id, heading, description, imagePath) => {
    if (imagePath) {
      return db.query(
        "UPDATE about_us_sections SET heading = ?, description = ?, image_path = ? WHERE id = ?",
        [heading, description, imagePath, id]
      );
    } else {
      return db.query(
        "UPDATE about_us_sections SET heading = ?, description = ? WHERE id = ?",
        [heading, description, id]
      );
    }
  },

  delete: async (id) => {
    return db.query("DELETE FROM about_us_sections WHERE id = ?", [id]);
  },
};

module.exports = AboutUsSubsectionModel;
