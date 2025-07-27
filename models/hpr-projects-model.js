const db = require("../config/db");

const HprProjectsModel = {
  // -------------------- PROJECTS MAIN --------------------
  createProject: async (name, category, shortDesc, logo, banner) => {
    const [result] = await db.execute(
      `INSERT INTO hpr_projects (name, category, short_desc, logo_filename, banner_filename)
       VALUES (?, ?, ?, ?, ?)`,
      [name, category, shortDesc, logo, banner]
    );
    return result.insertId;
  },

  getAllProjects: async () => {
    const [rows] = await db.execute(`SELECT * FROM hpr_projects ORDER BY id DESC`);
    return rows.map((row) => ({
      ...row,
      logo_url: row.logo_filename
        ? `${process.env.SERVER_URL}/uploads/project-images/${row.logo_filename}`
        : null,
      banner_url: row.banner_filename
        ? `${process.env.SERVER_URL}/uploads/project-images/${row.banner_filename}`
        : null,
    }));
  },

  getProjectById: async (id) => {
    const [rows] = await db.execute(`SELECT * FROM hpr_projects WHERE id = ?`, [id]);
    const row = rows[0];
    return {
      ...row,
      logo_url: row?.logo_filename
        ? `${process.env.SERVER_URL}/uploads/project-images/${row.logo_filename}`
        : null,
      banner_url: row?.banner_filename
        ? `${process.env.SERVER_URL}/uploads/project-images/${row.banner_filename}`
        : null,
    };
  },

  updateProject: async (id, name, category, shortDesc, logo, banner) => {
    return db.execute(
      `UPDATE hpr_projects SET name = ?, category = ?, short_desc = ?, logo_filename = ?, banner_filename = ? WHERE id = ?`,
      [name, category, shortDesc, logo, banner, id]
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

  return rows.map(item => ({
    ...item,
    image_url: item.image_filename
      ? `${process.env.SERVER_URL}/uploads/project-images/${item.image_filename}`
      : null
  }));
},














  // -------------------- HOME --------------------
createHome: async (projectId, title, description, brochure, image) => {
  const [result] = await db.execute(
    `INSERT INTO hpr_projects_home (project_id, title, description, brochure_filename, image_filename)
     VALUES (?, ?, ?, ?, ?)`,
    [projectId, title, description, brochure, image]
  );
  return result.insertId;
},

getHomeByProjectId: async (projectId) => {
  const [rows] = await db.execute(
    `SELECT * FROM hpr_projects_home WHERE project_id = ?`,
    [projectId]
  );
  const row = rows[0];
  return {
    ...row,
    brochure_url: row?.brochure_filename
      ? `${process.env.SERVER_URL}/uploads/project-images/${row.brochure_filename}`
      : null,
    image_url: row?.image_filename
      ? `${process.env.SERVER_URL}/uploads/project-images/${row.image_filename}`
      : null
  };
},

updateHome: async (id, title, description, brochure, image) => {
  return db.execute(
    `UPDATE hpr_projects_home SET title = ?, description = ?, brochure_filename = ?, image_filename = ? WHERE id = ?`,
    [title, description, brochure, image, id]
  );
},

deleteHome: async (id) => {
  return db.execute(`DELETE FROM hpr_projects_home WHERE id = ?`, [id]);
},












// -------------------- GALLERY --------------------
addGalleryImage: async (projectId, workDate, description, imageFilename, category) => {
  console.log("⏺️ INSERTING GALLERY:");
  console.log("projectId:", projectId);
  console.log("workDate:", workDate);
  console.log("description:", description);
  console.log("image_filename:", imageFilename);
  console.log("category:", category);

  return db.execute(
    `INSERT INTO hpr_projects_gallery (project_id, work_date, description, image_filename, category)
     VALUES (?, ?, ?, ?, ?)`,
    [projectId, workDate, description, imageFilename, category]
  );
},

getGalleryByProjectId: async (projectId) => {
  const [rows] = await db.execute(
    `SELECT * FROM hpr_projects_gallery WHERE project_id = ? ORDER BY work_date DESC`,
    [projectId]
  );

  return rows.map(item => ({
    ...item,
    image_url: item.image_filename
      ? `${process.env.SERVER_URL}/uploads/project-images/${item.image_filename}`
      : null,
  }));
},

deleteGalleryImage: async (id) => {
  return db.execute(`DELETE FROM hpr_projects_gallery WHERE id = ?`, [id]);
},














  // ---// ----------------- PLAN --------------------
addPlan: async (projectId, description, planFilename) => {
  console.log("⏺️ INSERTING PLAN:");
  console.log("projectId:", projectId);
  console.log("description:", description);
  console.log("plan_filename:", planFilename);

  return db.execute(
    `INSERT INTO hpr_projects_plan (project_id, description, plan_filename) VALUES (?, ?, ?)`,
    [projectId || null, description || null, planFilename || null]
  );
},

getPlanByProjectId: async (projectId) => {
  const [rows] = await db.execute(
    `SELECT * FROM hpr_projects_plan WHERE project_id = ? AND plan_filename IS NOT NULL ORDER BY id DESC LIMIT 1`,
    [projectId || null]
  );

  const plan = rows[0] || null;

  if (plan?.plan_filename) {
    plan.plan_url = `${process.env.SERVER_URL}/uploads/project-images/${plan.plan_filename}`;
  }

  return plan;
},


deletePlan: async (id) => {
  return db.execute(`DELETE FROM hpr_projects_plan WHERE id = ?`, [id]);
},


deletePlan: async (id) => {
  console.log("🗑️ Deleting PLAN ID:", id);
  return db.execute(`DELETE FROM hpr_projects_plan WHERE id = ?`, [id || null]);
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
}
,

  // -------------------- CONTACT FORM --------------------
  submitContactForm: async (name, email, phone, message, projectName) => {
    return db.execute(
      `INSERT INTO hpr_projects_contacts (name, email, phone, message, project_name) VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone, message, projectName]
    );
  },
};

module.exports = HprProjectsModel;
