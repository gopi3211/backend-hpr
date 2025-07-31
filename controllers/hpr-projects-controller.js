const HprProjectsModel = require("../models/hpr-projects-model");

const HprProjectsController = {
  // -------------------- PROJECTS MAIN --------------------
  createProject: async (req, res) => {
    try {
      const { name, category, short_desc, logo_url, banner_url } = req.body;
      const id = await HprProjectsModel.createProject(name, category, short_desc, logo_url || null, banner_url || null);
      res.status(201).json({ id });
    } catch (err) {
      console.error("createProject error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  getAllProjects: async (req, res) => {
    try {
      const data = await HprProjectsModel.getAllProjects();
      res.json(data);
    } catch (err) {
      console.error("getAllProjects error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  getProjectById: async (req, res) => {
    try {
      const data = await HprProjectsModel.getProjectById(req.params.id);
      res.json(data);
    } catch (err) {
      console.error("getProjectById error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  updateProject: async (req, res) => {
    try {
      const { name, category, short_desc, logo_url, banner_url } = req.body;
      await HprProjectsModel.updateProject(req.params.id, name, category, short_desc, logo_url || null, banner_url || null);
      res.json({ success: true });
    } catch (err) {
      console.error("updateProject error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  deleteProject: async (req, res) => {
    try {
      await HprProjectsModel.deleteProject(req.params.id);
      res.json({ success: true });
    } catch (err) {
      console.error("deleteProject error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  // -------------------- UTILITIES --------------------
  getProjectNames: async (req, res) => {
    try {
      const data = await HprProjectsModel.getProjectNames();
      res.json(data);
    } catch (err) {
      console.error("getProjectNames error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  getGalleryByCategory: async (req, res) => {
    try {
      const data = await HprProjectsModel.getGalleryByCategory(req.params.category);
      res.json(data);
    } catch (err) {
      console.error("getGalleryByCategory error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  // -------------------- HOME --------------------
  createHome: async (req, res) => {
    try {
      const { title, description, project_id, brochure_url, image_url } = req.body;
      const id = await HprProjectsModel.createHome(parseInt(project_id), title, description, brochure_url || null, image_url || null);
      res.status(201).json({ id });
    } catch (err) {
      console.error("createHome error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  getHomeByProjectId: async (req, res) => {
    try {
      const data = await HprProjectsModel.getHomeByProjectId(req.params.project_id);
      res.json(data);
    } catch (err) {
      console.error("getHomeByProjectId error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  updateHome: async (req, res) => {
    try {
      const { title, description, brochure_url, image_url } = req.body;
      await HprProjectsModel.updateHome(req.params.id, title, description, brochure_url || null, image_url || null);
      res.json({ success: true });
    } catch (err) {
      console.error("updateHome error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  deleteHome: async (req, res) => {
    try {
      await HprProjectsModel.deleteHome(req.params.id);
      res.json({ success: true });
    } catch (err) {
      console.error("deleteHome error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  // -------------------- GALLERY --------------------
  addGalleryImage: async (req, res) => {
    try {
      const { project_id, work_date, description, image_url } = req.body;

      const project = await HprProjectsModel.getProjectById(project_id);
      const category = project?.category || null;

      if (!project_id || !work_date || !description || !image_url || !category) {
        return res.status(400).json({ success: false, message: "Missing required fields." });
      }

      await HprProjectsModel.addGalleryImage(project_id, work_date, description, image_url, category);
      res.status(201).json({ success: true });
    } catch (err) {
      console.error("addGalleryImage error:", err);
      res.status(500).json({ message: "Server error while adding gallery image" });
    }
  },

  getGalleryByProjectId: async (req, res) => {
    try {
      const data = await HprProjectsModel.getGalleryByProjectId(req.params.project_id);
      res.json(data);
    } catch (err) {
      console.error("getGalleryByProjectId error:", err);
      res.status(500).json({ message: "Server error while fetching gallery data" });
    }
  },

  deleteGalleryImage: async (req, res) => {
    try {
      await HprProjectsModel.deleteGalleryImage(req.params.id);
      res.json({ success: true });
    } catch (err) {
      console.error("deleteGalleryImage error:", err);
      res.status(500).json({ message: "Server error while deleting gallery image" });
    }
  },

  // -------------------- PLAN --------------------
  addPlan: async (req, res) => {
    try {
      const { project_id, description, plan_url } = req.body;

      if (!project_id || !description || !plan_url) {
        return res.status(400).json({ success: false, message: "All fields (project_id, description, plan_url) are required." });
      }

      await HprProjectsModel.addPlan(project_id, description, plan_url);
      res.status(201).json({ success: true });
    } catch (err) {
      console.error("addPlan error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  getPlanByProjectId: async (req, res) => {
    try {
      const data = await HprProjectsModel.getPlanByProjectId(req.params.project_id);
      res.json(data);
    } catch (err) {
      console.error("getPlanByProjectId error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  updatePlan: async (req, res) => {
    try {
      const { description, plan_url } = req.body;
      await HprProjectsModel.updatePlan(req.params.id, description, plan_url || null);
      res.json({ success: true });
    } catch (err) {
      console.error("updatePlan error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  deletePlan: async (req, res) => {
    try {
      await HprProjectsModel.deletePlan(req.params.id);
      res.json({ success: true });
    } catch (err) {
      console.error("deletePlan error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  // -------------------- LOCATION --------------------
  addLocation: async (req, res) => {
    try {
      const { project_id, iframe_link } = req.body;
      await HprProjectsModel.addLocation(project_id, iframe_link);
      res.status(201).json({ success: true });
    } catch (err) {
      console.error("addLocation error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  getLocationByProjectId: async (req, res) => {
    try {
      const data = await HprProjectsModel.getLocationByProjectId(req.params.project_id);
      const formatted = Array.isArray(data)
        ? data.map((item) => ({
            id: item.id,
            project_id: item.project_id,
            title: "Map Location",
            map_url: item.iframe_link,
          }))
        : [];
      res.json(formatted);
    } catch (err) {
      console.error("getLocationByProjectId error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  updateLocation: async (req, res) => {
    try {
      const { iframe_link } = req.body;
      await HprProjectsModel.updateLocation(req.params.id, iframe_link);
      res.json({ success: true });
    } catch (err) {
      console.error("updateLocation error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  deleteLocation: async (req, res) => {
    try {
      await HprProjectsModel.deleteLocation(req.params.id);
      res.json({ success: true });
    } catch (err) {
      console.error("deleteLocation error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  // -------------------- AMENITIES --------------------
  addAmenities: async (req, res) => {
    try {
      const { project_id, infrastructure, features } = req.body;
      await HprProjectsModel.addAmenities(project_id, infrastructure, features);
      res.status(201).json({ success: true });
    } catch (err) {
      console.error("addAmenities error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  getAmenitiesByProjectId: async (req, res) => {
    try {
      const data = await HprProjectsModel.getAmenitiesByProjectId(req.params.project_id);
      res.json(data);
    } catch (err) {
      console.error("getAmenitiesByProjectId error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  updateAmenities: async (req, res) => {
    try {
      const { infrastructure, features } = req.body;
      await HprProjectsModel.updateAmenities(req.params.id, infrastructure, features);
      res.json({ success: true });
    } catch (err) {
      console.error("updateAmenities error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  deleteAmenities: async (req, res) => {
    try {
      await HprProjectsModel.deleteAmenities(req.params.id);
      res.json({ success: true });
    } catch (err) {
      console.error("deleteAmenities error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  getAmenitiesById: async (req, res) => {
    try {
      const data = await HprProjectsModel.getAmenitiesById(req.params.id);
      res.json(data);
    } catch (err) {
      console.error("getAmenitiesById error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  // -------------------- CONTACT FORM --------------------
  submitContactForm: async (req, res) => {
    try {
      const { name, email, phone, message, project_name } = req.body;
      await HprProjectsModel.submitContactForm(name, email, phone, message, project_name);
      res.status(201).json({ success: true });
    } catch (err) {
      console.error("submitContactForm error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = HprProjectsController;
