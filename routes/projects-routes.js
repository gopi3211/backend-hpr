const express = require('express');
const router = express.Router();

const {
  fetchProjects,
  createProject,
  editProject,
  removeProject
} = require('../controllers/projects-controller');

router.get('/', fetchProjects);
router.post('/', createProject);         // ❌ No multer
router.put('/:id', editProject);         // ❌ No multer
router.delete('/:id', removeProject);

module.exports = router;
