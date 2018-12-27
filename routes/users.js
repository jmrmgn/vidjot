const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { ensureAuthenticated, canLogin } = require('../helpers/auth');

// GET /login
router.get('/login', canLogin, userController.getLogin);

// POST /login
router.post('/login', canLogin, userController.postLogin);

// GET /register
router.get('/register', canLogin, userController.getRegister);

// POST /register
router.post('/register', canLogin, userController.postRegister);

// GET /logout
router.get('/logout', ensureAuthenticated, userController.getLogout);

module.exports = router;