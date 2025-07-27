const {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject
} = require("../models/projects-model");

// ✅ Fetch all projects
const fetchProjects = async (req, res) => {
  try {
    const data = await getAllProjects();
    res.json({ success: true, data });
  } catch (error) {
    console.error("[CONTROLLER] Failed to fetch projects:", error);
    res.status(500).json({ success: false, message: "Failed to fetch projects" });
  }
};

// ✅ Create a new project
const createProject = async (req, res) => {
  const { title, description } = req.body;
  const imageFilename = req.file ? req.file.filename : null;

  console.log("[CREATE] Received:", {
    title,
    description,
    fileExists: !!imageFilename
  });

  try {
    const result = await addProject(title, description, imageFilename);
    res.json({ success: true, message: "Project created successfully", id: result.insertId });
  } catch (error) {
    console.error("[CONTROLLER] Failed to create project:", error);
    res.status(500).json({ success: false, message: "Failed to create project" });
  }
};

// ✅ Edit project
const editProject = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const imageFilename = req.file ? req.file.filename : null;

  try {
    await updateProject(id, title, description, imageFilename);
    res.json({ success: true, message: "Project updated successfully" });
  } catch (error) {
    console.error("[CONTROLLER] Failed to update project:", error);
    res.status(500).json({ success: false, message: "Failed to update project" });
  }
};

// ✅ Delete project
const removeProject = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteProject(id);
    res.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("[CONTROLLER] Failed to delete project:", error);
    res.status(500).json({ success: false, message: "Failed to delete project" });
  }
};

module.exports = {
  fetchProjects,
  createProject,
  editProject,
  removeProject,
};
