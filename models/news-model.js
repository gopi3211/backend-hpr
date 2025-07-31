const db = require("../config/db");

console.log("[MODEL] news-model.js loaded");

const NewsModel = {
  // -------------------- NEWS CRUD --------------------

  // Create a news item
  async createNews(title, short_description, full_description, posted_date) {
    const [result] = await db.execute(
      `INSERT INTO news_updates (title, short_description, full_description, posted_date)
       VALUES (?, ?, ?, ?)`,
      [title, short_description, full_description, posted_date]
    );
    return result.insertId;
  },

  // Add image URL to news_images
  async addNewsImage(news_id, image_url) {
    await db.execute(
      `INSERT INTO news_images (news_id, image_url) VALUES (?, ?)`,
      [news_id, image_url]
    );
  },

  // Get all news for public display
  async getAllNews() {
    const [rows] = await db.query(
      `SELECT id, title, short_description, posted_date
       FROM news_updates
       ORDER BY posted_date DESC`
    );
    return rows;
  },

  // Get single news with full content
  async getNewsById(news_id) {
    const [rows] = await db.query(
      `SELECT * FROM news_updates WHERE id = ?`,
      [news_id]
    );
    return rows[0];
  },

  // Get all image URLs for a news item
  async getImagesByNewsId(news_id) {
    const [rows] = await db.query(
      `SELECT image_url FROM news_images WHERE news_id = ?`,
      [news_id]
    );
    return rows;
  },

  // Update a news item
  async updateNews(news_id, title, short_description, full_description, posted_date) {
    await db.execute(
      `UPDATE news_updates
       SET title = ?, short_description = ?, full_description = ?, posted_date = ?
       WHERE id = ?`,
      [title, short_description, full_description, posted_date, news_id]
    );
  },

  // Delete news item (you may want to also delete related images separately)
  async deleteNews(news_id) {
    await db.execute(`DELETE FROM news_updates WHERE id = ?`, [news_id]);
    await db.execute(`DELETE FROM news_images WHERE news_id = ?`, [news_id]);
  },

  // -------------------- BANNER --------------------

  // Set banner URL (only one allowed, replace existing)
  async setBannerUrl(url) {
    await db.execute(`DELETE FROM news_banner`);
    await db.execute(`INSERT INTO news_banner (banner_url) VALUES (?)`, [url]);
  },

  // Get banner URL
  async getBannerUrl() {
    const [rows] = await db.query(`SELECT banner_url FROM news_banner LIMIT 1`);
    return rows[0]?.banner_url || null;
  }
};

module.exports = NewsModel;
