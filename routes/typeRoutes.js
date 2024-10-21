const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');

// Rutas para CRUD de Tipos de Pokémon
router.get('/', typeController.getAllTypes);
router.post('/', typeController.addType);
router.put('/:id', typeController.updateType);
router.delete('/:id', typeController.deleteType);

module.exports = router;
