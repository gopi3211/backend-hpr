const express = require("express");
const router = express.Router();

const {
  getAboutUs,
  createAboutUs,
  updateAboutUs,
  deleteAboutUs,
} = require("../controllers/about-us-controller");

// ⛔ Removed multer middleware — no file upload, only image_url in body

router.get("/about-us", getAboutUs);
router.post("/about-us", createAboutUs); // expects image_url in req.body
router.put("/about-us/:id", updateAboutUs); // expects image_url in req.body
router.delete("/about-us/:id", deleteAboutUs);

module.exports = router;
