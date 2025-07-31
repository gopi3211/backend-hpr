const db = require("../config/db");

const AboutUsModel = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM about_us ORDER BY id ASC");
    return rows;
  },

  create: async (heading, description, imageUrl) => {
    const [result] = await db.query(
      "INSERT INTO about_us (heading, description, image_url) VALUES (?, ?, ?)",
      [heading, description, imageUrl]
    );
    return result.insertId;
  },

  update: async (id, heading, description, imageUrl) => {
    if (imageUrl) {
      return db.query(
        "UPDATE about_us SET heading = ?, description = ?, image_url = ? WHERE id = ?",
        [heading, description, imageUrl, id]
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
