const pool = require("../config/db");

// ✅ Fetch all projects
const getAllProjects = async () => {
  const [rows] = await pool.query("SELECT * FROM home_projects ORDER BY id DESC");
  return rows;
};

// ✅ Add a project
const addProject = async (title, description, imageFilename) => {
  console.log("[MODEL] addProject called");
  const sql = "INSERT INTO home_projects (title, description, image) VALUES (?, ?, ?)";
  const [result] = await pool.query(sql, [title, description, imageFilename]);
  return result;
};

// ✅ Update project
const updateProject = async (id, title, description, imageFilename) => {
  let sql, params;
  if (imageFilename) {
    sql = "UPDATE home_projects SET title = ?, description = ?, image = ? WHERE id = ?";
    params = [title, description, imageFilename, id];
  } else {
    sql = "UPDATE home_projects SET title = ?, description = ? WHERE id = ?";
    params = [title, description, id];
  }
  const [result] = await pool.query(sql, params);
  return result;
};

// ✅ Delete project
const deleteProject = async (id) => {
  const sql = "DELETE FROM home_projects WHERE id = ?";
  const [result] = await pool.query(sql, [id]);
  return result;
};

module.exports = {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject
};
