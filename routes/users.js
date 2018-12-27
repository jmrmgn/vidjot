const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// GET /login
router.get('/login', userController.getLogin);

// POST /login
router.post('/login', userController.postLogin);

// GET /register
router.get('/register', userController.getRegister);

// POST /register
router.post('/register', userController.postRegister);

// GET /logout
router.get('/logout', userController.getLogout);

module.exports = router;