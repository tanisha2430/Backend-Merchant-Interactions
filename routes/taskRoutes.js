const express = require('express');
const { createTask, getTasks,getTasksByID } = require('../controllers/taskController');
const router = express.Router();

router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.get('/tasks/:id',getTasksByID);

module.exports = router;
