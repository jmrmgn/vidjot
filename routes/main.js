const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

// GET /
router.get('/', mainController.getIndex);

// GET /about
router.get('/about', mainController.getAbout);

module.exports = router;