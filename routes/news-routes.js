const express = require("express");
const router = express.Router();

const NewsController = require("../controllers/news-controller");

// -------------------- BANNER ROUTES (MUST COME FIRST) --------------------
router.get("/banner", NewsController.getBanner);          // ✅ FIX: placed before /:id
router.post("/banner", NewsController.uploadBanner);

// -------------------- NEWS CRUD --------------------
router.post("/", NewsController.createNews);
router.get("/", NewsController.getAllNews);
router.get("/:id", NewsController.getNewsById);           // ✅ this should be last among GETs
router.put("/:id", NewsController.updateNews);
router.delete("/:id", NewsController.deleteNews);

module.exports = router;
