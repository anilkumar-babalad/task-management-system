const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
router.get('/edituser/:task_id', userController.edit);
router.post('/edituser/:task_id', userController.update);
router.get('/viewuser/:task_id', userController.viewall);
router.get('/:task_id',userController.delete);
  
module.exports = router;