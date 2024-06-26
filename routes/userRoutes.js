const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/worko/user', userController.createUser);
router.get('/worko/user', userController.getAllUsers);
router.get('/worko/user/:userId', userController.getUserById);
router.put('/worko/user/:userId', userController.updateUser);
router.patch('/worko/user/:userId', userController.updateUser);
router.delete('/worko/user/:userId', userController.deleteUser);

module.exports = router;
