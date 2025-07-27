const db = require("../config/db");

const AboutUsModel = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM about_us ORDER BY id ASC");
    return rows;
  },

  create: async (heading, description, imageFilename) => {
    const [result] = await db.query(
      "INSERT INTO about_us (heading, description, image_filename) VALUES (?, ?, ?)",
      [heading, description, imageFilename]
    );
    return result.insertId;
  },

  update: async (id, heading, description, imageFilename) => {
    if (imageFilename) {
      return db.query(
        "UPDATE about_us SET heading = ?, description = ?, image_filename = ? WHERE id = ?",
        [heading, description, imageFilename, id]
      );
    } else {
      return db.query(
        "UPDATE about_us SET heading = ?, description = ? WHERE id = ?",
        [heading, description, id]
      );
    }
  },

  delete: async (id) => {
    const [result] = await db.query("DELETE FROM about_us WHERE id = ?", [id]);
    return result;
  },
};

module.exports = AboutUsModel;
