const express = require("express");
const router = express.Router();

const {
  getSubsections,
  createSubsection,
  updateSubsection,
  deleteSubsection,
} = require("../controllers/about-us-subsection-controller");

// ✅ JSON-based API — No file upload middleware
router.get("/about-us/sections", getSubsections);
router.post("/about-us/sections", createSubsection);
router.put("/about-us/sections/:id", updateSubsection);
router.delete("/about-us/sections/:id", deleteSubsection);

module.exports = router;
