const NewsModel = require("../models/news-model");

const NewsController = {
  // -------------------- NEWS CRUD --------------------

  async createNews(req, res) {
    try {
      const { title, short_description, full_description, posted_date, image_urls = [] } = req.body;

      console.log("[CONTROLLER] createNews called");

      const newsId = await NewsModel.createNews(
        title,
        short_description,
        full_description,
        posted_date
      );

      for (const url of image_urls) {
        await NewsModel.addNewsImage(newsId, url);
      }

      console.log(`[CONTROLLER] News created with ID: ${newsId}`);
      res.status(201).json({ message: "News created", id: newsId });
    } catch (err) {
      console.error("Error creating news:", err);
      res.status(500).json({ error: "Failed to create news" });
    }
  },

  async getAllNews(req, res) {
    try {
      console.log("[CONTROLLER] getAllNews called");

      const newsList = await NewsModel.getAllNews();

      for (const news of newsList) {
        const images = await NewsModel.getImagesByNewsId(news.id);
        news.images = images.map((img) => ({ image_url: img.image_url }));
      }

      res.json({ data: newsList });
    } catch (err) {
      console.error("Error fetching news:", err);
      res.status(500).json({ error: "Failed to fetch news" });
    }
  },

  async getNewsById(req, res) {
    try {
      const id = req.params.id;
      console.log(`[CONTROLLER] getNewsById called for ID: ${id}`);

      const news = await NewsModel.getNewsById(id);
      if (!news) return res.status(404).json({ error: "News not found" });

      const images = await NewsModel.getImagesByNewsId(id);
      news.images = images.map((img) => ({ image_url: img.image_url }));

      res.json({ data: news });
    } catch (err) {
      console.error("Error fetching news by ID:", err);
      res.status(500).json({ error: "Failed to fetch news" });
    }
  },

  async updateNews(req, res) {
    try {
      const id = req.params.id;
      const { title, short_description, full_description, posted_date } = req.body;

      console.log(`[CONTROLLER] updateNews called for ID: ${id}`);

      await NewsModel.updateNews(
        id,
        title,
        short_description,
        full_description,
        posted_date
      );

      res.json({ message: "News updated" });
    } catch (err) {
      console.error("Error updating news:", err);
      res.status(500).json({ error: "Failed to update news" });
    }
  },

  async deleteNews(req, res) {
    try {
      const id = req.params.id;
      console.log(`[CONTROLLER] deleteNews called for ID: ${id}`);

      await NewsModel.deleteNews(id);

      res.json({ message: "News deleted" });
    } catch (err) {
      console.error("Error deleting news:", err);
      res.status(500).json({ error: "Failed to delete news" });
    }
  },

  // -------------------- BANNER --------------------

  async uploadBanner(req, res) {
    try {
      console.log("[CONTROLLER] uploadBanner called");

      const { banner_url } = req.body;

      if (!banner_url) {
        return res.status(400).json({ error: "Banner URL required" });
      }

      await NewsModel.setBannerUrl(banner_url);

      res.status(200).json({ message: "Banner uploaded successfully" });
    } catch (err) {
      console.error("Error uploading banner:", err);
      res.status(500).json({ error: "Failed to upload banner" });
    }
  },

  async getBanner(req, res) {
    try {
      console.log("[CONTROLLER] getBanner called");

      const bannerUrl = await NewsModel.getBannerUrl();

      if (!bannerUrl) return res.status(404).json({ error: "No banner found" });

      res.json({ banner_url: bannerUrl });
    } catch (err) {
      console.error("Error fetching banner:", err);
      res.status(500).json({ error: "Failed to fetch banner" });
    }
  },
};

module.exports = NewsController;
