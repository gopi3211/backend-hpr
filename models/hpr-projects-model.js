const db = require("../config/db");

const HprProjectsModel = {
  // -------------------- PROJECTS MAIN --------------------
  createProject: async (name, category, shortDesc, logoUrl, bannerUrl) => {
    const [result] = await db.execute(
      `INSERT INTO hpr_projects (name, category, short_desc, logo_url, banner_url)
       VALUES (?, ?, ?, ?, ?)`,
      [name, category, shortDesc, logoUrl, bannerUrl]
    );
    return result.insertId;
  },

  getAllProjects: async () => {
    const [rows] = await db.execute(`SELECT * FROM hpr_projects ORDER BY id DESC`);
    return rows;
  },

  getProjectById: async (id) => {
    const [rows] = await db.execute(`SELECT * FROM hpr_projects WHERE id = ?`, [id]);
    return rows[0] || null;
  },

  updateProject: async (id, name, category, shortDesc, logoUrl, bannerUrl) => {
    return db.execute(
      `UPDATE hpr_projects SET name = ?, category = ?, short_desc = ?, logo_url = ?, banner_url = ? WHERE id = ?`,
      [name, category, shortDesc, logoUrl, bannerUrl, id]
    );
  },

  deleteProject: async (id) => {
    return db.execute(`DELETE FROM hpr_projects WHERE id = ?`, [id]);
  },

  // -------------------- UTILITIES --------------------
  getProjectNames: async () => {
    const [rows] = await db.execute(`SELECT id, name FROM hpr_projects`);
    return rows;
  },

  getGalleryByCategory: async (category) => {
    const [rows] = await db.execute(
      `SELECT g.*, p.name AS project_name FROM hpr_projects_gallery g 
       JOIN hpr_projects p ON g.project_id = p.id 
       WHERE p.category = ? ORDER BY g.work_date DESC`,
      [category]
    );
    return rows;
  },

  // -------------------- HOME --------------------
  createHome: async (projectId, title, description, brochureUrl, imageUrl) => {
    const [result] = await db.execute(
      `INSERT INTO hpr_projects_home (project_id, title, description, brochure_url, image_url)
       VALUES (?, ?, ?, ?, ?)`,
      [projectId, title, description, brochureUrl, imageUrl]
    );
    return result.insertId;
  },

  getHomeByProjectId: async (projectId) => {
    const [rows] = await db.execute(
      `SELECT * FROM hpr_projects_home WHERE project_id = ?`,
      [projectId]
    );
    return rows[0] || null;
  },

  updateHome: async (id, title, description, brochureUrl, imageUrl) => {
    return db.execute(
      `UPDATE hpr_projects_home SET title = ?, description = ?, brochure_url = ?, image_url = ? WHERE id = ?`,
      [title, description, brochureUrl, imageUrl, id]
    );
  },

  deleteHome: async (id) => {
    return db.execute(`DELETE FROM hpr_projects_home WHERE id = ?`, [id]);
  },

  // -------------------- GALLERY --------------------
  addGalleryImage: async (projectId, workDate, description, imageUrl, category) => {
    return db.execute(
      `INSERT INTO hpr_projects_gallery (project_id, work_date, description, image_url, category)
       VALUES (?, ?, ?, ?, ?)`,
      [projectId, workDate, description, imageUrl, category]
    );
  },

  getGalleryByProjectId: async (projectId) => {
    const [rows] = await db.execute(
      `SELECT * FROM hpr_projects_gallery WHERE project_id = ? ORDER BY work_date DESC`,
      [projectId]
    );
    return rows;
  },

  deleteGalleryImage: async (id) => {
    return db.execute(`DELETE FROM hpr_projects_gallery WHERE id = ?`, [id]);
  },

  // -------------------- PLAN --------------------
  addPlan: async (projectId, description, planUrl) => {
    return db.execute(
      `INSERT INTO hpr_projects_plan (project_id, description, plan_url)
       VALUES (?, ?, ?)`,
      [projectId, description, planUrl]
    );
  },

  getPlanByProjectId: async (projectId) => {
    const [rows] = await db.execute(
      `SELECT * FROM hpr_projects_plan WHERE project_id = ? AND plan_url IS NOT NULL ORDER BY id DESC LIMIT 1`,
      [projectId]
    );
    return rows[0] || null;
  },

  updatePlan: async (id, description, planUrl) => {
    return db.execute(
      `UPDATE hpr_projects_plan SET description = ?, plan_url = ? WHERE id = ?`,
      [description, planUrl, id]
    );
  },

  deletePlan: async (id) => {
    return db.execute(`DELETE FROM hpr_projects_plan WHERE id = ?`, [id]);
  },

  // -------------------- LOCATION --------------------
  addLocation: async (projectId, iframe) => {
    return db.execute(
      `INSERT INTO hpr_projects_location (project_id, iframe_link) VALUES (?, ?)`,
      [projectId, iframe]
    );
  },

  getLocationByProjectId: async (projectId) => {
    const [rows] = await db.execute(`SELECT * FROM hpr_projects_location WHERE project_id = ?`, [projectId]);
    return rows;
  },

  updateLocation: async (id, iframe) => {
    return db.execute(`UPDATE hpr_projects_location SET iframe_link = ? WHERE id = ?`, [iframe, id]);
  },

  deleteLocation: async (id) => {
    return db.execute(`DELETE FROM hpr_projects_location WHERE id = ?`, [id]);
  },

  // -------------------- AMENITIES --------------------
  addAmenities: async (projectId, infrastructure, features) => {
    return db.execute(
      `INSERT INTO hpr_projects_amenities (project_id, infrastructure, features) VALUES (?, ?, ?)`,
      [projectId, JSON.stringify(infrastructure), JSON.stringify(features)]
    );
  },

  getAmenitiesByProjectId: async (projectId) => {
    const [rows] = await db.execute(
      `SELECT * FROM hpr_projects_amenities WHERE project_id = ?`,
      [projectId]
    );
    return rows;
  },

  updateAmenities: async (id, infrastructure, features) => {
    return db.execute(
      `UPDATE hpr_projects_amenities SET infrastructure = ?, features = ? WHERE id = ?`,
      [JSON.stringify(infrastructure), JSON.stringify(features), id]
    );
  },

  deleteAmenities: async (id) => {
    return db.execute(
      `DELETE FROM hpr_projects_amenities WHERE id = ?`,
      [id]
    );
  },

  getAmenitiesById: async (id) => {
    const [rows] = await db.execute(
      `SELECT * FROM hpr_projects_amenities WHERE id = ?`,
      [id]
    );
    return rows[0];
  },

  // -------------------- CONTACT FORM --------------------
  submitContactForm: async (name, email, phone, message, projectName) => {
    return db.execute(
      `INSERT INTO hpr_projects_contacts (name, email, phone, message, project_name) VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone, message, projectName]
    );
  },
};

module.exports = HprProjectsModel;
