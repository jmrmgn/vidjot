const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// GET /login
router.get('/login', userController.getLogin);

// GET /register
router.get('/register', userController.getRegister);

module.exports = router;