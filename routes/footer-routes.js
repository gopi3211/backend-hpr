const express = require("express");
const router = express.Router();
const footerController = require("../controllers/footer-controller");
const upload = require("../middlewares/upload-footer"); // ✅ Use new middleware

router.get("/", footerController.getFooter);
router.post("/", upload.single("logo"), footerController.createFooter);
router.put("/:id", upload.single("logo"), footerController.updateFooter);
router.delete("/:id", footerController.deleteFooter);

module.exports = router;
