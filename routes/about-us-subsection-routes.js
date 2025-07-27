const express = require("express");
const router = express.Router();

// ✅ Use correct upload middleware for about-us-subsections
const upload = require("../middlewares/upload-aboutus-subsection"); 

const {
  getSubsections,
  createSubsection,
  updateSubsection,
  deleteSubsection,
} = require("../controllers/about-us-subsection-controller");

// Routes
router.get("/about-us/sections", getSubsections);
router.post("/about-us/sections", upload.single("image"), createSubsection);
router.put("/about-us/sections/:id", upload.single("image"), updateSubsection);
router.delete("/about-us/sections/:id", deleteSubsection);

module.exports = router;
