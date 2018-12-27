const express = require('express');
const router = express.Router();

const ideaController = require('../controllers/ideaController');
const { ensureAuthenticated } = require('../helpers/auth');

// GET /ideas
router.get('/', ensureAuthenticated, ideaController.getIdeas);

// GET /ideas/add
router.get('/add', ensureAuthenticated, ideaController.getAddIdea);

// GET /ideas/edit/:id
router.get('/edit/:id', ensureAuthenticated, ideaController.getEditIdea);

// POST /ideas
router.post('/', ensureAuthenticated, ideaController.postAddIdea);

// PUT /ideas/:id
router.put('/:id', ensureAuthenticated, ideaController.putEditIdea);

// DELETE /ideas/:id
router.delete('/:id', ensureAuthenticated, ideaController.deleteIdea);

module.exports = router;