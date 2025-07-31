const express = require("express");
const router = express.Router();
const HprProjectsController = require("../controllers/hpr-projects-controller");
const authMiddleware = require("../middlewares/auth-middleware");

// ---------- PROJECTS ----------
router.post("/hpr-projects", authMiddleware, HprProjectsController.createProject);
router.get("/hpr-projects", HprProjectsController.getAllProjects);
router.get("/hpr-projects/:id", HprProjectsController.getProjectById);
router.put("/hpr-projects/:id", authMiddleware, HprProjectsController.updateProject);
router.delete("/hpr-projects/:id", authMiddleware, HprProjectsController.deleteProject);

// ---------- UTILITIES ----------
router.get("/hpr-projects/names", HprProjectsController.getProjectNames);
router.get("/hpr-projects/gallery-category/:category", HprProjectsController.getGalleryByCategory);

// ---------- HOME ----------
router.post("/hpr-projects/home", authMiddleware, HprProjectsController.createHome);
router.get("/hpr-projects/home/:project_id", HprProjectsController.getHomeByProjectId);
router.put("/hpr-projects/home/:id", authMiddleware, HprProjectsController.updateHome);
router.delete("/hpr-projects/home/:id", authMiddleware, HprProjectsController.deleteHome);

// ---------- GALLERY ----------
router.post("/hpr-projects/gallery", authMiddleware, HprProjectsController.addGalleryImage);
router.get("/hpr-projects/gallery/:project_id", HprProjectsController.getGalleryByProjectId);
router.delete("/hpr-projects/gallery/:id", authMiddleware, HprProjectsController.deleteGalleryImage);

// ---------- PLAN ----------
router.post("/hpr-projects/plan", authMiddleware, HprProjectsController.addPlan);
router.get("/hpr-projects/plan/:project_id", HprProjectsController.getPlanByProjectId);
router.put("/hpr-projects/plan/:id", authMiddleware, HprProjectsController.updatePlan);
router.delete("/hpr-projects/plan/:id", authMiddleware, HprProjectsController.deletePlan);

// ---------- LOCATION ----------
router.post("/hpr-projects/location", authMiddleware, HprProjectsController.addLocation);
router.get("/hpr-projects/location/:project_id", HprProjectsController.getLocationByProjectId);
router.put("/hpr-projects/location/:id", authMiddleware, HprProjectsController.updateLocation);
router.delete("/hpr-projects/location/:id", authMiddleware, HprProjectsController.deleteLocation);

// ---------- AMENITIES ----------
router.post("/hpr-projects/amenities", authMiddleware, HprProjectsController.addAmenities);
router.get("/hpr-projects/amenities/:project_id", HprProjectsController.getAmenitiesByProjectId);
router.get("/hpr-projects/amenities/id/:id", HprProjectsController.getAmenitiesById);
router.put("/hpr-projects/amenities/:id", authMiddleware, HprProjectsController.updateAmenities);
router.delete("/hpr-projects/amenities/:id", authMiddleware, HprProjectsController.deleteAmenities);

// ---------- CONTACT FORM ----------
router.post("/hpr-projects/contact", HprProjectsController.submitContactForm);

module.exports = router;
