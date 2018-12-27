const express = require('express');
const router = express.Router();

const ideaController = require('../controllers/ideaController');

// GET /ideas
router.get('/', ideaController.getIdeas);

// GET /ideas/add
router.get('/add', ideaController.getAddIdea);

// GET /ideas/edit/:id
router.get('/edit/:id', ideaController.getEditIdea);

// POST /ideas
router.post('/', ideaController.postAddIdea);

// PUT /ideas/:id
router.put('/:id', ideaController.putEditIdea);

// DELETE /ideas/:id
router.delete('/:id', ideaController.deleteIdea);

module.exports = router;