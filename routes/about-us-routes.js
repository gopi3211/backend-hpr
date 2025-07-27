const express = require("express");
const router = express.Router();

const {
  getAboutUs,
  createAboutUs,
  updateAboutUs,
  deleteAboutUs,
} = require("../controllers/about-us-controller");

const uploadAboutUs = require("../middlewares/upload-aboutus");

router.get("/about-us", getAboutUs);
router.post("/about-us", uploadAboutUs.single("image"), createAboutUs);
router.put("/about-us/:id", uploadAboutUs.single("image"), updateAboutUs);
router.delete("/about-us/:id", deleteAboutUs);

module.exports = router;
