const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/get-tasks', adminController.getTasks);
router.post('/post-task', adminController.postTask);
router.delete('/remove-task/:id', adminController.removeTask);
router.put('/edit-task/:id', adminController.editTask);
router.post('/post-user', adminController.postUser);
router.get('/get-users', adminController.getUsers);

module.exports = router;