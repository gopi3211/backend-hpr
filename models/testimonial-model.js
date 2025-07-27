const db = require('../config/db');

const testimonialModel = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM home_testimonials');
    return rows;
  },

  create: async (name, message, imageName) => {
    const [result] = await db.execute(
      'INSERT INTO home_testimonials (name, message, image) VALUES (?, ?, ?)',
      [name, message, imageName]
    );
    return result;
  },

  update: async (id, name, message, imageName) => {
    if (imageName) {
      return db.execute(
        'UPDATE home_testimonials SET name = ?, message = ?, image = ? WHERE id = ?',
        [name, message, imageName, id]
      );
    }
    return db.execute(
      'UPDATE home_testimonials SET name = ?, message = ? WHERE id = ?',
      [name, message, id]
    );
  },

  delete: async (id) => {
    return db.execute('DELETE FROM home_testimonials WHERE id = ?', [id]);
  }
};

module.exports = testimonialModel;
