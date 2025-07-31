const db = require("../config/db");

const AboutUsSubsectionModel = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM about_us_sections");
    return rows;
  },

  create: async (heading, description, image_url) => {
    const [result] = await db.query(
      "INSERT INTO about_us_sections (heading, description, image_url) VALUES (?, ?, ?)",
      [heading, description, image_url]
    );
    return result.insertId;
  },

  update: async (id, heading, description, image_url) => {
    if (image_url) {
      return db.query(
        "UPDATE about_us_sections SET heading = ?, description = ?, image_url = ? WHERE id = ?",
        [heading, description, image_url, id]
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
